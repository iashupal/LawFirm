import React from 'react';
import { ButtonW, DialogBtnBox, CondBox, Cond, NumberFieldW, SelectW, BlankSpan } from 'helpers/ui';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import produce from 'immer';
import { R, RU } from 'helpers/ramda';
import IntlMessages from 'util/IntlMessages';
import { withStyles } from '@material-ui/core/styles';
import { NotificationManager } from 'react-notifications';

const styles = () => ({
  dialog: {
    width: '764px',
    '@media (max-width: 860px)': {
      width: '100%',
    },
  },
  table: {
    width: '300px',
  },
  tablecell1: {
    padding: 'unset',
    fontWeight: 'bold',
    paddingTop: '7px',
  },
  tablecell2: {
    padding: 'unset',
    textAlign: 'right',
    paddingRight: '6px',
  },
  tablecell3: {
    padding: 'unset',
    paddingTop: '7px',
  },
});

const InnerTable = ({ amount, currency, year, allCodes, classes }) => {
  return (
    <TableRow>
      <TableCell className={classes.tablecell1}>{year}년차</TableCell>
      <TableCell className={classes.tablecell2}>
        <NumberFieldW value={amount} decimalScale={4} isReadOnly />
      </TableCell>
      <TableCell className={classes.tablecell3}>
        <SelectW value={currency} items={allCodes.CURR} isReadOnly />
      </TableCell>
    </TableRow>
  );
};

class ContractAmount extends React.Component {
  state = {
    isDialogOpen: false,
    isChecked: false,
    amount: '',
    amounts: [
      { Seq: 1, Value: '' },
      { Seq: 2, Value: '' },
      { Seq: 3, Value: '' },
      { Seq: 4, Value: '' },
      { Seq: 5, Value: '' },
    ],
    currency: 'CURR_KRW',
  };

  numOr0 = n => parseFloat(n || 0);

  componentDidMount = () => {
    const { isReadOnly, detailID, data } = this.props;

    if (detailID && !isReadOnly) {
      this.setState(
        produce(this.state, draft => {
          draft.amounts = data.contractAmounts;
          draft.amount = data.contractAmount;
        }),
      );
    }
  };

  handleChange = async ({ name, value }) => {
    await this.setState(
      produce(this.state, draft => {
        draft.amounts[name - 1].Value = value;
      }),
    );

    const v = R.pluck('Value', this.state.amounts);
    const onlyNumberArr = R.map(this.numOr0, v);
    const sum = R.sum(onlyNumberArr);

    await this.setState({
      ...this.state,
      amount: sum,
    });
  };

  handleClose = async () => {
    this.setState({
      ...this.state,
      isDialogOpen: false,
    });
  };

  handleSave = () => {
    const { amount } = this.state;
    if (!amount) {
      NotificationManager.info('계약규모는 필수 입니다.');
      return;
    }

    this.handleCommonSave();

    this.setState({
      ...this.state,
      isDialogOpen: false,
    });
  };

  handleClear = async () => {
    const { handleChangeContractAmount } = this.props;

    await this.setState({
      amount: '',
      amounts: [
        { Seq: 1, Value: '' },
        { Seq: 2, Value: '' },
        { Seq: 3, Value: '' },
        { Seq: 4, Value: '' },
        { Seq: 5, Value: '' },
      ],
    });

    this.handleCommonSave();

    handleChangeContractAmount({ name: 'isContractAmountYears', value: false });
    handleChangeContractAmount({ name: 'currency', value: 'CURR_KRW' });
  };

  handleCommonSave = () => {
    const { amount, amounts } = this.state;
    const { handleChangeContractAmount } = this.props;

    const v = amounts.filter(n => {
      return n.Value !== '';
    });

    handleChangeContractAmount({ name: 'contractAmount', value: amount });
    handleChangeContractAmount({ name: 'contractAmounts', value: v });
  };

