import React from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'helpers/ui';
import CardBox from 'components/CardBox/index';
import { Link } from 'react-router-dom';
import ic_main_01 from 'assets/images/icons/ic_main_01.png';
import ic_main_02 from 'assets/images/icons/ic_main_02.png';
import ic_main_03 from 'assets/images/icons/ic_main_03.png';
import ic_main_04 from 'assets/images/icons/ic_main_04.png';
import ic_main_10 from 'assets/images/icons/ic_main_10.png';
import ic_main_11 from 'assets/images/icons/ic_main_11.png';
import ic_main_14 from 'assets/images/icons/ic_main_14.png';
import ic_main_15 from 'assets/images/icons/ic_main_15.png';
import { RU } from 'helpers/ramda';
import { Transition } from 'react-transition-group';
import { transitionStyles } from 'helpers/styles';

const { mlMessage } = RU;
const tranStyle = transitionStyles(500);

class Main extends React.Component {
  state = {
    show: false,
  };

  render() {
    // 주의 : 영문/한글이 동적으로 바뀔수 있어, render() 마다 계산해야 함.
    const list_org = [
      {
        name: mlMessage('pages.contractSearch'),
        link: '/app/contract/search',
        icon: ic_main_01,
      }, // 계약서 검토 조회
      {
        name: mlMessage('pages.contractSave'),
        link: '/app/contract/save',
        icon: ic_main_02,
      }, // 계약서 검토 요청
      {
        name: mlMessage('pages.lawSearch'),
        link: '/app/law/search',
        icon: ic_main_03,
      }, // 법률자문 조회
      {
        name: mlMessage('pages.lawSave'),
        link: '/app/law/save',
        icon: ic_main_04,
      }, // 법률자문 요청
      {
        name: mlMessage('pages.projectSearch'),
        link: '/app/project/search',
        icon: ic_main_10,
      }, // Project 조회
      {
        name: mlMessage('pages.projectSave'),
        link: '/app/project/save',
        icon: ic_main_11,
      }, // Project 등록
      {
        name: mlMessage('pages.litigationSearch'),
        link: '/app/litigation/search',
        icon: ic_main_14,
      }, // 송무 조회
      {
        name: mlMessage('pages.litigationSave'),
        link: '/app/litigation/save',
        icon: ic_main_15,
      }, // 송무 등록
      {
        name: mlMessage('pages.case'),
        link: '/app/case/Case',
        icon: ic_main_15,
      }
    ];

    const list_MultiCompany = [
      {
        name: mlMessage('pages.contractSearch'),
        link: '/app/contract/search',
        icon: ic_main_01,
      }, // 계약서 검토 조회
      {
        name: mlMessage('pages.lawSearch'),
        link: '/app/law/search',
        icon: ic_main_03,
      }, // 법률자문 조회
      {
        name: mlMessage('pages.projectSearch'),
        link: '/app/project/search',
        icon: ic_main_10,
      }, // Project 조회
      {
        name: mlMessage('pages.litigationSearch'),
        link: '/app/litigation/search',
        icon: ic_main_14,
      }, // 송무 조회
    ];
    const { isMC_MyCompanyMode, multiCompanyUser } = this.props;
    const list = !isMC_MyCompanyMode && multiCompanyUser ? list_MultiCompany : list_org;

    return (
      <div className="app-wrapper">
        <PageTitle title={mlMessage('pages.legalTitle')} />
        <div className="row">
          {list &&
            list.map(i => (
              <CardBox styleName="col-lg-3 col-md-4" cardStyle="p-0" key={i.link}>
                <Link className="" to={i.link} style={{ textDecoration: 'none' }}>
                  <div className="text-center pt-3 pb-3 main-page">
                    <img src={i.icon} alt="" />
                    <Transition
                      in={this.state.show}
                      timeout={500} // unmountOnExit
                    >
                      {st => (
                        <div>
                          <span
                            style={{
                              ...tranStyle.default,
                              ...tranStyle[st],
                            }}
                          >
                            {i.name}
                          </span>
                        </div>
                      )}
                    </Transition>
                  </div>
                </Link>
              </CardBox>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, common }) => {
  const { authUser } = auth;
  const { isMC_MyCompanyMode } = common;
  const { multiCompanyUser } = authUser;

  return {
    isMC_MyCompanyMode,
    multiCompanyUser,
  };
};

export default connect(
  mapStateToProps,
  {},
)(Main);
