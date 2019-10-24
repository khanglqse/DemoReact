import React, { Component } from "react";
import { ModalWrapper, ModalBoxSetup, ModalBg } from "./generalStyle";
import PropTypes from "prop-types";
/*
visible: boolean,
dismiss: function on click on Close.
*/
export default class ModalSetup extends Component {
  
render() {
 const { visible, dismiss, children, client } = this.props; 
   return (
         <React.Fragment>

            {visible ? (
              <ModalWrapper>
                  <ModalBoxSetup width={client}>{children} </ModalBoxSetup>
                 <ModalBg onClick={dismiss} />
             </ModalWrapper>
            ) : null}
         </React.Fragment>
     );
    }
}
