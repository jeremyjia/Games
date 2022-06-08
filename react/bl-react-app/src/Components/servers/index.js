
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';


import S8080 from './8080/index.js';
 
const S3000 = () => <span>S3000</span>; 
const S5000 = () => <span>S5000</span>; 

const ServersHome = () => (
  <MemoryRouter>
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Welcome To Servers Home v0.114</h1>
       
      <ButtonToolbar className="custom-btn-toolbar">  
          <LinkContainer to="/8080"><Button>8080</Button></LinkContainer> 
          <LinkContainer to="/3000"><Button>3000</Button></LinkContainer> 
          <LinkContainer to="/5000"><Button>5000</Button></LinkContainer> 
      </ButtonToolbar>
      
      <h2>
        Current server is{' '}
        <Switch> 
          <Route path="/8080">   <S8080 />    </Route> 
          <Route path="/3000">   <S3000 />    </Route> 
          <Route path="/5000">   <S5000 />    </Route> 
        </Switch>
      </h2>
    </Container>

  </Container>
  
</MemoryRouter>
);

export default ServersHome;