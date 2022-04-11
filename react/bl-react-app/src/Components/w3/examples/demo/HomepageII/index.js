 
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
  
import '../../../4/w3.css';
import Left1 from './left1.js';
import Main from './main.js'; 

const W3ExampleDemoHomepageII = () => (     
  <MemoryRouter> 
        <div class="w3-sidebar w3-collapse w3-white w3-animate-left w3-large" style={{border:"solid 1px red", width:"300px;"}}>
          <h1 className="header">Welcome To appHome v0.112</h1>
          <h2> 
              Navigate to{' '}
              <ButtonToolbar className="custom-btn-toolbar">
              <LinkContainer to="/">
                  <Button>Home</Button>
              </LinkContainer>
              <LinkContainer to="/about">
                  <Button>About</Button>
              </LinkContainer>
              <LinkContainer to="/users">
                  <Button>Users</Button>
              </LinkContainer>
              </ButtonToolbar>
          </h2>
        </div>

        <div class="w3-main" style={{marginLeft:"100px", border:"solid 1px purple"}}> 
          <Main />
          <h2>
              Current Page is{' '}
              <Switch>
                  <Route path="/about">
                      <div>about</div>
                  </Route>
                  <Route path="/users">
                      <div>users</div>
                  </Route>
                  <Route path="/">
                      <div>Home</div>
                  </Route>
              </Switch>
          </h2>
        </div>
  </MemoryRouter>
);

export default W3ExampleDemoHomepageII;