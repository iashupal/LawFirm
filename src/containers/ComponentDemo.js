import React from 'react';
import Dialog from '../components/Dialog';

// theme.palette.primaray.main

function ComponentDemo() {
    return (
        <div>
            <Dialog open title="Hello" actions={<p>Hello</p>}>
                <p>Hello</p>
            </Dialog>
        </div>
    );
}

export default ComponentDemo;
