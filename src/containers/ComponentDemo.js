import React from 'react';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import AutoComplete from '../components/AutoComplete';
import TaskForm from '../components/screen/TaskForm';

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
           <AutoComplete/>
           
           <TaskForm/>

        </div>
    );
}

export default ComponentDemo;
