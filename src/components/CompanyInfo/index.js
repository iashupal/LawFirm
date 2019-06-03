import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonW, DialogBtnBox, SearchTextFieldW, CondBox, Cond, TextFieldW, SelectW, LoadingBox } from 'helpers/ui';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardBox from 'components/CardBox/index';
import produce from 'immer';
import { PostCall } from 'helpers/ajax';
import { RU } from 'helpers/ramda';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IntlMessages from 'util/IntlMessages';
import { withTheme } from '@material-ui/core/styles';

const { mlMessage } = RU;

class CompanyInfo extends Component {
  state = {
    items: [],
    itemSearch: {
      CorRegNumber: '',
      PartnerCorpName: '',
      Page: 0,
      Records: 10,
    },
    itemAllCount: 0,
    isDialogOpen: false,
    isOpen: false,
    InputItem: '',
    companyInfo: {
      bizNum: '',
      companyName: '',
      address: '',
      country: 'CY_KOR',
    },
    isLoading: false,
  };

  handleChangeSearch = e => {
    this.setState({
      ...this.state,
      itemSearch: {
        ...this.state.itemSearch,
        PartnerCorpName: e.target.value,
      },
    });
  };

  handleSearch = async e => {
    const { CorRegNumber, PartnerCorpName, Page, Records } = this.state.itemSearch;
    const { current_CCID } = this.props;

    await this.setState({
      ...this.state,
      isLoading: true,
    });

    const res = await PostCall('/common/customerpartner_select_list', {
      CorRegNumber,
      PartnerCorpName,
      Page: Page + 1,
      Records,
      CCID: current_CCID,
    });

    await this.setState({
      ...this.state,
      items: res.data.List,
      itemAllCount: res.data.Total,
      isLoading: false,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      isDialogOpen: false,
    });
  };

  handleChangePaging = async ({ Page, Records }) => {
    await this.setState(
      produce(this.state, draft => {
        draft.itemSearch.Page = Page;
        draft.itemSearch.Records = Records;
      }),
    );
    this.handleSearch();
  };

  handleClick = item => {
    this.props.handleOnSelected(item);
    this.handleClose();
  };

  handleOpen = () => {
    this.setState({
      ...this.state,
      isOpen: true,
    });
  };

  handleFold = () => {
    this.setState({
      ...this.state,
      isOpen: false,
    });
  };

  handleInputChange = ({ name, value }) => {
    this.setState(
      produce(this.state, draft => {
        if (name === 'bizNum') {
          if (`${parseInt(value, 10)}` !== 'NaN') {
            if (value.length <= 11) {
              draft.companyInfo[name] = parseInt(value, 10);
            } else {
              draft.companyInfo[name] = parseInt(value.slice(0, 11), 10);
            }
          } else {
            draft.companyInfo[name] = '';
          }
        } else if (name === 'companyName') {
          if (value.length <= 100) {
            draft.companyInfo[name] = value;
          } else {
            draft.companyInfo[name] = value.slice(0, 100);
          }
        } else if (value.length <= 255) {
          draft.companyInfo[name] = value;
        } else {
          draft.companyInfo[name] = value.slice(0, 255);
        }
      }),
    );
  };

  handleAdd = async () => {
    const { bizNum, companyName, address, country } = this.state.companyInfo;
    const res = await PostCall('/common/customerpartner_insert', {
      CorRegNumber: bizNum,
      PartnerCorpName: companyName,
      PartnerAddress: address,
      CountryCode: country,
      CCID: this.props.current_CCID,
      PartnerContractPerson: '',
      PartnerPhone: '',
      PartnerEmail: '',
    });

    this.handleClick({
      PartnerID: res.data[0].PartnerID,
      PartnerCorpName: this.state.companyInfo.companyName,
      PartnerAddress: this.state.companyInfo.address,
      CorRegNumber: this.state.companyInfo.bizNum,
      CountryCode: this.state.companyInfo.country,
      CountryName: '',
      PartnerType: 'C',
      RowNum: null,
    });
  };

