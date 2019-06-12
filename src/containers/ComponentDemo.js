import React from 'react';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';

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
           
        </div>
    );
}

export default ComponentDemo;
