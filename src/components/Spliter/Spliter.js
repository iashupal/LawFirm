import React from 'react';
import Splitter from 'm-react-splitters';
import 'm-react-splitters/lib/splitters.css';
class Spliter extends React.Component {

  render() {
    return (
    <Splitter
        position="horizontal"
        primaryPaneMaxHeight="80%"
        primaryPaneMinHeight={0}
        primaryPaneHeight="400px"
        dispatchResize={true}
        postPoned={true}
    >    
        <Splitter
            position="vertical"
            primaryPaneMaxWidth="80%"
            primaryPaneMinWidth={0}
            primaryPaneWidth="400px"
            postPoned={false}
        >    
            <div>1</div>
            <div>2</div>
            

        </Splitter> 
        <div></div>
    </Splitter>

    );
  }
}
 
export default Spliter;
