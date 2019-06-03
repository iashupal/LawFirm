import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import CardBox from 'components/CardBox/index';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/lab/Slider';
import NumberFormat from 'react-number-format';
import CKEditor from 'ckeditor4-react';
import classnames from 'classnames';
import { R, RU } from 'helpers/ramda';
import ContainerHeader from 'components/ContainerHeader/index';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import { urlMaster } from 'helpers/ajax';
import Widget from 'components/Widget/index';
import { DropdownList, DateTimePicker } from 'react-widgets';
import styled from 'styled-components';
import Picky from 'react-picky';

const { convertEditorText, yearMonthDay, checkedNames, isEng, mlMessage, licenseCalc } = RU;

export const SubTitle = ({ children }) => <h3 className="pb-3 pt-4">{children}</h3>;
export const DialogBtnBox = ({ children }) => (
  <DialogActions>
    <div className="col-md-12 text-center pb-2">{children}</div>
  </DialogActions>
);
export const BlankSpan = ({ num, innerText, style }) => (
  <span style={style} className={`pl-${num} pr-${num}`}>
    {innerText}
  </span>
);
export const DatePickerToStr = ({ style }) => <BlankSpan num={3} style={style} innerText="to" />;

export const LoadingBox = ({ isLoading }) => {
  return (
    <Dialog open={isLoading}>
      <DialogContent className="d-flex flex-row bd-highlight">
        <CircularProgress size={50} color="primary" className="p-2 bd-highlight" />
        <div className="p-3 bd-highlight">Please Wait...</div>
      </DialogContent>
    </Dialog>
  );
};

export const PageTitle = ({ title, match, renderComponent }) => {
  match = match || { path: '' };
  return <ContainerHeader renderComponent={renderComponent} match={match} title={title} />;
};

export const CondBox = ({ children, buttonArea }) => {
  return (
    <div className="row">
      <CardBox styleName="col-12" cardStyle="p-2">
        <div className="row">{children}</div>
      </CardBox>
      {buttonArea && buttonArea}
    </div>
  );
};

