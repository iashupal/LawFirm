import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
      
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };

    renderTabContainer = (value) => {
      switch(value){
        case 0:
          return (
            <TabContainer>
                <CaseTabOne/>
            </TabContainer>
          );
    
        case 1:
          return (
            <TabContainer><CaseTabTwo/></TabContainer>
          );
    
        case 2:
          return (
            <TabContainer><CaseTabThree/></TabContainer>
          );
    
        case 3:
          return (
            <TabContainer>Item Four</TabContainer>
          );
    
        case 4:
          return(
            <TabContainer>Item Four</TabContainer>
          );
    
        case 5:
          return(
            <TabContainer>Item Four</TabContainer>
          );
    
        case 6:
          return(
            <TabContainer>Item Four</TabContainer>
          );
    
        case 7:
          return(
            <TabContainer>Item Four</TabContainer>
          );
    
        case 8:
          return(
            <TabContainer>Item Four</TabContainer>
          );
    
        case 9:
          return(
            <TabContainer>Item Four</TabContainer>
          );
    
        default:
          return(
          <TabContainer> <CaseTabOne/></TabContainer>
          );
       
        
      

      }
    }
  
  render(){
    
        const { value} = this.state;
        const {classes} = this.props;
        return(
          <div className={classes.root}>
            <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="wrapper-tab">
                            <div className="tabs">
                                   <Tabs
                                       value={value}
                                       onChange={this.handleChange}
                                       indicatorColor="primary"
                                       textColor="primary"
                                       variant="scrollable"
                                       scrollButtons="auto"
                                       className="custom-tabs"
                                      
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
                                   {this.renderTabContainer(value)}
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
  
