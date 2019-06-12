import React from 'react';
import Splitter from 'm-react-splitters';
import 'm-react-splitters/lib/splitters.css';

export default function Splitter({ children }) {
    return (
        <Splitter
            position="horizontal"
            primaryPaneMaxHeight="80%"
            primaryPaneMinHeight={0}
            primaryPaneHeight="400px"
            dispatchResize={true}
            postPoned={true}
        >
            <Splitter
                position="vertical"
                primaryPaneMaxWidth="80%"
                primaryPaneMinWidth={0}
                primaryPaneWidth="400px"
                postPoned={false}
            >
                {children}
            </Splitter>
        </Splitter>
    );
}
