import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from "prop-types";
 
import Car from "./w3/Tutorial/Car.js"

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);  


  return <h1>I've rendered {count} times!</h1>;
}

// Item组件
class Item extends React.Component{   
  render(){
    return (
      <li><Timer />{this.props.item}<Hello tips={"test"} /> </li>
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
      <span>Users:bv0.23</span>    
      <div className="App">
        <ItemList />
      </div>
      <Car xd="1973" />
    </Container>
);

export default Users;