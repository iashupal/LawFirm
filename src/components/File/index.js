import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import { R, RU } from 'helpers/ramda';
import axios from 'axios';
import { urlMaster, PostCall } from 'helpers/ajax';
import NumberFormat from 'react-number-format';
import { ButtonW, BlankSpan } from 'helpers/ui';
import classnames from 'classnames';
import { NotificationManager } from 'react-notifications';

const { checkUploadFileExt, mlMessage, changeURL, readFile } = RU;

class File extends Component {
  removeFile = async key => {
    // Delete : S3 File Storage.
    await PostCall('/ext/file_delete', { key });

    // Delete : File Data (DB-mysql)
    if (this.props.fileID) {
      await PostCall('/file/remove', { fileID: this.props.fileID, key });
    }

    // Delete : File Data (Redux)
    this.props.handleFileRemove(key);
  };

  handleUpdate = async o => {
    const { current_CCID: CCID } = this.props;
    const { name, value } = o;

    if (confirm(mlMessage('pages.contract.confirmApproval'))) {
      let fileID = null;
      if (value && value.length > 0) {
        const files = value;
        const bizCode = 'B01';
        const insertResult = await PostCall('/file/insert', {
          bizCode, // 업무 분류 (계약검토 B01, 체결계약서 B02, 법률자문 B03, 프로젝트 B04, 송무 B05)
          files,
          CCID,
        });
        const { fileID: File_ID } = insertResult.data;
        fileID = File_ID;
        await PostCall('/ext/file_tagging', { files, CCID });
        await PostCall('/file/tag_update', { fileID, CCID });
      } else {
        NotificationManager.info('계약 기안을 첨부바랍니다.');
        return;
      }

      const result = await PostCall('/contract/updateApproval', {
        ContractUUID: this.props.detailID,
        ApprovalFileRefID: fileID,
      });

      if (result.status === 200) {
        NotificationManager.info('계약기안이 저장 되었습니다.\n조회 페이지로 이동합니다.');
        changeURL('/contract/search');
      }
    }
  };

  render() {
    const {
      isPublicFile, // Public Image Upload (html-Editor or UserProfile) 시에는 true!
      files,
      handleFileAdd,
      isReadOnly,
      toolTipMsg,
      isSeperateSave,
      current_CCID: CCID,
    } = this.props;

    let dropzoneRef;
    return (
      <React.Fragment>
        {!isReadOnly && (
          <React.Fragment>
            <ButtonW
              handleClick={e => {
                dropzoneRef.open();
              }}
              toolTipMsg={toolTipMsg}
            >
              <i className="zmdi zmdi-attachment-alt" />
            </ButtonW>
            {isSeperateSave && (
              <ButtonW
                handleClick={e =>
                  this.handleUpdate({
                    name: 'saveContractApproval',
                    value: files,
                  })
                }
                option="1"
                toolTipMsg="계약기안을 저장하는 기능입니다."
              >
                <i className="zmdi zmdi-upload zmdi-hc-fw" />
              </ButtonW>
            )}
          </React.Fragment>
        )}
        <div className="d-flex flex-wrap">
          {files &&
            files.map(n => {
              return (
                <div key={n.key} className="mb-1 mr-1">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={e => {
                      readFile(n.key, n.name);
                    }}
                  >
                    {n.name}
                    <BlankSpan num={1} />
                    {'('}
                    <NumberFormat value={n.size} displayType="text" thousandSeparator />
                    <BlankSpan num={1} />
                    {'byte)'}
                  </Button>
                  {!isReadOnly && (
                    <Button
                      onClick={e => {
                        this.removeFile(n.key);
                      }}
                    >
                      <i className="zmdi zmdi-delete zmdi-hc-2x " />
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
        <div>
          <div className="text-right">
            <Dropzone
              ref={node => {
                dropzoneRef = node;
              }}
              onDrop={async (accepted, rejected) => {
                const data = new FormData();
                data.append('token', localStorage.getItem('token'));
                data.append('CCID', CCID);

                if (isPublicFile) {
                  data.append('ACL', 'public-read');
                }

                R.map(file => {
                  const fileExt = R.pipe(
                    R.split('.'),
                    R.last,
                  )(file.name);
                  if (checkUploadFileExt(fileExt) || isPublicFile) {
                    data.append('file', file);
                  }
                  return null;
                })(accepted);

                // 파일 관련된 사항은 axios 라이브러리를 직접 이용.
                const r = await axios.post(`${urlMaster}/ext/file`, data);
                handleFileAdd(r.data.result);
              }}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div
          className={classnames({
            'pb-3': true,
            'd-none': isPublicFile,
          })}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { current_CCID } = common;
  return { current_CCID };
};

export default connect(
  mapStateToProps,
  {},
)(File);
