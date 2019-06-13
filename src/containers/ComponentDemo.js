import React from 'react';
import ContentCard from '../components/ContentCard';

class ComponentDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
        <div>
            <ContentCard
                title="Case"

            />
            
        </div>
        )
    }
}

export default ComponentDemo;
