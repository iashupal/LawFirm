import React from 'react';
import Textbox from '../components/Textbox';

// theme.palette.primaray.main

function ComponentDemo() {
    return (
        <div>
            <Textbox
                placeholder="hello"
                value="hello"
                onChange={e => console.log(e.target.value)}
                multiline
            />
        </div>
    );
}

export default ComponentDemo;