  render() {
    const { isReadOnly, allCodes, allErrorOn, current_CCID } = this.props;
    const { items, itemSearch, itemAllCount, isDialogOpen, isOpen, companyInfo, isLoading } = this.state;

    return (
      <React.Fragment>
        {!isReadOnly && (
          <ButtonW
            handleClick={async e => {
              await this.handleSearch();
              this.setState({ ...this.state, isDialogOpen: true });
            }}
            option="1"
            toolTipMsg="회사를 검색 및 등록하는 기능입니다."
          >
            <i className="zmdi zmdi-search zmdi-hc-fw" />
          </ButtonW>
        )}
        <Dialog open={isDialogOpen} maxWidth={false}>
          <DialogTitle>{mlMessage('pages.common.companyInfo')}</DialogTitle>
          <DialogContent className="pt-1">
            <div className="row">
              <CardBox styleName="col-12" cardStyle="p-0">
                <div>
                  <SearchTextFieldW
                    id="PartnerCorpName"
                    handleChange={this.handleChangeSearch}
                    handleKeyPress={e => {
                      if (e.key === 'Enter') {
                        this.handleSearch();
                      }
                    }}
                    value={itemSearch.PartnerCorpName}
                    placeholderText={mlMessage('pages.common.companyName')}
                    width="80"
                  >
                    <ButtonW handleClick={this.handleOpen}>
                      <i className="zmdi zmdi-plus" />
                    </ButtonW>
                  </SearchTextFieldW>
                  {isOpen && (
                    <React.Fragment>
                      <div
                        className="d-flex justify-content-between"
                        style={{ backgroundColor: this.props.theme.palette.primary.main }}
                      >
                        <div>
                          <h2 className="m-2 p-3" style={{ color: this.props.theme.palette.primary.contrastText }}>
                            상대 회사 정보 입력
                          </h2>
                        </div>
                        <div />
                        <div className="mt-3">
                          <span className="m-2" />
                          <ButtonW name="Save" option="2" style={{ marginTop: 3 }} handleClick={this.handleAdd} />
                          <span className="m-2" />
                          <ButtonW name="Fold" option="2" handleClick={this.handleFold} />
                          <span className="m-2" />
                        </div>
                      </div>
                      <CondBox>
                        <Cond name={mlMessage('pages.common.companyName')} customFirst="2" customSecond="4">
                          <TextFieldW
                            value={companyInfo.companyName}
                            handleChange={e => this.handleInputChange({ name: 'companyName', value: e.target.value })}
                            errorOn={allErrorOn}
                          />
                        </Cond>
                        <Cond name={mlMessage('pages.common.companyNo')} customFirst="2" customSecond="4">
                          <TextFieldW
                            value={companyInfo.bizNum}
                            handleChange={e => this.handleInputChange({ name: 'bizNum', value: e.target.value })}
                            errorOn={allErrorOn}
                          />
                        </Cond>
                        <Cond name="주소" customFirst="2" customSecond="4">
                          <TextFieldW
                            value={companyInfo.address}
                            handleChange={e => this.handleInputChange({ name: 'address', value: e.target.value })}
                            errorOn={allErrorOn}
                          />
                        </Cond>
                        <Cond name="국가" customFirst="2" customSecond="4">
                          <SelectW
                            value={companyInfo.country}
                            items={allCodes.CY}
                            handleChange={e => this.handleInputChange({ name: 'country', value: e.target.value })}
                            isUseAll={false}
                          />
                        </Cond>
                      </CondBox>
                    </React.Fragment>
                  )}
                  <div className="table-responsive-material">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className="text-center">
                            <IntlMessages id="pages.common.companyNo" />
                          </TableCell>
                          <TableCell className="text-center">
                            <IntlMessages id="pages.common.companyName" />
                          </TableCell>
                          <TableCell className="text-center">
                            <IntlMessages id="pages.common.address" />
                          </TableCell>
                          <TableCell className="text-center">
                            <IntlMessages id="pages.common.country" />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {items &&
                          items.map(n => {
                            return (
                              <TableRow key={n.RowNum}>
                                <TableCell>
                                  <Button color="primary" onClick={e => this.handleClick(n)}>
                                    {n.PartnerCorpName}
                                  </Button>
                                </TableCell>
                                <TableCell>{n.CorRegNumber}</TableCell>
                                <TableCell>{n.PartnerAddress}</TableCell>
                                <TableCell>{n.CountryName}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      count={itemAllCount}
                      rowsPerPage={itemSearch.Records}
                      page={itemSearch.Page}
                      backIconButtonProps={{
                        'aria-label': 'Previous Page',
                      }}
                      nextIconButtonProps={{
                        'aria-label': 'Next Page',
                      }}
                      onChangePage={(e, Page) => this.handleChangePaging({ Page, Records: itemSearch.Records })}
                      onChangeRowsPerPage={e => this.handleChangePaging({ Page: 0, Records: e.target.value })}
                    />
                  </div>
                </div>
              </CardBox>
            </div>
          </DialogContent>
          <DialogBtnBox>
            <ButtonW name="Close" handleClick={this.handleClose} option="2" />
          </DialogBtnBox>
        </Dialog>
        <LoadingBox isLoading={isLoading} />
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
)(withTheme()(CompanyInfo));
