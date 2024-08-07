
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';

import About from './About.js';
import Users from './Users.js';
import W3NavBar1 from './w3/NavBar1.js';
import W3Blog from './w3/blog/index.js';
import Servers from './servers/index.js';

const Home = () => <span>Home</span>; 

const AppHome = () => (
  <MemoryRouter>
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Welcome To appHome v0.113</h1>
      <h2>
        <W3NavBar1 />
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
          <LinkContainer to="/W3Blog">
            <Button>W3Blog</Button>
          </LinkContainer>
          <LinkContainer to="/Servers">
            <Button>Servers</Button>
          </LinkContainer>
        </ButtonToolbar>
      </h2>
      <h2>
        Current Page is{' '}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/Servers">
            <Servers />
          </Route>
          <Route path="/W3Blog">
            <W3Blog />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </h2>
      
    </Container>

  </Container>
  
</MemoryRouter>
);

export default AppHome;