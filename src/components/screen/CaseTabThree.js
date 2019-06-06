import React from 'react';
import '../../styles/pages/_case.scss';
import IntegrationReactSelect from '../AutoComplete/IntegrationReactSelect';
import Spliter from '../Spliter/Spliter';
import SwitchButton from '../SwitchButton/SwitchButton';
import RangeSlider from '../RangeSlider/RangeSlider';
import Dialogbox from '../Dialogbox/Dialogbox';
import Loader from '../Loader/Loader';
import ImageAvatar from '../ImageAvatar/ImageAvatar';
import SimpleMenu from '../Menu/SimpleMenu';
import ReactPagination from '../ReactPagination/ReactPagination';
import TriggerTooltip from '../Tooltip/TriggerTooltip';
import PinnedSubheaderList from '../List/PinnedSubheaderList';
import AlignItemsList from '../List/AlignItemsList';
import Textbox from '../Textbox/Textbox';
import SimpleCheckbox from '../Checkbox/SimpleCheckbox';
// import CrossCheckbox from '../Checkbox/CrossCheckbox';
import TimeButton from '../Timebutton/TimeButton';

export default class CaseTabThree extends React.Component{
    render(){
        return(
            <div className="tab3">
                <IntegrationReactSelect/>
                <Loader/>
                <ImageAvatar/>
                <SimpleMenu/>
                <ReactPagination/>
                <TriggerTooltip/>
                <PinnedSubheaderList/>
                <AlignItemsList/>
                <Textbox/>
                {/* <CrossCheckbox/> */}
                <TimeButton/>
                {/* <SimpleCheckbox/> */}
                {/* <Spliter/> */}
                {/* <SwitchButton/> */}
                {/* <RangeSlider/> */}
                {/* <Dialogbox/> */}
              

                
            </div>
        )
    }
}