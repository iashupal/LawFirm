import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import ContentCard from '../components/ContentCard';
import Accordian from '../components/Accordian';
import Tab from '../components/Tab';
import EnhancedTable from '../components/Table/EnhancedTable';
import Select from '../components/Select';
import Avatar from '../components/Avatar';
// import TaskForm from '../components/screen/TaskForm';
import Grid from '../components/Grid';
import Splitter from '../components/Splitter';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlignedFonts from '../components/AlignedFonts';
// import SimpleCheckbox from '../components/checkbox/SimpleCheckbox';
// import CrossCheckbox from '../components/checkbox/CrossCheckbox';
import '../styles/ui/_datepicker.scss';
const options = [
    { key: 'fruitsHeader', text: 'Fruits' },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', },
    { key: 'vegetablesHeader', text: 'Vegetables'},
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' }
  ];
  
class ComponentDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: false,
            tab: 0,
            selectedKey: 'all',
            startDate: new Date()

        };
        this.toggleInitial = this.toggleInitial.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleInitial() {
        this.setState({ initial: !this.state.initial });
    }
    onChange(e){
        this.setState({
            selectedKey : e.target.value
        });
    }
    changeTab(tab) {
        this.setState({ tab: tab });
    }
      handleChange(date){
        this.setState({
            startDate: date
        });
    }
    render() {
        const { classes } = this.props;
        const { initial, tab, selectedKey } = this.state;
        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <div>
                        <PageTitle icon="class">Component Demo</PageTitle>
                    </div>
                    <div>
                        <Button
                            icon="add_to_queue"
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
                                contents={[
                                     <div className={classes.caseSectionWrapper}>
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            <div>
                                            <AlignedFonts/>
                                            </div>
                                        </div>,
                                        <div className={classes.caseSectionWrapper}>
                                            <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className={classes.dropdownElt}>
                                                    <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                            </div>
                                            <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className={classes.dropdownElt}>
                                                  <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                            </div>
                                             <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className={classes.dropdownElt}>
                                                  <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                            </div>
                                            
                                             <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className="form-cal-btn">
                                                        <DatePicker
                                                            selected={this.state.startDate}
                                                            onChange={this.handleChange}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            />
                                                            <i className="material-icons">date_range</i>
                                                    </div>
                                            </div>
                                            <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className="form-cal-btn form-without-border">
                                                        <DatePicker
                                                            selected={this.state.startDate}
                                                            onChange={this.handleChange}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            />
                                                           
                                                    </div>
                                            </div>
                                             <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                   <p className={classes.para}> 001</p>
                                            </div>
                                            <div className="form">
                                                <p>Number</p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span className="semi-coln">:</span>
                                                <div className="wrapper-checkbox">
                                                    <div className="inr-wrap-chkbox">
                                                    <div className="cross-checkbox">
                                                        {/* <CrossCheckbox crossid={"id2"} /> */}
                                                    </div>
                                                    <div className="custom-checkbox">
                                                        {/* <SimpleCheckbox>Checkbox</SimpleCheckbox> */}
                                                    </div>
                                                    </div>
                                                    <div className="contain-cal-btn">
                                                   
                                                    <Button size="snmall" color="inverted" mode="regular">CalBtn</Button>
                                                    <div className="form-cal-btn">
                                                        <DatePicker
                                                        selected={this.state.startDate}
                                                        onChange={this.handleChange}
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        />
                                                        <i className="material-icons">date_range</i>
                                                    </div>
                                                    
                                                    <Button size="small" color="inverted" mode="regular">CalBtn</Button>
                                                    <div className="form-cal-btn">
                                                        <DatePicker
                                                        selected={this.state.startDate}
                                                        onChange={this.handleChange}
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        />
                                                        <i className="material-icons">date_range</i>
                                                    </div>
                                                    <div className="custom-control custom-checkbox checkbox2">
                                                        {/* <SimpleCheckbox id={"checkbox4"} /> */}
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>


                                        </div>

                                ]}
                            />
                            <Accordian title="Supreme" />
                            <Accordian title="Client" />
                            <Accordian title="Executive" />
                        </div>
                    ) : (
                        <div className={classes.second}>
                            <div className={classes.tabs}>
                                
                                <Tab 
                                    selected = {tab === 0}
                                    text="Tab1" 
                                    onClick={()=>this.changeTab(0)}
                                    
                                />
                                <Tab 
                                    selected = {tab === 1}
                                    text="Task" 
                                    onClick={()=>this.changeTab(1)}
                                    
                                />
                                <Tab 
                                    selected = {tab === 2}
                                    text="Tab3" 
                                    onClick={()=>this.changeTab(2)}
                                    
                                />
                                
                            </div>
                            <div>
                                {tab === 0 &&
                                <div className={classes.tab1}>
                                    <ContentCard title="Case1"
                                        contents={[
                                            <div className={classes.caseSectionWrapper}>
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            <div>
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            
                                            </div>,
                                              <div className={classes.caseSectionWrapper}>
                                              <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  {/* <p className={classes.para}>001</p> */}
                                                  <div className={classes.dropdownElt}>
                                                  <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                              </div>
                                              <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className={classes.dropdownElt}>
                                                  <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                              </div>
                                              <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className={classes.dropdownElt}>
                                                  <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                              </div>
                                              <div>
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <p className={classes.para}>001</p>
                                              </div>
  
                                              </div>
                                        ]}/>
                                    <div>
                                        <ContentCard title="Case2" actionButton={<Button size="medium" color="inverted">Button</Button>} contents={[
                                            <div className={classes.caseSectionWrapper}>
                                            <div className={classes.caseSectnImage}>
                                            
                                                <i className="material-icons icon-color">
                                                    account_circle
                                                </i>
                                                <span className={classes.sectn2Span}>dfghjk</span>
                                            
                                                
                                            </div>
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            <div>
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            
                                            </div>,
                                               <div className="classes.caseSectionWrapper">
                                                <div className={classes.sectn2Rght}>
                                                    <div >
                                                        <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                        <p className={classes.para}> 001</p>
                                                    </div>
                                                    <div>
                                                        <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                        <p className={classes.para}> 001</p>
                                                    </div>
                                               </div>
                                               </div>,
                                        ]}/>
                                    </div>
                                    <div>
                                        <ContentCard title="Case3" actionButton={<Button size="large" color="primary">Button</Button>} 
                                        contents={[
                                            <div className={classes.caseSectionWrapper}>
                                            
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            <div >
                                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <p className={classes.para}> 001</p>
                                            </div>
                                            </div>,
                                            <Grid contents={[
                                                {
                                                    title: "fvf",
                                                    child: "efvfd"
                                                },
                                                {
                                                    title: "fvf",
                                                    child: "efvfd"
                                                },
                                                {
                                                    title: "fvf",
                                                    child: "efvfd"
                                                },
                                                {
                                                    title: "fvf",
                                                    child: "efvfd"
                                                }
                                            ]}/>
                                    
                                        ]}
                                        />
                                   
                                    </div>
                                    <div>
                                        <ContentCard title="Case4" 
                                            actionButton={ 
                                            // <div className={classes.dropdownRght}>
                                                <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                            //  </div>
                                            }
                                            contents={[
                                                <div className="case-4-content">
                                        <div className="case-4-inr-content">
                                            <div className="case-4-inr-para">
                                                <p>2018-03-30()</p>
                                            </div>
                                            <div style={{borderBottom: '1px solid lightgray'}}>
                                                <div className="case-4-inr-div">
                                                    <i className="material-icons icon-color">
                                                        account_circle
                                                    </i>
                                                    <p>Ashu's <b>law</b> case <b> open</b> </p>
                                                </div>
                                                
                                                <div className="case-4-inr-div">
                                                    <i className="material-icons icon-color">
                                                        chat_bubble_outline
                                                    </i>
                                                    <p>Ashu's <b>law</b> case <b> open</b> </p>
                                                </div>
                                            </div>
                                            <div className="case-4-inr-para">
                                                <p>2018-03-30()</p>
                                            </div>
                                            <div className="case-4-inr-div">
                                                <i className="material-icons icon-color">
                                                    delete
                                                </i>
                                                <p>Ashu's <b>law</b> case <b> open</b> </p>
                                            </div>
                                            <div className="case-4-inr-div">
                                                <i className="material-icons icon-color">
                                                    account_circle
                                                </i>
                                                <p>Ashu's <b>law</b> case <b> open</b> </p>
                                            </div>
                                            <div className="case-4-inr-div">
                                                <i className="material-icons icon-color">
                                                    account_circle
                                                </i>
                                                <p>Ashu's <b>law</b> case <b> open</b> </p>
                                            </div>
                                        </div>
                                    </div>
                                            ]}
                                            >
                                        
                                        </ContentCard>
                                    </div>
                                    <div className={classes.sectn5Margin}>
                                        <ContentCard contents={[
                                            <p className={classes.sectn5Para}>Case Details</p>
                                        ]}>
                                        
                                        </ContentCard>
                                    </div>
                                </div>
                                }
                                {tab === 1 && 
                                <div className={classes.tab2}>
                                {/* <Splitter> */}
                                    <ContentCard title="Case1" actionButton={<Button size="medium" color="inverted">Button</Button>}
                                        contents={[
                                            
                                            <EnhancedTable/>
                                           
                                        ]}
                                    />
                                    
                                    
                                    <ContentCard title="Case2" 
                                    actionButton={
                                    <Button 
                                        size="large"  
                                        icon="queue"
                                        color="primary"
                                        mode="rightIcon">Task</Button>}
                                    
                                    contents={[
                                        <div>
                                        <Grid contents={[
                                                {
                                                    title: "fvf",
                                                    child: ( <input
                                                        type="text"
                                                        className="form-control inputtype"
                                                        placeholder="Default form control"
                                                        name="text2"
                                                    />)
                                                },
                                                {
                                                    title: "fvf",
                                                    child: (
                                                        <div className="font-textarea">
                                                            <textarea className="form-control z-depth-1" rows="4" placeholder="Write something here..."></textarea>
                                                        </div> 
                                                    )
                                                },
                                                {
                                                    title: "fvf",
                                                    child: (
                                                        <Button size="small"  
                                                        color="inverted"
                                                        mode="regular">Button</Button>
                                                    )
                                                },
                                                {
                                                    title: "fvf",
                                                    child: (
                                                        <div className="task-forminput-width">
                                                            <div className="form-group left">
                                                                <input type="text" className="form-control inputtype" placeholder="Default form control" name="text2" />
                                                            </div> 
                                                            <i className="material-icons icon-left-menu-color left">
                                                                supervisor_account
                                                            </i>  
                                                        </div> 
                                                    )
                                                },
                                                {
                                                    title: "fvf",
                                                    child: (
                                                        <div className="form-cal-btn">
                                                            <DatePicker 
                                                             selected={this.state.startDate}
                                                                onChange={this.handleChange}
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select" 
                                                            />
                                                            <i className="material-icons">
                                                                date_range
                                                            </i>
                                                        </div>
                                                    )
                                                },
                                                {
                                                    title: "fvf",
                                                    child: (
                                                        <div>
                                                            <Button 
                                                            size="small"  
                                                            color="inverted"
                                                            mode="regular">Button</Button>
                                                            <p className="left"><span>Task1.pdf</span>  | <span>Task2.pdf</span></p>
                                                        </div>
                                                    )
                                                },

                                            ]}/>
                                            <div className="task-form-para-btn">
                                                <p><span className="para-clr">Task</span>  | <span>2010-03-02 23:00</span></p>
                                                <p><span className="para-clr">Task</span>  | <span>2010-03-02 23:00</span></p>
                                                <div className={classes.formRghtBtnWrapr}>
                                                    <Button size="large"  
                                                    mode="regular"
                                                    color="primary">Button2</Button>
                                                </div>
                                            </div>
                                            </div>
                                    
                                    
                                    
                                    ]}
                                   
                                    />
                                    
                                     {/* </Splitter> */}
                                </div>
                            }
                                {tab === 2 && <p>2</p>}
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
        height: '90%',
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
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
    },
    tab1:{
        display: "grid",
        gridTemplateColumns: "8fr 4fr",
        gridTemplateRows:"1fr",
        gridGap:"10px",
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    tab2: {
        display: "grid",
        gridTemplateColumns: "8fr 4fr",
        gridTemplateRows:"1fr",
        gridGap:"10px",
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    caseSectionWrapper: {
        width:'95%',
        position: 'relative', 
        
    },
    para: {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    spanMargin:{
        paddingLeft: 15,
        paddingRight: 15,
        verticalAlign: 'top',
     },
     dropdownElt: {
        width: '30%',
        display: 'inline-block'
     },
     sectn2Span: {
        verticalAlign: 'text-bottom',
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative',
        top: '-3px',
    },
    caseSectnImage: {
        marginTop: 10,
        marginBottom: 10,
    },
    sectn2Rght: {
        marginTop: 50
    },
    dropdownRght: {
        width:117,
    },
    sectn5Para: {
        textAlign: 'center',
    },
    sectn5Margin: {
        marginTop: '-190px',
    },
    formRghtBtnWrapr: {
        width: '100%',
        textAlign: 'center'
    }
     

});

export default withStyles(styles)(ComponentDemo);
