import React from 'react';
import Splitter from '../components/Splitter';
import ContentCard from '../components/ContentCard';

// theme.palette.primaray.main

function ComponentDemo() {
    return <ContentCard title="Hello" contents={[<Splitter />]} />;
}

export default ComponentDemo;
