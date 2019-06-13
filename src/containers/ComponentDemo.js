import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import ContentCard from '../components/ContentCard';
import Accordian from '../components/Accordian';
import Tab from '../components/Tab';

class ComponentDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: false,
            tab: 0
        };
        this.toggleInitial = this.toggleInitial.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    toggleInitial() {
        this.setState({ initial: !this.state.initial });
    }

    changeTab(tab) {
        this.setState({ tab: tab });
    }
    render() {
        const { classes } = this.props;
        const { initial } = this.state;
        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <div>
                        <PageTitle icon="home">Component Demo</PageTitle>
                    </div>
                    <div>
                        <Button
                            icon="add-screen"
                            mode="rightIcon"
                            color="primary"
                            onClick={this.toggleInitial}
                        >
                            Change Page
                        </Button>
                    </div>
                </div>
                <div className={classes.content}>
                    {initial ? (
                        <div className={classes.initial}>
                            <ContentCard
                                title="Hello"
                                contents={[<p>Hello</p>, <p>Hello</p>]}
                            />
                            <Accordian title="Hello" />
                            <Accordian title="Hello" />
                            <Accordian title="Hello" />
                        </div>
                    ) : (
                        <div className={classes.second}>
                            <div className={classes.tabs}>
                                <Tab selected text="Hello" />
                                <Tab text="Hello" />
                                <Tab text="Hello" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateRows: '7% 93%',
        gridTemplateColumns: '1fr',
        margin: '30px',
        height: '90%'
    },
    header: {
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '85% 15%'
    },
    initial: {
        display: 'grid'
    },
    second: {
        display: 'grid'
    },
    tabs: {
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: 'repeat(6,1fr)',
        width: '60%',
        gridGap: '10px'
    }
});

export default withStyles(styles)(ComponentDemo);
