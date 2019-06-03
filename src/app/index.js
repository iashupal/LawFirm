import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
// import {Case} from '../components/case/Case';
// import Tour from '../components/Tour/index';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import ColorOption from 'containers/Customizer/ColorOption';
import { isIOS, isMobile } from 'react-device-detect';
import TopNav from 'components/TopNav';
import { handleGetAllCodes } from 'actions/Default/Common';
import { NotificationContainer } from 'react-notifications';
import AlertDialog from 'components/AlertDialog';
import { R, RU } from 'helpers/ramda';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import asyncComponent from '../util/asyncComponent';

import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('ko');
momentLocalizer();

const { getEnv } = RU;

class App extends React.Component {
  state = {
    hasError: false,
    err: null,
    errInfo: null,
  };

  componentDidMount() {
    const { handleGetAllCodes } = this.props;
    handleGetAllCodes();
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      err: error,
      errInfo: info,
    });
  }

  render() {
    const { match, drawerType, navigationStyle, horizontalNavPosition, settingIconHide } = this.props;
    // const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';
    const drawerStyle = 'permanent';

    const { hasError, err, errInfo } = this.state;

    // set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height');
    } else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height');
    }

    // console.log(navigationStyle, horizontalNavPosition);
    return (
      <div className={`app-container ${drawerStyle}`}>
        {/* <Tour/> */}
        <Sidebar />
        <div className="app-main-container">
          <div className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER && (
              <TopNav styleName="app-top-header" />
            )}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>
          <main className="app-main-content-wrapper">
            <div className="app-main-content" style={{ backgroundColor: '#F5F5F5'}}>
              {hasError && getEnv() === 'localhost' && (
                <h3 style={{ padding: '10px', color: 'red' }}>
                  에러가 발생했습니다. (localhost 에서만 메세지 보임 -> 비동기-권한 동작예외로 인함.)
                  <br />이 메세지가 보인 후 부터는 react-hot-loader 가 적용 되지 않으니, 에러를 수정 후 직접 페이지를
                  갱신해 주시기 바랍니다. <br />
                  <br />
                  <pre>{JSON.stringify(err)}</pre>
                  <pre>{errInfo && errInfo.componentStack}</pre>
                </h3>
              )}
              {!(hasError && getEnv() === 'localhost') && (
                <Switch>
                  <Route path={`${match.url}/main`} component={asyncComponent(() => import('./routes/System/Main'))} />
                  <Route component={asyncComponent(()=> import('../components/case/Case'))} path={`${match.url}/case/Case`} />
                  <Route component={asyncComponent(() => import('components/Error404')) } />
                </Switch>
              )}
            </div>
            <Footer />
          </main>
        </div>
        <NotificationContainer />
        <AlertDialog />
        {!settingIconHide && <ColorOption />}
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { drawerType, navigationStyle, horizontalNavPosition, settingIconHide } = settings;
  const { authUser } = auth;

  return {
    drawerType,
    navigationStyle,
    horizontalNavPosition,
    settingIconHide,
    authUser,
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { handleGetAllCodes },
  )(App),
);
