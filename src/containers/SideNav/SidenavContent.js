import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { menuDataAdmin, menuData, allMenuData } from 'helpers/data';
import { R, RU } from 'helpers/ramda';

const { changeURL, parseQueryStr, mlMessage, getRoleAuth, validatePhone } = RU;

const RuleMC_Check = (myRoleArr, multiCompanyUser, roleList, multiCompanyHide, isMC_MyCompanyMode) => {
  // myRoleArr, multiCompanyUser -> 자신 정보
  // roleList, multiCompanyHide -> 메뉴 정보

  // 권한 체크
  const checkOneRole = roleStr => !roleList || R.includes(roleStr, roleList); // 리스트 자체가 없으면 OK
  const checkAllRole = R.map(checkOneRole, myRoleArr);
  const finalCheck = R.any(R.identity, checkAllRole); // 어느 하나라도 true 면 보임

  // MultiCompany Hide Rule
  const MC_Rule = multiCompanyUser && multiCompanyHide && !isMC_MyCompanyMode;
  return MC_Rule ? false : finalCheck;
};

class SidenavContent extends Component {
  componentDidMount() {
    this.handleRenderMenu();
  }

  componentDidUpdate() {
    this.handleRenderMenu(); // 권한이 뒤늦게 Redux 에서 Setting 됨, 관련된 Event 는 계속 호출되도록 함 (성능은 추후 고려).
  }

  handleRenderMenu = e => {
    const that = this;

    const { pathname } = this.props.location; // '#' 없음 (1 time 과거)
    const pathname2 = window.location.hash; // '#' 포함 (현재)
    // console.log(pathname + ' || ' + pathname2);

    const currActivedElements = document.querySelectorAll('a.active');
    if (currActivedElements.length > 0) {
      R.map(a => a.classList.remove('active'), currActivedElements);
    }

    if (document.querySelector(`a[href="${pathname2}"]`)) {
      document.querySelector(`a[href="${pathname2}"]`).classList.add('active');
    }

    const subMenuLi = document.querySelectorAll('.sub-menu > li');
    for (let i = 0; i < subMenuLi.length; i++) {
      subMenuLi[i].onclick = function(event) {
        event.stopPropagation();
      };
    }

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        // Multi로 열리지 않게 하는 부분.
        // for (let j = 0; j < menuLi.length; j++) {
        //     const parentLi = that.closest(this, 'li');
        //     if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
        //         menuLi[j].classList.remove('open');
        //     }
        // }

        this.classList.toggle('open');
        event.stopPropagation();
      };
    }

    // 페이지 초기접속 시 해당하는 Folder 를 Open.
    try {
      const activeLi = document.querySelector(`a[href="${pathname2}"]`); // select current a element
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {
      //
    }
  };

  // eslint-disable-next-line class-methods-use-this
  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(
        fn,
      ) {
        if (typeof document.body[fn] === 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (error) {
      //
    }

    return null;
  }

  render() {
    // 시스템 관리자용 메뉴, 권한 처리
    const { myRoleArr, authUser, isMC_MyCompanyMode } = this.props;
    const { multiCompanyUser } = authUser;

    const currMenuData_temp = R.map(
      lv1 => ({
        name: lv1.name,
        data: R.map(lv2 => {
          // Lv2 제거 Logic
          return {
            name: lv2.name,
            icon: lv2.icon,
            roleList: lv2.roleList,
            multiCompanyHide: lv2.multiCompanyHide,
            data: R.filter(lv3 => {
              // Lv3 제거 Logic
              return RuleMC_Check(myRoleArr, multiCompanyUser, lv3.roleList, lv3.multiCompanyHide, isMC_MyCompanyMode);
            }, lv2.data),
          };
        }, lv1.data),
      }),
      allMenuData,
    );

    const currMenuData = R.map(
      lv1 => ({
        name: lv1.name,
        data: R.filter(lv2 => {
          // Lv2 제거 Logic
          return RuleMC_Check(myRoleArr, multiCompanyUser, lv2.roleList, lv2.multiCompanyHide, isMC_MyCompanyMode);
        }, lv1.data),
      }),
      currMenuData_temp,
    );

    // 미 호출시, 메인화면에서 (큰 아이콘) 직접 클릭시 -> 좌측 메뉴가 갱신되지 않음.
    this.handleRenderMenu();

    return (
      <CustomScrollbars className="scrollbar">
        {currMenuData.map(item1 => (
          <ul className="nav-menu" key={item1.name}>
            <li className="nav-header">
              <IntlMessages id={item1.name} />

            </li>
           
           
            <li className="menu collapse-box">
              {item1.data.map(item2 => (
                <ul key={item2.name}>
                  <li className="menu collapse-box">
                    <Button href="javascript:void(0)">
                      {item2.icon && <i className={item2.icon} />}
                      {!item2.icon && <i className="zmdi zmdi-folder zmdi-hc-fw" />}
                      <span className="nav-text text-transform-none">
                        <IntlMessages id={item2.name} />
                      </span>
                      
                      
                    </Button>  
                    <ul className="sub-menu">
                      {item2.data.map(item3 => (
                        <li key={item3.name}>
                          <NavLink className="prepend-icon" to={item3.link}>
                            <span className="nav-text text-transform-none">
                              <IntlMessages id={item3.name} />
                            </span>
                          </NavLink>
                          
                        </li>
                        
                        
                      ))}
                    </ul>
                  </li>
                </ul>
              ))}
            </li>
            
          </ul>
        ))}
        {/* 스크롤이 하단까지 내려가지 않는 이슈로 인해 비어있는 div 추가함. */}
        <div style={{ height: '100px' }}>&nbsp;</div>
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = ({ common, routing, auth }) => {
  const { allCodes, myRoleArr, allErrorOn, isMC_MyCompanyMode } = common;
  const { authUser } = auth;
  const { location } = routing;
  return { allCodes, myRoleArr, allErrorOn, location, authUser, isMC_MyCompanyMode };
};

export default connect(
  mapStateToProps,
  {},
)(withRouter(SidenavContent));
