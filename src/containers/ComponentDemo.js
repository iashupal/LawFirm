import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import ContentCard from '../components/ContentCard';
import Accordian from '../components/Accordian';
import Tab from '../components/Tab';
import EnhancedTable from '../components/Table/EnhancedTable';
import Select from '../components/Select';
import Grid from '../components/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlignedFonts from '../components/AlignedFonts';
import Form from '../components/Form';
import Textbox from '../components/Textbox';
import TextArea from '../components/TextArea';
import RadioButton from '../components/RadioButton';
import SimpleCheckbox from '../components/Checkbox/SimpleCheckbox';
import CrossCheckbox from '../components/Checkbox/CrossCheckbox';

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
            checked: false,
            startDate: new Date()

        };
        this.toggleInitial = this.toggleInitial.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleChecked = this.toggleChecked.bind(this);
    }

    toggleInitial() {
        this.setState({ initial: !this.state.initial });
    }
    onChange(e){
        this.setState({
            selectedKey : e.target.value,

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

    toggleChecked(){
        console.log("helo")
        this.setState({checked:!this.state.checked})
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
                                            <AlignedFonts>
                                                <div className="font-wrapper-container">
                                                    
                                                    <div className="font-drpdwn">
                                                        <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                    </div> 
                                                    <span className="font-mod-span">|</span>
                                                    
                                                        <div className="font-button"> 
                                                            <Button>B</Button>
                                                            <Button><i className="material-icons icon">
                                                                format_italic
                                                                </i>
                                                            </Button>
                                                            <Button>
                                                            <i className="material-icons icon">
                                                                format_underlined
                                                            </i>
                                                            </Button>
                                                            <Button><strike style={{textTransform: 'lowercase', color: 'gray', fontWeight: '500'}}>abc</strike></Button>
                                                        
                                                        </div>
                                                    
                                                    <div className="font-icon">
                                                    <Button>  
                                                        <i className="material-icons">
                                                            format_align_left
                                                        </i>
                                                    </Button>
                                                    <Button>
                                                        <i className="material-icons">
                                                            format_align_center
                                                        </i>
                                                    </Button> 
                                                    <Button>
                                                        <i className="material-icons">
                                                            format_align_right
                                                        </i>
                                                    </Button> 
                                                    <Button>
                                                        <i className="material-icons">
                                                            format_align_justify
                                                        </i>
                                                    </Button>
                                                    </div>
                                                
                                                </div>
                                                <div className="font-textarea">
                                                    <TextArea className="form-control z-depth-1"
                                                        rows="5" placeholder="Write something here..."
                                                        onChange = {this.onChange}
                                                    /> 
                                                </div>
                                            </AlignedFonts>
                                            </div>
                                        </div>,
                                        <div className={classes.caseSectionWrapper}>
                                            <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className={classes.selectFormElt}>
                                                    <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                            </div>
                                            <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className={classes.selectFormElt}>
                                                  <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                            </div>
                                             <div >
                                                  <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                  <div className={classes.selectFormElt}>
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
                                            <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                                <div className="wrapper-checkbox">
                                                    <div className="inr-wrap-chkbox">
                                                    <div className="cross-checkbox">
                                                        <CrossCheckbox checked={this.state.checked} label="Cross" onClick={this.toggleChecked}/>
                                                    </div>
                                                    <div className="custom-checkbox">
                                                        <SimpleCheckbox label="Simple" checked={this.state.checked} onClick={this.toggleChecked} />
                                                    </div>
                                                    </div>
                                                    <div className="contain-cal-btn">
                                                    <div className={classes.btnMargin}>
                                                    <Button size="medium" color="inverted" mode="regular">CalBtn</Button>
                                                    </div>
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
                                                    <div className={classes.btnMargin}>
                                                    <Button size="medium" color="inverted" mode="regular">CalBtn</Button>
                                                    </div>
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
                                                        <SimpleCheckbox label="check" checked={this.state.checked} onClick={this.toggleChecked}/>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>


                                        </div>

                                ]}
                            />
                            <Accordian title="Supreme" className="" contents={[
                                <div className={classes.accord1}>
                                    <div className={classes.accordSupremeBtn}>
                                        <Button size="medium" color="primary" mode="regular" >Supreme Court</Button>
                                    </div>
                                    <div className={classes.gridTable}>
                                    <Grid contents={[
                                            
                                            {
                                                
                                                title: "fvf",
                                                child: "efvfd",
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
                                     <Grid contents={[
                                            
                                            {
                                                
                                                title: "fvf",
                                                child: "efvfd",
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
                                    <Grid contents={[
                                            
                                            {
                                                
                                                title: "fvf",
                                                child: "efvfd",
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
                                    </div>
                                </div>
                            ]}>
                                    
                            </Accordian>
                            <Accordian title="Client" className="" contents={[
                                <div className={classes.accord1}>
                                    <div className={classes.clientWrapBtn}>
                                        
                                        <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                        <div className={classes.accordRight}>
                                            <div className={classes.accordRadiChkbox}>
                                                <RadioButton label="상표" onChange={this.onChange}/>
                                                <div className={classes.select}>
                                                    <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            <div className={classes.accordRadiChkbox}>
                                                <RadioButton label="상표" onChange={this.onChange}/>
                                                <div className={classes.select}>
                                                <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            <div className={classes.accordRadiChkbox}>
                                                <RadioButton label="상표" onChange={this.onChange}/>
                                                <div className={classes.select}>
                                                <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.gridTable}>
                                        <Grid contents={[
                                                
                                                {
                                                    
                                                    title: "fvf",
                                                    child: "efvfd",
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
                                        <Grid contents={[
                                                
                                                {
                                                    
                                                    title: "fvf",
                                                    child: "efvfd",
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
                                        <Form title="FormTab">
                                            <div className="form-group">
                                                <Textbox 
                                                type="text"
                                                 className="form-control inputtype"
                                                  placeholder="Default form control"
                                                    onChange = {this.onChange}    
                                                />
                                            </div>
                                            <span className={classes.formSpanPadding}> and</span>
                                            <div className="form-group">
                                                <Textbox type="text" 
                                                    className="form-control inputtype"
                                                    placeholder="Default form control"
                                                    onChange = {this.onChange}
                                                />
                                            </div>
                                            <div className="accord2-rght">
                                                <h3 className="h2-fontwght">Content</h3>
                                                <div className="table-inr-btns table-rght-btns">
                                                    <div className={classes.btnMargin}>
                                                    <Button 
                                                        size="small"
                                                        color="success" 
                                                        mode="regular"
                                                        
                                                    >
                                                    Button
                                                    </Button>
                                                    </div>
                                                    <Button size="small" color="primary" mode="regular">Button</Button>
                                                            
                                                </div>
                                            </div>
                                            <div className="font-textarea">
                                               
                                                <TextArea className="form-control z-depth-1"
                                                 rows="5" placeholder="Write something here..."
                                                 onChange = {this.onChange}
                                                 />
                                                 
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                
                            ]}>
                                    
                            </Accordian>
                            <Accordian title="Executive" className="" contents={[
                                <div className={classes.accord1}>
                                    
                                    <div className={classes.gridTable}>
                                   
                                        <Form title="FormTab">
                                            
                                            <div className="accord2-rght">
                                                <div className={classes.dropdownElt}>
                                                    <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                                <div className="table-inr-btns table-rght-btns">
                                                    <div className={classes.btnMargin}>
                                                    <Button 
                                                        size="small"
                                                        color="inverted" 
                                                        mode="regular"
                                                        
                                                    >
                                                    Button
                                                    </Button>
                                                    </div>
                                                    <Button size="small" color="primary" mode="regular">Button</Button>
                                                            
                                                </div>
                                            </div>
                                            <div className="font-textarea">
                                               
                                                <TextArea className="form-control z-depth-1"
                                                 rows="5" placeholder="Write something here..."
                                                 onChange = {this.onChange}
                                                 />
                                                 
                                            </div>
                                        </Form>
                                        <Form title="FormTab">
                                          
                                            <div className="accord2-rght">
                                            <div className={classes.dropdownElt}>
                                                    <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                                <div className="table-inr-btns table-rght-btns">
                                                    <div className={classes.btnMargin}>
                                                    <Button 
                                                        size="small"
                                                        color="inverted" 
                                                        mode="regular"
                                                        
                                                    >
                                                    Button
                                                    </Button>
                                                    </div>
                                                    <div className={classes.btnMargin}>
                                                        <Button size="small" color="inverted" mode="regular">Button</Button>
                                                    </div>
                                                    <Button size="small" color="primary" mode="regular">Button</Button>
                                                            
                                                </div>
                                            </div>
                                            <div className="font-textarea">
                                               
                                                <TextArea className="form-control z-depth-1"
                                                 rows="5" placeholder="Write something here..."
                                                 onChange = {this.onChange}
                                                 />
                                                 
                                            </div>
                                        </Form>
                                        <Form title="FormTab">
                                          
                                            <div className="accord2-rght">
                                            <div className={classes.dropdownElt}>
                                                    <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                  </div>
                                                <div className="table-inr-btns table-rght-btns">
                                                    <div className={classes.btnMargin}>
                                                    <Button 
                                                        size="small"
                                                        color="inverted" 
                                                        mode="regular"
                                                        
                                                    >
                                                    Button
                                                    </Button>
                                                    </div>
                                                    <div className={classes.btnMargin}>
                                                        <Button size="small" color="inverted" mode="regular">Button</Button>
                                                    </div>
                                                    <Button size="small" color="primary" mode="regular">Button</Button>
                                                            
                                                </div>
                                            </div>
                                            <div className="font-textarea">
                                               
                                                <TextArea className="form-control z-depth-1"
                                                 rows="5" placeholder="Write something here..."
                                                 onChange = {this.onChange}
                                                 />
                                                 
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                
                            ]}>
                                    
                            </Accordian>
                            <div className="form-submisn-btns">
                                <div className="left">
                                    <Button color="primary" size="large" mode="regular">Button2</Button>
                                </div>
                                <div className={classes.subBtnMargin}>
                                    <Button color="inverted" size="large" mode="regular">Button2</Button>
                                </div>
                                <div className="right">
                                    <Button color="danger" size="large" mode="regular">Button3</Button>
                                </div>
                            </div>
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
                                        <ContentCard title="Case2" actionButton={<div style={{float: 'right'}}><Button size="medium" color="inverted">Button</Button></div>} contents={[
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
                                               </div>
                                        ]}/>
                                    </div>
                                    <div>
                                <ContentCard title="Case3" actionButton={<div style={{float: 'right'}}><Button size="large" color="primary">Button</Button></div>} 
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
                                    <div className={classes.case4Mgn}>
                                        <ContentCard title="Case4" 
                                            actionButton={ 
                                                <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
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
                           
                                    <ContentCard title={
                                        <div className={classes.tab2HeadingWrapper}>
                                            <h2>Case 2</h2>
                                            <div className={classes.tab2Buttons}>
                                            <div className={classes.btnMargin}>
                                            <Button size="small" color="inverted" mode="regular">Button</Button>
                                            </div>
                                            <div className={classes.btnMargin}>
                                            <Button size="small" color="inverted" mode="regular">Button</Button>
                                            </div>
                                            <div className={classes.btnMargin}>
                                            <Button size="small" color="inverted" mode="regular">Button</Button>
                                            </div>
                                            <div className={classes.btnMargin}>
                                            <Button size="small" color="inverted" mode="regular">Button</Button>
                                            </div>
                                            <div className={classes.btnMargin}>
                                            <Button size="small" color="inverted" mode="regular">Button</Button>
                                            </div>
                                            </div>
                                        </div>
                                    } 
                                    actionButton={
                                     
                                        <div className={classes.tab2HeadingRghtWrapper}>
                                           <div className={classes.tab2Checkbox}>
                                                <SimpleCheckbox label="Simple" checked={this.state.checked} onClick={this.toggleChecked} />
                                           </div>
                                            <div className={classes.tab2RghtButtons}>
                                                
                                                <Button size="medium" color="inverted" mode="regular">Button</Button>
                                            </div>
                                        </div>
                                    
                                    }
                                        contents={[
                                            <div >
                                                <div className={classes.taskSearchWrap}>
                                                <div className={classes.taskStart}>
                                                    <div className={classes.taskCheckbox}>
                                                            <SimpleCheckbox label="Simple" checked={this.state.checked} onClick={this.toggleChecked} />
                                                    </div>
                                                    <div className={classes.taskBtn}>
                                                        <div className={classes.btnMargin}>
                                                            <Button size="small" color="inverted" mode="regular">Button</Button>
                                                        </div>
                                                        <div className={classes.btnMargin}>
                                                            <Button size="small" color="inverted" mode="regular">Button</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.taskEnd}>
                                                    <div className={classes.taskTextbox}>
                                                    <Textbox 
                                                        type="text"
                                                        className="form-control inputtype"
                                                        placeholder="Default form control"
                                                        onChange = {this.onChange}    
                                                    />
                                                    </div>
                                                    <div className={classes.taskSelect}>
                                                        <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                    </div>
                                                    <div className={classes.taskSelect}>
                                                        <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                    </div>
                                                    <div className={classes.taskSelect}>
                                                        <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                                                    </div>
                                                    

                                                </div>
                                            </div>
                                           
                                            <div className="paginatn-table left">
                                                <EnhancedTable rows data/>
                                            </div>
                                            </div>
                                           
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
                                                        <div className="left">
                                                            <Button className="left"
                                                                size="medium"  
                                                                color="inverted"
                                                                mode="regular">Button</Button>
                                                            <p className="left"><span>Task1.pdf</span> &nbsp; | &nbsp; <span>Task2.pdf</span></p>
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
        width: '26%',
        display: 'inline-block'
     },
     sectn2Span: {
        verticalAlign: 'top',
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative',
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
    },
    accord1: {
        width: '100%',
        flex: 1,
        
    },
    gridTable: {
        flex: 1,
        flexDirection: 'row',
        display: 'flex'
    },
    accordSupremeBtn: {
        marginBottom: 10,
    },
    btnMargin: {
        marginRight: 8,
        display: 'inline-block',
    },
    formSpanPadding: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,   

    },
    subBtnMargin: {
        float: 'left',
        marginLeft: 10,
    },
    accordRight: {
        width: '94%',
        display: 'inline-block',
    },
    select: {
        width: '50%',
        display: 'inline-block',
    },
    accordRadiChkbox: {
        display: 'inline-block',
    float: 'left',
    width: '20%',
    marginTop: 0,
    marginLeft: 'auto',
    marginBottom: 0,
    marginRight: 'auto',
    },
    selectFormElt: {
        width: '130px',
        display: 'inline-block'
    },
    tab2HeadingWrapper: {
        display: 'grid',
    flexDirection: 'row'
    },
    tab2Buttons: {
        gridColumnEnd: 8,
        gridColumnStart: 2,
        alignSelf: 'center',
        
    },
    tab2RghtButtons: {
        // float: 'right',
        textAlign: 'right',
    },
    tab2HeadingRghtWrapper: {
        display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px'
    },
    tab2Checkbox: {
        // display: 'inline-block',
        textAlign: 'center',

    },
    taskSearchWrap: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        marginBottom: 15,
    },
    taskStart: {
        gridColumnStart: 1,
        gridColumnEnd: 5,
        alignSelf: 'center',
        display: 'flex',
    },
    taskEnd: {
        gridColumnStart: 5,
        gridColumnEnd: 13,
        alignSelf: 'center',
        display: 'flex',
    },
    taskCheckbox: {
        gridColumnStart: 1,
        gridColumnEnd: 3,
        alignSelf: 'center',
        width: '26%',
    },
    taskBtn: {
        gridColumnStart: 3,
        gridColumnEnd: 5,
        alignSelf: 'center',
    },
    taskTextbox: {
        gridColumnStart: 6,
        gridColumnEnd: 9,
        alignSelf: 'center',
        lineHeight: '37px',
    height: '37px',
       
        paddingRight: 10,
    },
    taskSelect: {
        paddingRight: 10,
        width: '23%',
    },
    case4Mgn:{
        marginTop: '-12px',
    }

});

export default withStyles(styles)(ComponentDemo);
