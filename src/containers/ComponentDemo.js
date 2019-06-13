import React from 'react';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import EnhancedTable from '../components/Table/EnhancedTable';
import Splitter from '../components/Splitter';
import CustomAvatar from '../components/CustomAvatar';
function ComponentDemo() {
    return (
        <div>
            <Button 
                mode="rightIcon" 
                size="medium" 
                color="primary"
                icon="add_to_queue"
            >
                Hello
            </Button>
            <PageTitle icon="class" text="Case" iconVisible/>
          
           <EnhancedTable/>
           <Splitter/>
            <CustomAvatar color="blue">
                <i className="material-icons" style={{fontSize: '20px'}}>add_to_queue</i>
            </CustomAvatar>
            <CustomAvatar color="pink">
                H
            </CustomAvatar>
          
          
        </div>
    );
}

export default ComponentDemo;
