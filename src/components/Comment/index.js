import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardBox from 'components/CardBox/index';
import { R, RU, CurrentUser } from 'helpers/ramda';
import {
  CondBox,
  Cond,
  ButtonW,
  EditorW,
  BlankSpan,
  TextFieldW,
  DatePickerW,
  RadioYesNo,
  DialogBtnBox,
} from 'helpers/ui';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import File from 'components/File';
import AutoComplete from 'components/AutoComplete';
import produce from 'immer';
import { PostCall } from 'helpers/ajax';
import classNames from 'classnames';
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TotalTime from 'components/TotalTime';
import { withTheme } from '@material-ui/core/styles';
import { NotificationManager } from 'react-notifications';

const { shortenStr, yearMonthDay, convertEditorText, mlMessage } = RU;

class CommentI extends Component {
  state = {
    hideArr: [],
  };

  handleHideArr = id => {
    this.setState(
      produce(this.state, draft => {
        const currentOnOff = this.state.hideArr[id];
        draft.hideArr[id] = !currentOnOff;
      }),
    );
  };

  render() {
    const {
      items,
      handleRemove,
      handleModify,
      handleTimeSpent,
      hideTimeSpent,
      hideModDel,
      type,
      option,
      auth,
      isAddButtonShow,
    } = this.props;
    const shortenStrLen = 40; // 에디터 말줄임 기준

    const count_MyReview = R.filter(a => a === CurrentUser('userID'), R.pluck('RequestUserID', items)).length;
    const count_OtherReview = R.filter(a => a !== CurrentUser('userID'), R.pluck('RequestUserID', items)).length;
    const oneSideTimeLine = count_MyReview === 0 || count_OtherReview === 0;
    const twoSideTimeLine = !oneSideTimeLine;

    return (
      <React.Fragment>
        {option === '1' && (
          <div
            className={classNames({
              'timeline-section': true,
              'timeline-center': twoSideTimeLine,
              clearfix: true,
              animated: true,
              slideInUpTiny: true,
              'animation-duration-3': true,
            })}
          >
            {items &&
              items.length > 0 &&
              items.map(n => (
                <div
                  key={n.ReviewSeq}
                  className={classNames({
                    'timeline-item': true,
                    'timeline-inverted': twoSideTimeLine && CurrentUser('userID') !== n.RequestUserID,
                  })}
                >
                  <div className="timeline-badge timeline-img">
                    {CurrentUser('userID') !== n.RequestUserID && (
                      <img src="assets/images/pentagon_1.png" alt="Pentagon" title="Pentagon" />
                    )}
                    {CurrentUser('userID') === n.RequestUserID && (
                      <img src="assets/images/pentagon.png" alt="Pentagon" title="Pentagon" />
                    )}
                  </div>
                  <div className="timeline-panel ">
                    <div className="timeline-panel-header">
                      <div className="timeline-header-img timeline-left">
                        {!n.RequestUserPhotoURL && (
                          <React.Fragment>
                            <div
                              className="bg-blue avatar rounded-circle size-60 text-white text-center"
                              style={{ fontSize: 24 }}
                            >
                              {' '}
                              {n.RequestUserName.charAt(0)}
                            </div>
                            <BlankSpan num="1" />
                          </React.Fragment>
                        )}
                        {n.RequestUserPhotoURL && (
                          <img
                            className="size-60 rounded-circle"
                            src={n.RequestUserPhotoURL} // 발신자만 Image 표기
                            alt={n.RequestUserName}
                            title={n.RequestUserName}
                          />
                        )}
                      </div>
                      <div className="timeline-heading">
                        <h5>{n.CreateDate}</h5>
                        <h3 className="timeline-title">
                          발신 : {n.RequestUserName}, 수신 : {n.ReviewUserName}
                        </h3>
                      </div>
                    </div>
                    <div className="timeline-body">
                      <div
                        style={{ wordBreak: 'break-all' }}
                        dangerouslySetInnerHTML={{
                          __html: convertEditorText(n.ReviewRemark),
                        }}
                      />
                      <File files={n.Files} isReadOnly />
                      {!hideModDel && (
                        <React.Fragment>
                          {type !== 'contract' && (
                            <Button
                              color="primary"
                              onClick={e => handleModify({ ReviewSeq: n.ReviewSeq, ReviewRemark: n.ReviewRemark })}
                            >
                              <i className="zmdi zmdi-edit zmdi-hc-lg" />
                            </Button>
                          )}
                          {(auth.authLawyerGroup || auth.authAdmin || n.RequestUserID === CurrentUser('userID')) &&
                            isAddButtonShow && (
                              <Button
                                color="primary"
                                onClick={e => handleRemove({ ReviewSeq: n.ReviewSeq, Files: n.Files })}
                              >
                                <i className="zmdi zmdi-delete zmdi-hc-lg" />
                              </Button>
                            )}
                        </React.Fragment>
                      )}
                      {hideTimeSpent && isAddButtonShow && (
                        <Button color="primary" onClick={e => handleTimeSpent(n.ReviewSeq)}>
                          <i className="zmdi zmdi-time zmdi-hc-lg" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {option === '0' && (
          <div className="row">
            {items && items.length > 0 && (
              <CardBox styleName="col-12" cardStyle="p-0">
                <div className="table-responsive-material">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-center">등록일</TableCell>
                        <TableCell className="text-center">발신자</TableCell>
                        <TableCell className="text-center">수신자</TableCell>
                        <TableCell className="text-center">검토의견</TableCell>
                        {!hideModDel && type === 'contract' && <TableCell className="text-center">삭제</TableCell>}
                        {!hideModDel && type !== 'contract' && <TableCell className="text-center">수정/삭제</TableCell>}
                        {hideTimeSpent && <TableCell className="text-center">Time spent</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items &&
                        items.map(n => {
                          return (
                            <TableRow key={n.ReviewSeq}>
                              <TableCell className="text-center">{n.CreateDate}</TableCell>
                              <TableCell className="text-center">{n.RequestUserName}</TableCell>
                              <TableCell className="text-center">{n.ReviewUserName}</TableCell>
                              <TableCell>
                                <div
                                  style={{ wordBreak: 'break-all' }}
                                  dangerouslySetInnerHTML={{
                                    __html: convertEditorText(n.ReviewRemark),
                                  }}
                                />
                                <File files={n.Files} isReadOnly />
                              </TableCell>
                              {!hideModDel && (
                                <TableCell className="text-center">
                                  {type !== 'contract' && (
                                    <Button
                                      color="primary"
                                      onClick={e =>
                                        handleModify({ ReviewSeq: n.ReviewSeq, ReviewRemark: n.ReviewRemark })
                                      }
                                    >
                                      <i className="zmdi zmdi-edit zmdi-hc-lg" />
                                    </Button>
                                  )}
                                  {(auth.authLawyerGroup ||
                                    auth.authAdmin ||
                                    n.RequestUserID === CurrentUser('userID')) &&
                                    isAddButtonShow && (
                                      <Button
                                        color="primary"
                                        onClick={e => handleRemove({ ReviewSeq: n.ReviewSeq, Files: n.Files })}
                                      >
                                        <i className="zmdi zmdi-delete zmdi-hc-lg" />
                                      </Button>
                                    )}
                                </TableCell>
                              )}
                              {hideTimeSpent && isAddButtonShow && (
                                <TableCell className="text-center">
                                  <Button color="primary" onClick={e => handleTimeSpent(n.ReviewSeq)}>
                                    <i className="zmdi zmdi-time zmdi-hc-lg" />
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              </CardBox>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const TimeSpentComponent = class extends Component {
  state = {
    editArr: [],
  };

  handleEditArr = id => {
    this.setState(
      produce(this.state, draft => {
        const currentOnOff = this.state.editArr[id];
        draft.editArr[id] = !currentOnOff;
      }),
    );
  };

  render() {
    const { items, handleChange } = this.props;
    // console.log(this.props.theme.palette);

    return (
      <div className="row">
        {items && items.length > 0 && (
          <CardBox styleName="col-12" cardStyle="p-0">
            <div className="table-responsive-material">
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: this.props.theme.palette.grey[600] }}>
                    <TableCell className="text-center" style={{ color: 'white', fontSize: 15 }}>
                      Name
                    </TableCell>
                    <TableCell className="text-center" style={{ color: 'white', fontSize: 15 }}>
                      Date
                    </TableCell>
                    <TableCell className="text-center" style={{ color: 'white', fontSize: 15 }}>
                      Time
                    </TableCell>
                    <TableCell className="text-center" style={{ color: 'white', fontSize: 15 }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items &&
                    items.map((n, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="text-center">{n.name}</TableCell>
                          <TableCell className="text-center">
                            <DatePickerW
                              value={n.date}
                              handleChange={value => {
                                handleChange({ name: 'date', index, value });
                              }}
                              isReadOnly={!this.state.editArr[index]}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            {this.state.editArr[index] && (
                              <React.Fragment>
                                <TextFieldW
                                  value={n.time1}
                                  handleChange={e => {
                                    const regex = /^[0-9\b]+$/;
                                    if (e.target.value === '' || regex.test(e.target.value)) {
                                      handleChange({ name: 'time1', index, value: e.target.value });
                                    }
                                  }}
                                  fullWidth={false}
                                  maxLength={{ maxLength: 2 }}
                                  style={{ width: 20 }}
                                />
                                시간
                                <BlankSpan num={2} />
                                <TextFieldW
                                  value={n.time2}
                                  handleChange={e => {
                                    const regex = /^[0-9\b]+$/;
                                    if (e.target.value === '' || regex.test(e.target.value)) {
                                      handleChange({ name: 'time2', index, value: e.target.value });
                                    }
                                  }}
                                  fullWidth={false}
                                  maxLength={{ maxLength: 2 }}
                                  style={{ width: 20 }}
                                />
                                분
                              </React.Fragment>
                            )}
                            {!this.state.editArr[index] && (
                              <React.Fragment>
                                {n.time1} 시간 {n.time2} 분
                              </React.Fragment>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              color="primary"
                              onClick={e => {
                                this.handleEditArr(index);
                              }}
                            >
                              {!this.state.editArr[index] && <i className="zmdi zmdi-edit zmdi-hc-lg" />}
                              {this.state.editArr[index] && <i className="zmdi zmdi-check zmdi-hc-lg" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow style={{ backgroundColor: this.props.theme.palette.grey[300] }}>
                    <TableCell className="text-center" style={{ fontSize: 14 }}>
                      Total
                    </TableCell>
                    <TableCell className="text-center" />
                    <TableCell className="text-center" style={{ fontSize: 14 }}>
                      {R.sum(R.pluck('time1', items)) + parseInt(R.sum(R.pluck('time2', items)) / 60, 10)} 시간
                      <BlankSpan num={2} />
                      {R.sum(R.pluck('time2', items)) % 60} 분
                    </TableCell>
                    <TableCell className="text-center" />
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardBox>
        )}
      </div>
    );
  }
};
const TimeSpent = withTheme()(TimeSpentComponent);

export class Comment extends Component {
  state = {
    isAddPopOpen: false,
    ReviewUser: {},
    ReviewRemark: '',
    Files: [],
    isModPopOpen: false,
    modReviewRemark: '',
    currentModID: 0,
    isTimeSpentOpen: false,
    timeSpentData: [],
    timeSpentCurReviewSeq: 0,
    option: '1',
  };

  checkInputData = (e, isMod) => {
    const alertMsg = [];

    const { ReviewRemark, modReviewRemark, Files } = this.state;

    if (isMod) {
      if (!modReviewRemark) alertMsg.push('비고');
    } else if (!ReviewRemark) alertMsg.push('비고');

    return alertMsg;
  };

  handleDialog = open => {
    if (open) {
      this.setState({
        ...this.state,
        isAddPopOpen: open,
      });
    } else {
      this.setState({
        ...this.state,
        isAddPopOpen: open,
        ReviewUser: {},
        ReviewRemark: '',
        Files: [],
      });
    }
  };

  handleAutoComplate = value => {
    this.setState({
      ...this.state,
      ReviewUser: value,
    });
  };

  handleReviewRemark = value => {
    this.setState({
      ...this.state,
      ReviewRemark: value,
    });
  };

  handleFileAdd = v => {
    this.setState(
      produce(this.state, draft => {
        R.map(a => draft.Files.push(a), v);
      }),
    );
  };

  handleFileRemove = v => {
    this.setState(
      produce(this.state, draft => {
        const index = this.state.Files.findIndex(a => a.key === v);
        draft.Files.splice(index, 1);
      }),
    );
  };

  handleOpenModPop = value => {
    const { ReviewSeq, ReviewRemark } = value;
    this.setState({
      ...this.state,
      currentModID: ReviewSeq,
      modReviewRemark: ReviewRemark,
      isModPopOpen: true,
    });
  };

  handleTimeSpent = async ReviewSeq => {
    let result;
    if (this.props.type === 'law') {
      result = await PostCall('/law/selectTimeSpentList', {
        LawUUID: this.props.detailID,
        ReviewSeq,
      });
    } else {
      result = await PostCall('/contract/selectTimeSpentList', {
        ContractUUID: this.props.detailID,
        ReviewSeq,
      });
    }

    const newTimeSpentData = R.map(a => {
      return {
        name: a.UserName,
        userId: a.ReviewUserID,
        date: moment(a.SpentDate),
        time1: a.SpentHour,
        time2: a.SpentMinute,
      };
    }, result.data.List);

    this.setState(
      produce(this.state, draft => {
        draft.isTimeSpentOpen = true;
        draft.timeSpentData = newTimeSpentData;
        draft.timeSpentCurReviewSeq = ReviewSeq;
      }),
    );
  };

  handleTimeSpentSave = async e => {
    const alertMsg = [];
    const ReviewSeq = this.state.timeSpentCurReviewSeq;
    const TimeSpentList = R.map(a => {
      if (a.date === null) {
        alertMsg.push('Date');
        return '';
      }
      return {
        ReviewUserID: a.userId,
        SpentDate: yearMonthDay(a.date),
        SpentHour: a.time1 === '' ? 0 : parseInt(a.time1, 10),
        SpentMinute: a.time2 === '' ? 0 : parseInt(a.time2, 10),
      };
    }, this.state.timeSpentData);

    if (alertMsg.length > 0) {
      NotificationManager.info('Date를 선택바랍니다.');
    } else {
      if (this.props.type === 'law') {
        await PostCall('/law/updateTimeSpent', { LawUUID: this.props.detailID, ReviewSeq, TimeSpentList });
      } else {
        await PostCall('/contract/updateTimeSpent', { ContractUUID: this.props.detailID, ReviewSeq, TimeSpentList });
      }

      this.setState(
        produce(this.state, draft => {
          draft.isTimeSpentOpen = false;
        }),
      );
    }
  };

  handleAlreadyAdd = async () => {
    if (confirm('본 계약서 기체결되어 검토가 불필요하다고 판단 및 검토 종료하시겠습니까?')) {
      this.props.handleAdd({
        ReviewUser: { userID: CurrentUser('userID') },
        ReviewRemark:
          '본 계약건은 기체결된 후 법무팀 검토 요청된 사항으로서, 법무팀에서는 계약서 수정의견을 드리지 않고, Legal Risk에 대해서만 의견을 드립니다. 또한 이는 법무팀 선검토 원칙을 벗어난 계약으로 별도 통계되어 보고되오니, 향후에는 법무팀 선검토 부탁 드립니다.',
        Files: this.state.Files,
        ReviewStatus: 'CST_0050',
      });
    }
  };

  render() {
    const {
      items,
      handleAdd,
      handleRemove,
      handleModify,
      hideTimeSpent,
      hideModDel,
      type,
      auth,
      option,
      handleOption,
      detailID,
      isAddButtonShow = true,
    } = this.props;
    const { isAddPopOpen, isModPopOpen, isTimeSpentOpen } = this.state;

    return (
      <React.Fragment>
        <Cond name={this.props.title}>
          {isAddButtonShow &&
            (auth.authRequest ||
              auth.authLawyer ||
              auth.authLawyerGroup ||
              auth.authAdmin ||
              auth.authRelevantUsers) && (
              <ButtonW
                handleClick={e => {
                  this.handleDialog(true);
                }}
                option="1"
                toolTipMsg="계약 검토 요청 및 검토의견을 등록하는 기능입니다."
                toolTipMsgPlacement="bottom"
              >
                <i className="zmdi zmdi-plus zmdi-hc-lg" />
              </ButtonW>
            )}

          {type === 'contract' && (auth.authLawyerGroup || auth.authAdmin) && (
            <React.Fragment>
              <TotalTime ContractUUID={detailID} toolTipMsg="법무팀 담당자별 전체 검토 시간을 조회하는 기능입니다." />
              {isAddButtonShow && (
                <ButtonW
                  handleClick={e => {
                    this.handleAlreadyAdd();
                  }}
                  option="1"
                  toolTipMsg={`계약서건이 기체결되어 검토가 불필요하다 판단되어 검토를 종료하는 버튼으로 '요청부서 기안 중' 상태로 변경 됩니다. `}
                  toolTipMsgPlacement="top"
                >
                  <i className="zmdi zdmi-hc-fw">
                    <span style={{ fontSize: 16 }}>ⓟ</span>
                  </i>
                </ButtonW>
              )}
            </React.Fragment>
          )}
          {type === 'law' && (auth.authLawyerGroup || auth.authAdmin) && (
            <React.Fragment>
              <TotalTime LawUUID={detailID} toolTipMsg="법무팀 담당자별 전체 검토 시간을 조회하는 기능입니다." />
            </React.Fragment>
          )}
          {items.length !== 0 && (
            <RadioGroup value={option} onChange={handleOption} row style={{ display: 'inline-block' }}>
              <FormControlLabel
                control={<Radio color="secondary" />}
                label={mlMessage('pages.common.optionConversation')}
                value="1"
              />
              <FormControlLabel
                control={<Radio color="secondary" />}
                label={mlMessage('pages.common.optionTable')}
                value="0"
              />
            </RadioGroup>
          )}
        </Cond>
        <Cond isFullWidth>
          <CommentI
            items={items}
            handleRemove={e => {
              if (confirm('삭제 하시겠습니까?')) {
                handleRemove(e);
              }
            }}
            handleModify={e => {
              this.handleOpenModPop(e);
            }}
            handleTimeSpent={e => {
              this.handleTimeSpent(e);
            }}
            hideTimeSpent={hideTimeSpent}
            hideModDel={hideModDel}
            type={type}
            option={option}
            auth={auth}
            isAddButtonShow={isAddButtonShow}
          />
        </Cond>
        <Dialog open={isAddPopOpen} maxWidth={false} PaperProps={{ tabIndex: 1 }} TransitionProps={{ tabIndex: '' }}>
          <DialogTitle>Comment 추가</DialogTitle>
          <DialogContent>
            <CondBox>
              <Cond name="수신자" redStar customFirst="2" customSecond="10">
                <AutoComplete
                  isUser
                  selectedValue={this.state.ReviewUser}
                  handleOnSelected={(e, v) => this.handleAutoComplate(v.suggestion)}
                />
              </Cond>
              <Cond name="비고" redStar customFirst="2" customSecond="10">
                <EditorW value={this.state.ReviewRemark} handleChange={v => this.handleReviewRemark(v)} />
              </Cond>
              <Cond name="첨부파일" customFirst="2" customSecond="10">
                <File
                  files={this.state.Files}
                  handleFileAdd={v => this.handleFileAdd(v)}
                  handleFileRemove={v => this.handleFileRemove(v)}
                />
              </Cond>
            </CondBox>
          </DialogContent>
          <DialogBtnBox>
            {type === 'contract' && (auth.authLawyerGroup || auth.authAdmin) && (
              <ButtonW
                name="Change Status and Save"
                handleClick={e => {
                  if (
                    confirm(
                      `Dear. 법무팀\n계약 검토 요청 시 입력된 내용(값)들이 올바르게 설정되었는지 확인 부탁드립니다.\n변경이 필요하다고 판단된 부분은 분류 및 내용 수정하여 주십시오.`,
                    )
                  ) {
                    if (this.state.ReviewUser.UserID) {
                      const alertMsg = this.checkInputData(e, false);
                      if (alertMsg.length > 0) {
                        NotificationManager.info(alertMsg.join(', '), '아래 값들은 필수 입니다.');
                      } else {
                        handleAdd({
                          ReviewUser: this.state.ReviewUser,
                          ReviewRemark: this.state.ReviewRemark,
                          Files: this.state.Files,
                          ReviewStatus: 'CST_0040',
                        });
                        this.handleDialog(false);
                      }
                    } else {
                      NotificationManager.info('수신자는 자동완성을 이용해주세요.');
                    }
                  }
                }}
                option="4"
              />
            )}
            <ButtonW
              name="Save"
              handleClick={e => {
                if (confirm('입력 하시겠습니까?')) {
                  if (this.state.ReviewUser.UserID) {
                    const alertMsg = this.checkInputData(e, false);
                    if (alertMsg.length > 0) {
                      NotificationManager.info(alertMsg.join(', '), '아래 값들은 필수 입니다.');
                    } else {
                      handleAdd({
                        ReviewUser: this.state.ReviewUser,
                        ReviewRemark: this.state.ReviewRemark,
                        Files: this.state.Files,
                        ReviewStatus: 'CST_0020',
                      });
                      this.handleDialog(false);
                    }
                  } else {
                    NotificationManager.info('수신자는 자동완성을 이용해주세요.');
                  }
                }
              }}
              option="4"
            />
            <ButtonW
              name="Close"
              handleClick={e => {
                this.handleDialog(false);
              }}
              option="2"
            />
          </DialogBtnBox>
        </Dialog>
        <Dialog open={isModPopOpen} maxWidth={false}>
          <DialogTitle>Comment 수정</DialogTitle>
          <DialogContent>
            <CondBox>
              <Cond name="비고" redStar customFirst="2" customSecond="10">
                <EditorW
                  value={this.state.modReviewRemark}
                  handleChange={v => {
                    this.setState({ ...this.state, modReviewRemark: v });
                  }}
                />
              </Cond>
            </CondBox>
          </DialogContent>
          <DialogBtnBox>
            <ButtonW
              name="Save"
              handleClick={e => {
                if (confirm('수정 하시겠습니까?')) {
                  const alertMsg = this.checkInputData(e, true);
                  if (alertMsg.length > 0) {
                    NotificationManager.info(alertMsg.join(', '), '아래 값들은 필수 입니다.');
                  } else {
                    handleModify({
                      ReviewSeq: this.state.currentModID,
                      ReviewRemark: this.state.modReviewRemark,
                    });
                    this.setState({ ...this.state, isModPopOpen: false });
                  }
                }
              }}
              option="4"
            />
            <ButtonW name="Close" handleClick={e => this.setState({ ...this.state, isModPopOpen: false })} option="2" />
          </DialogBtnBox>
        </Dialog>
        <Dialog open={isTimeSpentOpen} maxWidth={false}>
          <DialogTitle>
            <div className="text-center pt-2 pb-2" style={{ fontSize: 24 }}>
              Time Spent
            </div>
          </DialogTitle>
          <DialogContent>
            <TimeSpent
              items={this.state.timeSpentData}
              handleChange={o => {
                this.setState(
                  produce(this.state, draft => {
                    draft.timeSpentData[o.index][o.name] = o.value;
                  }),
                );
              }}
            />
          </DialogContent>
          <DialogBtnBox>
            <ButtonW
              name="Save"
              handleClick={e => {
                if (confirm('수정 하시겠습니까?')) {
                  this.handleTimeSpentSave();
                }
              }}
              option="4"
            />
            <ButtonW
              name="Close"
              handleClick={e => this.setState({ ...this.state, isTimeSpentOpen: false })}
              option="2"
            />
          </DialogBtnBox>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Comment;
