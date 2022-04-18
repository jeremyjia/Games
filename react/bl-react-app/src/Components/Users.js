import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from "prop-types";
 
import Car from "./w3/Tutorial/Car.js"

// Item组件
class Item extends React.Component{
  render(){
    return (
      <li>{this.props.item}<Hello tips={"test"} /> </li>
    )
  }
}

// ItemList组件
class ItemList extends React.Component{
  render(){ 
    const data = [];
    data.push(1); 
    data.push(2);
    data.push(3);
    data.push(2);
    const itemList = data.map((v, i) => <Item item={v} key={i}/>);
    return (
      <ul>{itemList}</ul> 
    )
  }
};

class Hello extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>{this.props.tips}</div>
    );
  }
}

Hello.propTypes = {
  tips: PropTypes.string
};

const Users = () => (
    
    <Container>
      <span>Users:bv0.22</span>    
      <div className="App">
        <ItemList />
      </div>
      <Car />
    </Container>
);

export default Users;