  render() {
    const { classes, isReadOnly, allCodes, data, handleChangeContractAmount } = this.props;
    const { isDialogOpen, amount, amounts } = this.state;

    return (
      <React.Fragment>
        <NumberFieldW
          value={data.contractAmount}
          decimalScale={4}
          handleChange={v => handleChangeContractAmount({ name: 'contractAmount', value: v })}
          isReadOnly={data.isContractAmountYears || isReadOnly}
          style={{
            width: '192px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'initial',
            height: '27px',
            textAlign: 'right',
          }}
        />
        <BlankSpan num={2} />
        <SelectW
          value={data.currency}
          items={allCodes.CURR}
          isUseAll={false}
          ordering="name"
          name="currency"
          handleChange={e => handleChangeContractAmount({ name: 'currency', value: e.target.value })}
          isReadOnly={data.isContractAmountYears || isReadOnly}
          readStyle={{
            position: 'relative',
            top: '10px',
          }}
        />
        <BlankSpan num={2} />
        {!isReadOnly && (
          <React.Fragment>
            <ButtonW
              handleClick={() => {
                this.setState({ ...this.state, isDialogOpen: true });
                handleChangeContractAmount({ name: 'isContractAmountYears', value: true });
              }}
              option="1"
              toolTipMsg="다년간 계약 규모를 입력하는 기능입니다."
            >
              <i className="zmdi zmdi-plus" />
            </ButtonW>
          </React.Fragment>
        )}
        {data.isContractAmountYears && (
          <React.Fragment>
            <Table className={classes.table}>
              <TableBody>
                {data.contractAmounts &&
                  data.contractAmounts.map(n => {
                    return (
                      <InnerTable
                        key={n.Seq}
                        year={n.Seq}
                        amount={n.Value}
                        currency={data.currency}
                        allCodes={allCodes}
                        classes={classes}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </React.Fragment>
        )}
        <Dialog open={isDialogOpen} maxWidth={false}>
          <div className={classes.dialog}>
            <DialogTitle>{<IntlMessages id="pages.contract.contractAmount" />}</DialogTitle>
            <DialogContent className="pt-1">
              <CondBox>
                <Cond name={<IntlMessages id="pages.contract.contractAmount" />}>
                  <NumberFieldW
                    value={amount}
                    decimalScale={4}
                    isReadOnly
                    style={{
                      width: '192px',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      borderColor: 'initial',
                      height: '27px',
                      textAlign: 'right',
                    }}
                  />
                  <BlankSpan num={2} />
                  <SelectW
                    value={data.currency}
                    items={allCodes.CURR}
                    isUseAll={false}
                    ordering="name"
                    name="currency"
                    handleChange={e => handleChangeContractAmount({ name: 'currency', value: e.target.value })}
                  />
                </Cond>
                {amounts &&
                  amounts.map(n => {
                    return (
                      <React.Fragment key={n.Seq}>
                        <Cond name={`${n.Seq}년차`}>
                          <NumberFieldW
                            value={n.Value}
                            decimalScale={4}
                            handleChange={v => this.handleChange({ name: n.Seq, value: v })}
                          />
                        </Cond>
                      </React.Fragment>
                    );
                  })}
                {/* <Cond name="2년차">
                    <NumberFieldW
                      value={amount2}
                      decimalScale={4}
                      handleChange={v => this.handleChange({ name: 'amount2', value: v })}
                    />
                  </Cond>
                  <Cond name="3년차">
                    <NumberFieldW
                      value={amount3}
                      decimalScale={4}
                      handleChange={v => this.handleChange({ name: 'amount3', value: v })}
                    />
                  </Cond>
                  <Cond name="4년차">
                    <NumberFieldW
                      value={amount4}
                      decimalScale={4}
                      handleChange={v => this.handleChange({ name: 'amount4', value: v })}
                    />
                  </Cond>
                  <Cond name="5년차">
                    <NumberFieldW
                      value={amount5}
                      decimalScale={4}
                      handleChange={v => this.handleChange({ name: 'amount5', value: v })}
                    />
                  </Cond> */}
              </CondBox>
            </DialogContent>
            <DialogBtnBox>
              <ButtonW name="Save" handleClick={this.handleSave} option="4" />
              <ButtonW name="Clear" handleClick={this.handleClear} option="2" />
              <ButtonW name="Close" handleClick={this.handleClose} option="2" />
            </DialogBtnBox>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ContractAmount);
