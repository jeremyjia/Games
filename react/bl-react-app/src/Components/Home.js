
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';

import About from './About.js';
import W3NavBar1 from './w3/NavBar1.js';

const Home = () => <span>Home</span>;
const Users = () => <span>Users</span>;
const AppHome = () => (
  <MemoryRouter>
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Welcome To appHome v0.112</h1>
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