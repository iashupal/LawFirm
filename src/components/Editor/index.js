import React from 'react';
import CKEditor from 'react-ckeditor-component';

import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class CK extends React.Component {
    state = {
        content: 'CKEditor, 라이센스에 따라 Editor 변경 가능. (ImageUpload는 추후 확인)',
    }

    updateContent = newContent => {
        this.setState({
            content: newContent
        })
    }

    onChange = evt => {
        const newContent = evt.editor.getData();
        this.setState({
            content: newContent
        })
    }

    onBlur = evt => {
        console.log('onBlur event called with event info: ', evt);
    }

    afterPaste = evt => {
        console.log('afterPaste event called with event info: ', evt);
    }

    render() {
        return (
            <CKEditor
                activeClass="p10"
                content={this.state.content}
                events={{
                    'blur': this.onBlur,
                    'afterPaste': this.afterPaste,
                    'change': this.onChange
                }}
            />
        )
    }
}

export default CK;
