import React from 'react';
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
      on: true
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    return {year: props.xd };
  }

  changeColor = () => {
    let _color = "red";
    if(this.state.on){
      _color = "red";
      this.state.on = false;
    }
    else{
      _color = "blue";
      this.state.on = true;

    }
    this.setState({color: _color});
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeColor}
        >Change color</button>
      </div>
    );
  }
}
export default Car;