/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { changeDirection, setDarkTheme, setThemeColor, changeSettingValues } from 'actions/Default/Setting';
import {
  AMBER,
  BLUE,
  CYAN,
  DARK_AMBER,
  DARK_BLUE,
  DARK_CYAN,
  DARK_DEEP_ORANGE,
  DARK_DEEP_PURPLE,
  DARK_GREEN,
  DARK_INDIGO,
  DARK_PINK,
  DEEP_ORANGE,
  DEEP_PURPLE,
  GREEN,
  INDIGO,
  PINK,
} from 'constants/ThemeColors';
import { R, RU } from 'helpers/ramda';
import { RadioGroupW } from 'helpers/ui';
import { handleCommonChangeValues } from 'actions/Default/Common';
import SideNavOption from './SideNavOption';

class ColorOption extends React.Component {
  constructor() {
    super();
    this.state = { drawerStatus: false };
  }

  componentDidMount() {
    document.body.classList.add(this.props.themeColor);
  }

  toggleCustomizer = () => {
    this.setState({ drawerStatus: !this.state.drawerStatus });
  };

  closeCustomizer = () => {
    this.setState({ drawerStatus: false });
  };

  handleThemeColor = colorCode => {
    this.props.setThemeColor(colorCode);
    const body = document.body.classList;
    body.remove(this.props.themeColor);
    body.remove('dark-theme');
    body.add(colorCode);
  };

  handleDarkTheme = () => {
    this.props.setDarkTheme();
    const body = document.body.classList;
    body.toggle(this.props.themeColor);
    body.toggle('dark-theme');
  };

  render() {
    const {
      themeColor,
      darkTheme,
      isDirectionRTL,
      listUItype,
      changeSettingValues,
      authUser,
      isMC_MyCompanyMode,
      handleCommonChangeValues,
    } = this.props;
    const { multiCompanyUser, MyCCID, ccList } = authUser;

    return (
      <div className="theme-option">
        <IconButton onClick={this.toggleCustomizer.bind(this)}>
          <i className="zmdi zmdi-settings zmdi-hc-spin text-white" />
        </IconButton>
        <Drawer
          className="app-sidebar-content right-sidebar"
          anchor="right"
          open={this.state.drawerStatus}
          onClose={this.closeCustomizer.bind(this)}
        >
          <div className="color-theme">
            <div className="color-theme-header">
              <h3 className="color-theme-title">Setting Style </h3>
              <IconButton className="size-30" onClick={this.closeCustomizer}>
                <i className="zmdi zmdi-close text-white" />
              </IconButton>
            </div>
            <div className="color-theme-body">
              <h3>Light Sidenav</h3>
              <ul className="color-option">
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, INDIGO)}
                    className={`bg-indigo ${themeColor === INDIGO && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, CYAN)}
                    className={`bg-cyan ${themeColor === CYAN && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, AMBER)}
                    className={`bg-amber ${themeColor === AMBER && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DEEP_ORANGE)}
                    className={`bg-deep-orange ${themeColor === DEEP_ORANGE && 'active'}`}
                  />
                </li>

                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, PINK)}
                    className={`bg-pink ${themeColor === PINK && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, BLUE)}
                    className={`bg-blue ${themeColor === BLUE && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DEEP_PURPLE)}
                    className={`bg-deep-purple ${themeColor === DEEP_PURPLE && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, GREEN)}
                    className={`bg-green ${themeColor === GREEN && 'active'}`}
                  />
                </li>
              </ul>
              <h3>Dark Sidenav</h3>
              <ul className="color-option cr-op-dark-sidebar">
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_INDIGO)}
                    className={`bg-indigo ${themeColor === DARK_INDIGO && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_CYAN)}
                    className={`bg-cyan ${themeColor === DARK_CYAN && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_AMBER)}
                    className={`bg-amber ${themeColor === DARK_AMBER && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_DEEP_ORANGE)}
                    className={`bg-deep-orange ${themeColor === DARK_DEEP_ORANGE && 'active'}`}
                  />
                </li>

                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_PINK)}
                    className={`bg-pink ${themeColor === DARK_PINK && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_BLUE)}
                    className={`bg-blue ${themeColor === DARK_BLUE && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_DEEP_PURPLE)}
                    className={`bg-deep-purple ${themeColor === DARK_DEEP_PURPLE && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_GREEN)}
                    className={`bg-green ${themeColor === DARK_GREEN && 'active'}`}
                  />
                </li>
              </ul>
              {/* 
              <div className="mt-3">
                  <SideNavOption closeCustomizer={this.closeCustomizer} />
              </div> 
              */}

              {/* 
              
[유저정보 관련 검증 Case 정리]
  -> 1개 회사 유저 인경우
  -> MultiCompanyUser + 통합모드 (기본)
  -> MultiCompanyUser + 본인회사모드 (option 활성화)
  -> MultiCompanyUser + 본인회사 없는경우 (MyCCID : 0) 

              */}
              {multiCompanyUser && Boolean(MyCCID) && (
                <React.Fragment>
                  <h3 style={{ marginBottom: '10px' }}>
                    Law Firm Mode
                    <Switch
                      color="secondary"
                      classes={{
                        checked: 'text-secondary',
                        bar: 'bg-secondary',
                      }}
                      checked={!isMC_MyCompanyMode}
                      onChange={(event, checked) => {
                        handleCommonChangeValues({ name: 'isMC_MyCompanyMode', value: !checked });
                        changeSettingValues({ name: 'listUItype', value: !checked ? 'material' : 'desktop' });
                        localStorage.setItem('isMC_MyCompanyMode', !checked);

                        // (정상이용 불가능한) 요청 페이지와 같은 상태에서 남아있지 않도록.
                        window.location = '/#/app/main';
                      }}
                    />
                  </h3>
                </React.Fragment>
              )}
              {/* {multiCompanyUser && Boolean(MyCCID) && (
                <React.Fragment>
                  <h3 style={{ marginBottom: '10px' }}>
                    Do you want the form of a law firm?
                    <br />
                    <RadioGroupW
                      value={`${isMC_MyCompanyMode}`}
                      handleChange={e => {
                        const checked = e.target.value === 'true';

                        handleCommonChangeValues({ name: 'isMC_MyCompanyMode', value: checked });
                        changeSettingValues({ name: 'listUItype', value: checked ? 'material' : 'desktop' });
                        localStorage.setItem('isMC_MyCompanyMode', checked);

                        // (정상이용 불가능한) 요청 페이지와 같은 상태에서 남아있지 않도록.
                        window.location = '/#/app/main';
                      }}
                      items={[
                        { name: `Yes`, value: 'false' },
                        { name: `No`, value: 'true' }, // '${R.filter(a => a.CCID === MyCCID, ccList)[0].ccKorName}' 단일회사
                      ]}
                    />
                  </h3>
                </React.Fragment>
              )} */}
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth, common }) => {
  const { themeColor, darkTheme, isDirectionRTL, listUItype } = settings;
  const { isMC_MyCompanyMode } = common;
  const { authUser } = auth;
  return { themeColor, darkTheme, isDirectionRTL, listUItype, authUser, isMC_MyCompanyMode };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setThemeColor, setDarkTheme, changeDirection, changeSettingValues, handleCommonChangeValues },
  )(ColorOption),
);
