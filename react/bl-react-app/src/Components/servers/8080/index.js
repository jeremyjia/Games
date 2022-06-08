
import React, { useState, useEffect,useReducer    } from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container'; 



function Example() {
  const [strTest, setTest] = useState("test");
  
 
  const makeVideoTest = function(){
    const token = "";
    const config = {
    headers: { Authorization: `Bearer ${token}` }
    };
     
    axios.get('http://localhost:8080/image/json2video?script=video.json', config)
    .then(response => {
        setTest("ok:" +  response.data); 
    })
    .catch(error => { 
        var r = {};
        r.token = {token};
        r.error = error; 
        setTest("error:" + Date()); 
    }); 
  }
  const getServerInfo = function(){
    const token = "";
    const config = {
    headers: { Authorization: `Bearer ${token}` }
    };
     
    axios.get('http://localhost:8080/getServerInfo', config)
    .then(response => {
        setTest("ok:" + JSON.stringify(response.data)); 
    })
    .catch(error => { 
        var r = {};
        r.token = {token};
        r.error = error; 
        setTest("error:" + Date()); 
    }); 
  }
  useEffect(() => {
    document.title = `Test: ${strTest} `;
  });

  return (
    <div>
      <p>Test: {strTest}</p>
      <button onClick={getServerInfo}>getServerInfo</button>
      <button onClick={makeVideoTest}>makeV1</button>
    </div>
  );
}

const S8080 = () => (
  <MemoryRouter>
    <Container className="p-3"> 
        <h1 className="header">Welcome To S8080 v0.113</h1>     
        <Example />  
    </Container>    
  </MemoryRouter>
);

export default S8080;