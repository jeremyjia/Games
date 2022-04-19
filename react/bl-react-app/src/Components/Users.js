import React, { useState, useEffect,useReducer    } from 'react';
 
import Container from 'react-bootstrap/Container';
import PropTypes from "prop-types";
 
import Car from "./w3/Tutorial/Car.js" 
import GoogleChart1 from "./w3/js/googleCharts/1.js"

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

const AppUseCallback = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            xd1: {todo.title}
          </label>
        </div>
      ))}
    </>
  );
 
};

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
      <GoogleChart1 />
      <Counter />
      <Example />
      <div className="App">
        <AppUseCallback />
        <ItemList />
      </div>
      <Car xd="1973" />
    </Container>
);

export default Users;