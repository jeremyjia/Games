import React from "react";
import Modal from '../../../lib/modal'; 

class App3000 extends React.Component {
  state = {
    show: false,
    xd: "xdtest..."
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
    document.getElementById('id01').style.display='block';
  };
  render() {
    return (
      <div className="App">
        <button
          class="toggle-button"
          id="centered-toggle-button"
          onClick={e => {
            this.showModal(e);

          }}
        >
          {" "}
          show Modal{" "}
        </button>

        <Modal state = {this.state}/>
      </div>
    );
  }
}

export default App3000;