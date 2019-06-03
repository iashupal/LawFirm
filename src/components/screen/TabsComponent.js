import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import '../../styles/pages/_case.scss';
import CaseTabThree from './CaseTabThree';
import CaseTabOne from './CaseTabOne';
import CaseTabTwo from './CaseTabTwo';
function TabContainer(props) {
    return (
      <Typography component="div">
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      // backgroundColor: theme.palette.background.paper,
    },
  });
  
  
   class TabsComponent extends React.Component{
    state = {
      value: 0,
      // appBarWidth: 1179,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
  render(){
    
        const { value, appBarWidth } = this.state;
        const {classes} = this.props;
        return(
          <div className={classes.root}>
            <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="wrapper-tab">
                            <div className="tabs">
                                {/* <AppBar position="static" color="default"> */}
                                   <Tabs
                                       value={value}
                                       onChange={this.handleChange}
                                       indicatorColor="primary"
                                       textColor="primary"
                                       variant="scrollable"
                                       scrollButtons="auto"
                                       className="custom-tabs"
                                      //  scrollable={appBarWidth < 1179}
                                   >
                                       <Tab label="Item One" className="custom-tab-inr"/>
                                       <Tab label="Task" className="custom-tab-inr"/>
                                       <Tab label="Item Three" className="custom-tab-inr"/>
                                       <Tab label="Item Four" className="custom-tab-inr"/>
                                       <Tab label="Item Five" className="custom-tab-inr"/>
                                       <Tab label="Item Six" className="custom-tab-inr"/>
                                       <Tab label="SMS" className="custom-tab-inr"/>
                                       <Tab label="Item Eight" className="custom-tab-inr"/>
                                       <Tab label="TC" className="custom-tab-inr" />
                                       <Tab label="Item Ten" className="custom-tab-inr"/>
                                     
                                   </Tabs>
                                   {/* </AppBar> */}
                                   {value === 0 && <TabContainer>
                                        <CaseTabOne/>
                                   </TabContainer>}
                                   {value === 1 && <TabContainer><CaseTabTwo/></TabContainer>}
                                   {value === 2 && <TabContainer><CaseTabThree/></TabContainer>}
                                   {value === 3 && <TabContainer>Item Four</TabContainer>}
                                   {value === 4 && <TabContainer>Item Five</TabContainer>}
                                   {value === 5 && <TabContainer>Item Six</TabContainer>}
                                   {value === 6 && <TabContainer>Item Seven</TabContainer>}
                                   {value === 7 && <TabContainer>Item Eight</TabContainer>}
                                   {value === 8 && <TabContainer>Item Nine</TabContainer>}
                                   {value === 9 && <TabContainer>Item Ten</TabContainer>}
                               </div>
                            </div>
                        </div>
            </div>
          </div>  
        )
    }

  }

  TabsComponent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TabsComponent);
  
