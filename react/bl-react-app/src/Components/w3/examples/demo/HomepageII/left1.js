
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
  
 
import '../../../4/w3.css'; 

const Home = () => <span>Home</span>;
const Users = () => <span>Users</span>;
const Left1 = () => (
    <div class="w3-sidebar w3-collapse w3-white w3-animate-left w3-large" style={{border:"solid 1px red", width:"300px;"}}>
        <MemoryRouter>
        <Container className="p-3">
            <Container className="p-5 mb-4 bg-light rounded-3">
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
            <h2>
                Current Page is{' '}
                <Switch>
                    <Route path="/about">
                        <div>about</div>
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
    </div>      
);

export default Left1; 