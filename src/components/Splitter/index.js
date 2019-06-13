import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import EnhancedTable from '../Table/EnhancedTable';
import 'react-splitter-layout/lib/index.css';
export default function Splitter() {
    return (
        <SplitterLayout className={classes.spliter}>
            <div>
                <EnhancedTable />
            </div>
            <div>Pane 2</div>
        </SplitterLayout>
    );
}
