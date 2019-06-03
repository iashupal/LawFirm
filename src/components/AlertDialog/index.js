import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import { handleCommonChangeValues, handleCommonAlertOK } from 'actions/Default/Common';
import { DialogBtnBox } from 'helpers/ui';

class AlertDialog extends React.Component {
  render() {
    const { alertMsgOpen, alertMsg, alertWaitDatas, handleCommonChangeValues, handleCommonAlertOK } = this.props;

    return (
      <div>
        <Dialog
          open={alertMsgOpen}
          onClose={e => handleCommonChangeValues({ name: 'alertMsgOpen', value: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{alertMsg.title}</span>
          </DialogTitle>
          {alertMsg.contents && (
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{alertMsg.contents}</DialogContentText>
            </DialogContent>
          )}
          {!alertMsg.isConfirm && (
            <DialogBtnBox>
              <Button onClick={e => handleCommonChangeValues({ name: 'alertMsgOpen', value: false })} color="primary">
                확인
              </Button>
            </DialogBtnBox>
          )}
          {alertMsg.isConfirm && (
            <DialogBtnBox>
              <Button onClick={e => handleCommonChangeValues({ name: 'alertMsgOpen', value: false })} color="secondary">
                아니오
              </Button>
              <Button
                onClick={e => {
                  handleCommonAlertOK(alertWaitDatas);
                  handleCommonChangeValues({ name: 'alertMsgOpen', value: false });
                }}
                color="primary"
                autoFocus
              >
                네
              </Button>
            </DialogBtnBox>
          )}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { alertMsg, alertMsgOpen, alertWaitDatas } = common;
  return { alertMsg, alertMsgOpen, alertWaitDatas };
};

const mapDispatchToProps = {
  handleCommonChangeValues,
  handleCommonAlertOK,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertDialog);
