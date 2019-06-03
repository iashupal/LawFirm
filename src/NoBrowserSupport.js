import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonW, DialogBtnBox, CheckboxW, BlankSpan } from 'helpers/ui';
import { withTheme } from '@material-ui/core/styles';


class NoBrowserSupport extends Component {
  render() {
    const { theme } = this.props;
    const { dark, main, light, contrastText } = theme.palette.primary;

    return (
      <Dialog open fullWidth>
        <DialogTitle style={{ backgroundColor: dark }}>
          <span style={{ color: contrastText }}>브라우저 안내</span>
        </DialogTitle>
        <DialogContent>
          <br />* Safari 및 Chrome 브라우저를 이용해 주시기 바랍니다.
          <br />* 'Chrome 다운로드' 버튼은 Chrome이 설치되어 있지 않은 경우만 클릭해 주시기 바랍니다.
        </DialogContent>
        <DialogBtnBox>
          {/* {isIE && 
                <ButtonW name="Chrome 열기" handleClick={e => {
                    try{
                        var shell = new ActiveXObject("WScript.Shell");
                        shell.run("Chrome " + window.location.href);
                    }catch(e){
                        alert('ActiveX가 실행 불가 하거나, Chrome 이 설치되어 있지 않습니다.');
                    }
                }} option="2" />
            } */}
          <ButtonW
            name="Chrome 다운로드"
            handleClick={e => {
              window.open('https://www.google.com/chrome/browser/desktop/');
            }}
            option="4"
          />
        </DialogBtnBox>
      </Dialog>
    );
  }
}

export default withTheme()(NoBrowserSupport);
