import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from "prop-types";
 
import Car from "./w3/Tutorial/Car.js"

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(1);
  const [calculation, setCalculation] = useState(0);
 
 useEffect(() => {
  setCalculation(() => count * 2);
 },[count]);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

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
      <span>Users:bv0.25</span>    
      <Counter />
      <Example />
      <div className="App">
        <ItemList />
      </div>
      <Car xd="1973" />
    </Container>
);

export default Users;