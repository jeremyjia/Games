 
import { MemoryRouter, Switch, Route } from 'react-router-dom';
 
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
  
import '../../../4/w3.css';
import Users from './Users.js';
import Main from './main.js'; 
import Home from './home.js';

const W3ExampleDemoHomepageII = () => (     
  <MemoryRouter> 
        <div class="w3-sidebar w3-collapse w3-white w3-animate-left w3-large" style={{border:"solid 1px red", width:"300px;"}}>
      
          <h2>  
            <div>
              <ButtonToolbar className="custom-btn-toolbar">
                <LinkContainer to="/">
                    <Button>Home</Button>
                </LinkContainer>  
              </ButtonToolbar>
            </div>
            <div>
              <ButtonToolbar className="custom-btn-toolbar"> 
                <LinkContainer to="/main">
                    <Button>Main</Button>
                </LinkContainer> 
              </ButtonToolbar>
            </div>
            <div>
              <ButtonToolbar className="custom-btn-toolbar">  
                <LinkContainer to="/users">
                    <Button>Users</Button>
                </LinkContainer>
              </ButtonToolbar>
            </div>
          </h2>
        </div>

        <div class="w3-main" style={{marginLeft:"10px", border:"solid 1px purple"}}> 
       
          <h2> 
              <Switch>
                  <Route path="/users">
                      <Users />
                  </Route>
                  <Route path="/main">
                      <Main />
                  </Route>
                  <Route path="/">
                      <Home />
                  </Route>
              </Switch>
          </h2>
        </div>
  </MemoryRouter>
);

export default W3ExampleDemoHomepageII;