import React, { Component } from 'react';
import { Cond, CondBox, ButtonW, DialogBtnBox } from 'helpers/ui';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import { PostCall } from 'helpers/ajax';

class TotalTime extends Component {
  state = {
    isOpen: false,
    items: [],
  };

  handleOpen = async e => {
    let result = [];

    if (this.props.LawUUID) {
      result = await PostCall('/law/selectTimeSpentTotal', {
        LawUUID: this.props.LawUUID,
      });
    } else {
      result = await PostCall('/contract/selectTimeSpentTotal', {
        ContractUUID: this.props.ContractUUID,
      });
    }

    this.setState({
      ...this.state,
      items: result.data,
      isOpen: true,
    });
  };

  render() {
    const { isOpen, items } = this.state;
    const { toolTipMsg } = this.props;
    return (
      <React.Fragment>
        <ButtonW handleClick={this.handleOpen} option="1" toolTipMsg={toolTipMsg} toolTipMsgPlacement="bottom">
          <i className="zmdi zmdi-time zmdi-hc-fw" />
        </ButtonW>
        <Dialog open={isOpen} maxWidth={false}>
          <DialogTitle>Total Time spent sheet</DialogTitle>
          <DialogContent>
            <CondBox>
              <Cond isFullWidth={true}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-center">NAME</TableCell>
                      <TableCell className="text-center">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items &&
                      items.map(n => {
                        return (
                          <TableRow key={n.UserName}>
                            <TableCell
                              className={classNames({
                                'text-center': true,
                                'font-weight-bold': n.UserName === 'Total',
                              })}
                            >
                              {n.UserName}
                            </TableCell>
                            <TableCell
                              className={classNames({
                                'text-center': true,
                                'font-weight-bold': n.UserName === 'Total',
                              })}
                            >
                              {n.SpentHour}시간 {n.SpentMinute}분
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Cond>
            </CondBox>
          </DialogContent>
          <DialogBtnBox>
            <ButtonW
              name="Close"
              handleClick={e => {
                this.setState({ ...this.state, isOpen: false });
              }}
              option="2"
            />
          </DialogBtnBox>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default TotalTime;
