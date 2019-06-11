import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import 'react-big-calendar/lib/less/styles.less';
import 'styles/bootstrap.scss';
import 'styles/app.scss';
import MainApp from 'app/index';
import { setInitUrl, userSignInToken } from 'actions/Default/Auth';
// import asyncComponent from 'util/asyncComponent';
import indigoTheme from './themes/indigoTheme';
import cyanTheme from './themes/cyanTheme';
import orangeTheme from './themes/orangeTheme';
import amberTheme from './themes/amberTheme';
import pinkTheme from './themes/pinkTheme';
import blueTheme from './themes/blueTheme';
import purpleTheme from './themes/purpleTheme';
import greenTheme from './themes/greenTheme';
import AppLocale from '../lngProvider';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Demo from './ComponentDemo';

// https://github.com/dmtrKovalenko/material-ui-pickers/issues/864
MomentUtils.prototype.getStartOfMonth = MomentUtils.prototype.startOfMonth;

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={props => {
                if (authUser) {
                    return <Component {...props} />;
                }
                if (token) {
                    return <div />;
                }
                return (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                );
            }}
        />
    );
};

class App extends Component {
    componentWillMount() {
        const { initURL, setInitUrl, history, userSignInToken } = this.props;
        const { pathname, search } = history.location;
        if (pathname === '/signin' && search.indexOf('?signup') === 0) {
            // signupUserID, signupEmailAdmin 모두 포함.
            // console.log('initURL:' + initURL);
            // console.log('pathname:' + pathname); // /signin
            // console.log('search:' + search); // ?signupEmailAdmin=BA4583DDF83311E8BE2C0242AC150002
        } else {
            if (initURL === '') {
                setInitUrl(pathname + search);
            }

            const token = localStorage.getItem('token');
            if (token) {
                userSignInToken();
            }
        }
    }

    getColorTheme = themeColor => {
        const mapObj = {
            INDIGO: indigoTheme,
            CYAN: cyanTheme,
            AMBER: amberTheme,
            'DEEP-ORANGE': orangeTheme,
            PINK: pinkTheme,
            BLUE: blueTheme,
            'DEEP-PURPLE': purpleTheme,
            GREEN: greenTheme,
            'DARK-INDIGO': indigoTheme,
            'DARK-CYAN': cyanTheme,
            'DARK-AMBER': amberTheme,
            'DARK-DEEP-ORANGE': orangeTheme,
            'DARK-PINK': pinkTheme,
            'DARK-BLUE': blueTheme,
            'DARK-DEEP-PURPLE': purpleTheme,
            'DARK-GREEN': greenTheme
        };

        const colorName = themeColor.toUpperCase();
        const themeObj = mapObj[colorName];
        themeObj.typography.useNextVariants = true;

        return createMuiTheme(themeObj);
    };

    render() {
        const {
            match,
            location,
            themeColor,
            isDarkTheme,
            locale,
            authUser,
            initURL,
            isDirectionRTL
        } = this.props;
        if (location.pathname === '/') {
            if (authUser === null) {
                return <Redirect to="/signin" />;
            }
            if (initURL === '' || initURL === '/' || initURL === '/signin') {
                return <Redirect to="/app/main" />; // 초기 View 페이지
            }
            return <Redirect to={initURL} />;
        }

        const applyTheme = this.getColorTheme(themeColor);

        if (location.pathname === '/') {
            if (authUser === null) {
                return <Redirect to="/signin" />;
            }
            if (initURL === '' || initURL === '/' || initURL === '/signin') {
                return <Redirect to="/app/dashboard/default" />;
            }
            return <Redirect to={initURL} />;
        }

        if (isDirectionRTL) {
            applyTheme.direction = 'rtl';
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
            applyTheme.direction = 'ltr';
        }

        const currentAppLocale = AppLocale[locale.locale];
        return (
            <MuiThemeProvider theme={applyTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <IntlProvider
                        locale={currentAppLocale.locale}
                        messages={currentAppLocale.messages}
                    >
                        <div className="app-main">
                            <Switch>
                                <Route path="/demo" component={Demo} />
                                <RestrictedRoute
                                    path={`${match.url}app`}
                                    authUser={authUser}
                                    component={MainApp}
                                />
                                <Route path="/signin" component={SignIn} />
                                <Route path="/signup" component={SignUp} />
                                {/* <Route component={asyncComponent(() => import('components/Error404'))} /> */}
                            </Switch>
                        </div>
                    </IntlProvider>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ settings, auth }) => {
    const {
        themeColor,
        darkTheme,
        sideNavColor,
        locale,
        isDirectionRTL
    } = settings;
    const { authUser, initURL } = auth;
    return {
        themeColor,
        isDarkTheme: darkTheme,
        sideNavColor,
        locale,
        isDirectionRTL,
        authUser,
        initURL
    };
};

export default connect(
    mapStateToProps,
    { setInitUrl, userSignInToken }
)(App);