export const Cond = ({ name, children, redStar = false, toolTipMsg = '', isFullWidth, customFirst, customSecond }) => {
  return (
    <React.Fragment>
      {isFullWidth && (
        <div className={classnames('col-md-12', 'mt-2', 'mb-2', 'd-flex', 'align-items-center')}>
          <div className="form-group mb-0 w-100">{children}</div>
        </div>
      )}
      {!isFullWidth && (
        <React.Fragment>
          <div
            className={classnames(
              `col-md-${customFirst || '3'}`,
              'pl-4',
              'mt-2',
              'mb-2',
              'd-flex',
              'align-items-center',
            )}
            style={{ minHeight: 48 }}
          >
            {name}
            {redStar ? <span className="text-danger"> *</span> : ''}
            {toolTipMsg ? (
              <Tooltip id="tooltip-icon" title={<span style={{ fontSize: 15 }}>{toolTipMsg}</span>} placement="right">
                <i className="zmdi zmdi-hc-lg zmdi-help zmdi-hc-fw mdc-text-green pl-1 animated fadeInLeft" />
              </Tooltip>
            ) : (
              ''
            )}
          </div>
          <div
            className={classnames(
              `col-md-${customSecond || '9'}`,
              'pl-4',
              'mt-2',
              'mb-2',
              'd-flex',
              'align-items-center',
            )}
          >
            <div className="form-group mb-0 w-100">{children}</div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export const SelectW = ({
  name,
  value,
  items,
  handleChange,
  isReadOnly,
  isUseAll = true,
  label,
  style,
  readStyle,
  ordering,
}) => {
  const flag = false;
  // if (name === 'currency') {
  //   flag = true;
  // }
  let valueText = '';
  if (isReadOnly) {
    try {
      valueText = R.filter(a => a.value === value, items)[0].name;
    } catch (e) {
      // no work
    }
  }

  if (ordering === 'name' && items) {
    items.sort((a, b) => {
      const isCurrency = name === 'currency';
      const name_a = isCurrency ? a.name.split(' ')[1] : a.name;
      const name_b = isCurrency ? b.name.split(' ')[1] : b.name;

      const compareValue = name_a > name_b ? 1 : -1;
      return name_a === name_b ? 0 : compareValue;
    });
  }

  const selectComponent = (
    <Select
      style={style}
      value={value || 0}
      name={name}
      onChange={handleChange}
      displayEmpty
      disabled={isReadOnly}
      inputProps={
        {
          // name: 'age',
          // id: 'age-simple',
        }
      }
    >
      {isUseAll && (
        <MenuItem value="" key="">
          <em>-- All --</em>
        </MenuItem>
      )}
      {items &&
        items.map(i => {
          return (
            <MenuItem value={i.value} key={i.value}>
              {flag === false ? i.name : `[${i.code}] ${i.name}`}
            </MenuItem>
          );
        })}
    </Select>
  );

  return (
    <React.Fragment>
      {!isReadOnly && !label && selectComponent}
      {!isReadOnly && label && (
        <FormControl>
          <InputLabel shrink>{label}</InputLabel>
          {selectComponent}
        </FormControl>
      )}
      {isReadOnly && <span style={readStyle}>{valueText}</span>}
    </React.Fragment>
  );
};

export const CheckboxW = ({ list, handleChange, option, isReadOnly }) => {
  let style;
  if (!option || option === '1') {
    style = {};
  }

  if (option === '2') {
    style = {
      backgroundColor: 'lightGray',
      color: 'white',
      paddingRight: '10px',
      marginLeft: '0px',
      marginTop: '5px',
      borderRadius: '5px',
    };
  }

  // style.borderStyle = 'solid';
  // style.borderColor = 'red';

  let valueText = '';
  if (isReadOnly) {
    try {
      const names = checkedNames(list);
      valueText = names.join(', ');
    } catch (e) {
      // no work
    }
  }

  return (
    <React.Fragment>
      {!isReadOnly && (
        <FormGroup row>
          {list &&
            list.map(i => {
              return (
                <FormControlLabel
                  key={i.id}
                  control={
                    <Checkbox
                      color="secondary"
                      checked={i.value}
                      onChange={handleChange}
                      value={i.id}
                      style={option === '2' ? { width: '35px', height: '35px' } : {}}
                      disabled={isReadOnly}
                    />
                  }
                  label={i.name}
                  style={style}
                />
              );
            })}
        </FormGroup>
      )}
      {isReadOnly && <span>{valueText}</span>}
    </React.Fragment>
  );
};

export const DatePickerW = ({
  value,
  handleChange,
  isReadOnly,
  label,
  style = { width: 85 },
  fullWidth = false,
  disabled,
  clearable = true,
  disablePast,
  minDate,
  maxDate,
}) => {
  if (isReadOnly) {
    return <span>{value ? yearMonthDay(value) : ''}</span>;
  }

  return (
    <DatePicker
      format="YYYY-MM-DD"
      fullWidth={fullWidth}
      value={value}
      onChange={handleChange}
      animateYearScrolling={false}
      leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
      rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
      disabled={!!disabled}
      style={style}
      emptyLabel=""
      label={label}
      clearable={clearable}
      disablePast={disablePast}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export const TextAreaW = ({ value, handleChange, label, placeholder, isReadOnly }) => {
  return (
    <React.Fragment>
      <FormControl fullWidth>
        <FormLabel className="mb-1">{label}</FormLabel>
        {!isReadOnly && (
          <textarea
            className="form-control form-control-lg"
            rows="3"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        )}
        {isReadOnly && (
          <CardBox styleName="col-12">
            <div
              className="row"
              dangerouslySetInnerHTML={{
                __html: value.replace(/(?:\r\n|\r|\n)/g, '<br />'),
              }}
            />
          </CardBox>
        )}
      </FormControl>
    </React.Fragment>
  );
};

export const TextFieldW = ({
  name,
  value,
  handleChange,
  label,
  isReadOnly,
  fullWidth = true,
  style,
  handleKeyPress,
  errorOn = false,
  maxLength,
}) => {
  return (
    <React.Fragment>
      {!isReadOnly && (
        <TextField
          value={value}
          onChange={handleChange}
          label={label}
          fullWidth={fullWidth}
          name={name}
          disabled={isReadOnly}
          style={style}
          onKeyPress={handleKeyPress}
          error={errorOn && !value}
          inputProps={maxLength}
        />
      )}
      {isReadOnly && <span>{value}</span>}
    </React.Fragment>
  );
};

export const NumberFieldW = ({ value, handleChange, label, isReadOnly, decimalScale, style }) => {
  return (
    <React.Fragment>
      <FormControl>
        <FormLabel className="mb-2">{label}</FormLabel>
        {!isReadOnly && (
          <NumberFormat
            thousandSeparator
            value={value}
            onValueChange={values => {
              handleChange(values.value);
            }}
            className="text-right"
            decimalScale={decimalScale}
            maxLength={19} // 컴마 포함 최대 입력 가능 (소숫점 포함하면 적어짐) : "999,999,999,999,999" (999 조)
            // placeholder={label} //component object 가 아닌 string...
          />
        )}
        {isReadOnly && <NumberFormat value={value} displayType="text" thousandSeparator style={style} />}
      </FormControl>
    </React.Fragment>
  );
};

export const ButtonW = ({
  name,
  nameID,
  handleClick,
  option,
  customBtnStyle,
  children,
  toolTipMsg,
  toolTipMsgPlacement,
  disabled,
}) => {
  let colorOption = 'default';
  let classNameOption = 'jr-btn text-white';
  let sizeOption = 'medium';

  switch (option) {
    case '1':
      customBtnStyle = 'fab';
      classNameOption = 'bg-light-green jr-fab-btn text-white jr-btn-fab-sm';
      break;
    case '2':
      colorOption = 'secondary';
      break;
    case '3':
      classNameOption = 'btn bg-gray';
      sizeOption = 'small';
      break;
    case '4':
      colorOption = 'primary';
      break;
    default:
      customBtnStyle = 'fab';
      classNameOption = 'bg-light-green jr-fab-btn text-white jr-btn-fab-sm';
      break;
  }

  const eng = isEng();
  switch (nameID) {
    case 'TEMP':
      name = mlMessage('pages.common.button.tempSave');
      children = <i className="zmdi zmdi-plus zmdi-hc-lg" />;
      break;
    case 'SAVE':
      name = mlMessage('pages.common.button.save');
      children = <i className="zmdi zmdi-floppy zmdi-hc-lg" />;
      break;
    case 'BACK':
      name = mlMessage('pages.common.button.back');
      children = <i className="zmdi zmdi-long-arrow-return" />;
      break;
    case 'MOD':
      name = mlMessage('pages.common.button.mod');
      children = <i className="zmdi zmdi-edit zmdi-hc-lg" />;
      break;
    case 'FINISH':
      name = mlMessage('pages.common.button.finish');
      children = <i className="zmdi zmdi-floppy zmdi-hc-lg" />;
      break;
    case 'SKIP':
      name = mlMessage('pages.common.button.skip');
      break;
    case 'TRANSFER':
      name = mlMessage('pages.common.button.transfer');
      break;
    case 'CANCEL':
      name = mlMessage('pages.common.button.cancel');
      children = <i className="zmdi zmdi-floppy zmdi-hc-lg" />;
      break;
    case 'RESTART':
      name = mlMessage('pages.common.button.restart');
      children = <i className="zmdi zmdi-replay zmdi-hc-lg" />;
      break;
    case 'COMPLATE':
      name = mlMessage('pages.common.button.complate');
      children = <i className="zmdi zmdi-floppy zmdi-hc-lg" />;
      break;
    case 'DEL':
      name = mlMessage('pages.common.button.del');
      children = <i className="zmdi zmdi-delete zmdi-hc-lg" />;
      break;
    case 'REJECT':
      name = mlMessage('pages.common.button.reject');
      break;
    case 'REVISE':
      name = mlMessage('pages.common.button.revise');
      children = <i className="zmdi zmdi-edit zmdi-hc-lg" />;
      break;
    default:
      break;
  }

  const buttonComponent = (
    <Button
      variant={customBtnStyle || 'contained'} // 'text', 'flat', 'outlined', 'contained', 'fab', 'extendedFab'
      color={colorOption}
      className={classNameOption}
      size={sizeOption}
      onClick={handleClick}
      disabled={disabled}
    >
      {children && (
        <React.Fragment>
          {children}
          {name && <BlankSpan num={1} />}
        </React.Fragment>
      )}
      {name}
    </Button>
  );

  return (
    <React.Fragment>
      {!toolTipMsg && buttonComponent}
      {toolTipMsg && (
        <Tooltip title={<span style={{ fontSize: 15 }}>{toolTipMsg}</span>} placement={toolTipMsgPlacement || 'right'}>
          {buttonComponent}
        </Tooltip>
      )}
    </React.Fragment>
  );
};

export const RadioGroupW = ({ value, handleChange, items, option, name, isReadOnly, isUseAll, colorList = {} }) => {
  let style;
  if (!option || option === '1') {
    style = {};
  }

  if (option === '2') {
    style = {
      color: 'white',
      paddingRight: '10px',
      marginLeft: '0px',
      marginTop: '5px',
      borderRadius: '5px',
    };
  }

  let valueText = '';
  if (isReadOnly) {
    try {
      valueText = R.filter(a => a.value === value, items)[0].name;
    } catch (e) {
      // no work
    }
  }

  return (
    <React.Fragment>
      {!isReadOnly && (
        <FormControl component="fieldset">
          {name && <FormLabel>{name}</FormLabel>}
          <RadioGroup value={value} onChange={handleChange} row name={name} style={{ display: 'inline-block' }}>
            {isUseAll && (
              <FormControlLabel
                value=""
                control={
                  <Radio
                    color={option === '2' ? 'primary' : 'secondary'}
                    style={option === '2' ? { width: '35px', height: '35px' } : {}}
                    disabled={isReadOnly}
                  />
                }
                label="All"
                key=""
                style={style}
              />
            )}
            {items &&
              items.map(i => {
                const newStyle = { ...style };
                if (colorList && colorList[i.value]) {
                  newStyle.backgroundColor = colorList[i.value];
                }

                return (
                  <FormControlLabel
                    value={i.value}
                    control={
                      <Radio
                        color={option === '2' ? 'primary' : 'secondary'}
                        style={option === '2' ? { width: '35px', height: '35px' } : {}}
                        disabled={isReadOnly}
                      />
                    }
                    label={i.name}
                    key={i.value}
                    style={newStyle}
                  />
                );
              })}
          </RadioGroup>
        </FormControl>
      )}
      {isReadOnly && <span>{valueText}</span>}
    </React.Fragment>
  );
};

export const RadioYesNo = ({ value, handleChange, isReadOnly, valueTF }) => {
  const valueNum = value ? '1' : '0';

  return (
    <RadioGroup value={valueTF ? valueNum : value} onChange={handleChange} row style={{ display: 'inline-block' }}>
      <FormControlLabel control={<Radio color="secondary" />} disabled={isReadOnly} label="예" value="1" />
      <FormControlLabel control={<Radio color="secondary" />} disabled={isReadOnly} label="아니오" value="0" />
    </RadioGroup>
  );
};

export const StateLine = ({ items, value, isContract, isSignedContract, isLaw }) => {
  // CST SCST LST PST LIST

  // 체결계약일 경우,
  // 0: {value: "SCST_0010", name: "계약서 이관 중", code: "0010"}
  // 1: {value: "SCST_0020", name: "계약 취소", code: "0020"}
  // 2: {value: "SCST_0030", name: "완료", code: "0030"}
  // 0,1,2 단계중 0단계일때, 취소 감춤
  // 0,1,2 단계중 1단계일때, 완료 감춤
  // 0,1,2 단계중 2단계일때, 취소 감춤 & 번호는 1번으로 고정

  // 법률자문일 경우,
  // 0: {value: "LST_0010", name: "임시 저장", code: "0010"}
  // 1: {value: "LST_0020", name: "자문 요청 중", code: "0020"}
  // 2: {value: "LST_0030", name: "종결", code: "0030"}
  // 3: {value: "LST_0990", name: "취소", code: "0990"}
  // 0,1,2,3 단계중 0단계일때, 취소 감춤
  // 0,1,2,3 단계중 1단계일때, 취소 감춤
  // 0,1,2,3 단계중 2단계일때, 취소 감춤
  // 0,1,2,3 단계중 3단계일때, 완료 감춤 & 번호는 2번으로 고정

  if (items) {
    const filteredItems = R.filter(
      a =>
        (a.value !== 'CST_0080' ||
          value === 0 ||
          value === 1 ||
          value === 2 ||
          value === 3 ||
          value === 4 ||
          value === 5 ||
          value === 6 ||
          value === 7) &&
        (a.value !== 'CST_0990' || value === 8) &&
        (a.value !== 'SCST_0020' || value === 1) &&
        (a.value !== 'SCST_0030' || value === 2 || value === 0) &&
        (a.value !== 'LST_0030' || value === 0 || value === 1 || value === 2) &&
        (a.value !== 'LST_0990' || value === 3),
      items,
    );
    const nameList = R.pluck('name', filteredItems);
    let newValue = value;
    if (isSignedContract && value === 2) newValue = 1;
    if (isLaw && value === 3) newValue = 2;
    if (isContract && value === 8) newValue = 7;

    return (
      <Stepper
        activeStep={newValue || 0}
        className="horizontal-stepper-linear"
        style={{ backgroundColor: 'transparent' }}
      >
        {nameList &&
          nameList.map((i, index) => {
            return (
              <Step className="horizontal-stepper" key={index}>
                <StepLabel className="stepperlabel">
                  {newValue === index && <div style={{ color: 'red', fontWeight: 'bold' }}>{i}</div>}
                  {newValue !== index && <div>{i}</div>}
                </StepLabel>
              </Step>
            );
          })}
      </Stepper>
    );
  }
  return <div />;
};

export const CountPlusMinus = ({ value, handleMinus, handlePlus, isReadOnly }) => {
  return (
    <React.Fragment>
      {!isReadOnly && (
        <Button variant="outlined" color="secondary" size="small" onClick={handleMinus}>
          <i className="zmdi zmdi-minus zmdi-hc-lg" />
        </Button>
      )}
      <Button variant="contained" size="small" disabled>
        {value}
      </Button>
      {!isReadOnly && (
        <Button variant="outlined" color="primary" size="small" onClick={handlePlus} disabled={isReadOnly}>
          <i className="zmdi zmdi-plus zmdi-hc-lg" />
        </Button>
      )}
    </React.Fragment>
  );
};

class EditorW_inner extends Component {
  render() {
    const { value, handleChange, isReadOnly, current_CCID } = this.props;
    return (
      <React.Fragment>
        <div style={{ display: isReadOnly ? 'none' : '' }}>
          <CKEditor
            data={value}
            onChange={evt => {
              const editorData = evt.editor.getData();
              handleChange(editorData);
            }}
            // 이미지 Paste 기능 (public 권한으로 동작 중, 참고)
            // https://ckeditor.com/docs/ckeditor4/latest/guide/dev_file_upload.html
            config={{
              extraPlugins: 'uploadimage',
              uploadUrl: `${urlMaster}/ext/imagefileupload`,
            }}
            onFileUploadRequest={async evt => {
              evt.stop();

              const { file } = evt.data.fileLoader;

              const data = new FormData();
              data.append('token', localStorage.getItem('token'));
              data.append('ACL', 'public-read');
              data.append('file', file);
              data.append('CCID', current_CCID);

              // 파일 관련된 사항은 axios 라이브러리를 직접 이용.
              const result = await axios.post(`${urlMaster}/ext/imagefileupload`, data);
              const { url } = result.data;
              const urlStr = `<img alt="" src="${url}" />`;

              const fragment = evt.editor
                .getSelection()
                .getRanges()[0]
                .extractContents();
              const container = CKEDITOR.dom.element.createFromHtml(urlStr, evt.editor.document);
              fragment.appendTo(container);
              evt.editor.insertElement(container);
            }}
          />
        </div>
        <div style={{ display: isReadOnly ? '' : 'none' }}>
          <CardBox styleName="col-12">
            <div className="row">
              <div dangerouslySetInnerHTML={{ __html: convertEditorText(value) }} />
            </div>
          </CardBox>
        </div>
      </React.Fragment>
    );
  }
}

export const EditorW = connect(
  ({ common }) => {
    const { current_CCID } = common;
    return {
      current_CCID,
    };
  },
  {},
)(EditorW_inner);

export const SliderW = ({ value, min, max, step, handleChange, isReadOnly, unitLabel, label }) => {
  return (
    <FormControl className="d-flex">
      {label && <FormLabel id="label">{label}</FormLabel>}
      <Slider
        value={value}
        aria-labelledby="label"
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        disabled={isReadOnly}
        className="mt-2"
      />
      <BlankSpan num={2} />
      {!unitLabel && <div className="mt-1">{value}</div>}
      {unitLabel && <div className="mt-1">{value + unitLabel}</div>}
    </FormControl>
  );
};

export const SearchTextFieldW = ({ handleChange, handleKeyPress, value, placeholderText, children, width }) => {
  if (!width) {
    width = '100';
  }

  return (
    <div className="module-box-header">
      <div className="module-box-header-inner">
        <div className={`search-bar right-side-icon bg-transparent d-none d-sm-block w-${width}`}>
          <div className="form-group">
            <input
              className={`form-control border-1 w-${width}`}
              type="search"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={value}
              style={{ borderRadius: '0.25rem' }}
              placeholder={placeholderText}
            />
            <button className="search-icon" type="submit">
              <i className="zmdi zmdi-search zmdi-hc-lg" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export const ErrorMsg = ({ title, message }) => {
  return (
    <div className="app-wrapper page-error-container animated slideInUpTiny animation-duration-3">
      <div className="page-error-content">
        <div className="error-code mb-4 animated zoomInDown">{title}</div>
        <h2 className="text-center fw-regular title bounceIn animation-delay-10 animated">{message}</h2>
      </div>
    </div>
  );
};

export const ChartCard = ({ prize, title, children, styleName, desc, icon }) => {
  return (
    <Widget styleName="jr-card-full">
      <div className="jr-actchart px-3 pt-3">
        <div className="d-flex">
          <h2 className="mr-2 mb-0 jr-fs-xxl jr-font-weight-medium">{prize}</h2>
          <h5 className={`mb-0 pt-2 jr-chart-${styleName}`}>
            {title}% <i className="zmdi zmdi-caret-up" />
          </h5>
          <i className={`zmdi zmdi-${icon} zmdi-hc-fw zmdi-hc-2x`} />
        </div>
        <p className="mb-0 jr-fs-11 text-grey">{desc}</p>
      </div>
      {children}
    </Widget>
  );
};

export const IconWithTextCard = ({ data }) => {
  const { cardColor, imageIcon, title, subTitle, value } = data;
  return (
    <Widget styleName={`p-2 bg-${cardColor} text-white`}>
      <div className="media align-items-center flex-nowrap py-lg-2">
        <div className="mr-4 pl-3" style={{ fontSize: '22px', fontWeight: 'bold' }}>
          {/* <img src={imageIcon} alt={imageIcon}/> */}
          {/* <i className={`zmdi zmdi-folder zmdi-hc-3x`} /> */}
          {value}
        </div>
        <div className="media-body">
          <h3 className="jr-fs-xxl jr-font-weight-black mb-1 text-white">{title}</h3>
          {/* <p className="mb-0 jr-fs-cp">{subTitle}</p> */}
        </div>
      </div>
    </Widget>
  );
};

export const DatePickerRW = ({ value, onChange, zIndex }) => {
  return (
    <div style={{ zIndex: zIndex || 1 }}>
      <DateTimePicker value={value} onChange={onChange} time={false} style={{ width: '120px' }} format="YYYY-MM-DD" />
    </div>
  );
};

export const MultiSelect = styled(Picky)`
  width: 200px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  background-color: #fff;
  border: #ccc 1px solid;
  border-radius: 4px;
  top: -6px;
`;
