// import React from 'react';

// import Modal from 'react-bootstrap-modal';
// import Button from '@material-ui/core/Button';
// // import ModalHeader from 'react-bootstrap/ModalHeader';
// // import ModalTitle from 'react-bootstrap/ModalTitle';
// // import ModalBody from 'react-bootstrap/ModalBody';
// // import ModalFooter from 'react-bootstrap/ModalFooter';
// export default class PopupBtn extends React.Component{
//     constructor(props, context) {
//         super(props, context);
    
//         this.handleShow = this.handleShow.bind(this);
//         this.handleClose = this.handleClose.bind(this);
    
//         this.state = {
//           show: false,
//         };
//       }
    
//       handleClose() {
//         this.setState({ show: false });
//       }
    
//       handleShow() {
//         this.setState({ show: true });
//       }
//     render(){
//         return(
//             <div className="popup">
//                 <div className="popup-btn" onClick={this.handleShow}>
//                     <p>Popup</p>
//                     <i className="material-icons right" >
//                         add
//                     </i>
//                 </div>
//                 <Button variant="primary" onClick={this.handleShow}>
//                     Launch demo modal
//                 </Button>

//                 <Modal show={this.state.show} onHide={this.handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Modal heading</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={this.handleClose}>
//                         Close
//                         </Button>
//                         <Button variant="primary" onClick={this.handleClose}>
//                         Save Changes
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         )
//     }
// }


import React from 'react';
import Modal from './Modal';
import '../../styles/ui/_popupbtn.scss';
class PopupBtn extends React.Component {

    constructor() {
        super();

        this.state = {
            isShowing: false
        }
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

    render () {
        return (
            <div className="wrap-popup">
                  { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
                 <div className="popup">
              

                {/* <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button> */}
                    <div className="popup-btn" onClick={this.openModalHandler}>
                        <p>Popup</p>
                        <i className="material-icons right" >
                            add
                        </i>
                    </div>
                    </div>
                <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
                </Modal>
            </div>
        );
    }
}

export default PopupBtn;