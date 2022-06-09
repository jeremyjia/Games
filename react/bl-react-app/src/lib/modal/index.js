import React from "react";
import "../../Components/w3/4/w3.css"; 

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div  id="id4Modal" class="w3-modal"> 
	  	xd
      </div>
    );
  }
} 