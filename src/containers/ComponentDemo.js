import React from 'react';
import ContentCard from '../components/ContentCard';
import Button from '../components/Button';

// theme.palette.primaray.main

function ComponentDemo() {
    return (
        <div>
            <ContentCard
                title="Hello"
                actionButton={
                    <Button mode="rightIcon" color="primary">
                        Hello
                    </Button>
                }
            />
        </div>
    );
}

export default ComponentDemo;
