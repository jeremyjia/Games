
import Container from 'react-bootstrap/Container'; 

import '../../css/w3.css';
const W3NavBar1 = () => (    
    <Container>
    <div class="w3-bar w3-black">
        <a href=".." class="w3-bar-item w3-button">W3NavBar1-xdv0.22</a>
        <a target="_blank" href="https://github.com/jeremyjia/Games" class="w3-bar-item w3-button">repo</a>
        <a target="_blank" href="https://jeremyjia.github.io/Games/" class="w3-bar-item w3-button">page</a>
        <a target="_blank" href="http://baidu.com" class="w3-bar-item w3-button">baidu</a>
        <a target="_blank" href="http://localhost:8080" class="w3-bar-item w3-button">8080</a>
        <a target="_blank" href="http://localhost:3000" class="w3-bar-item w3-button">3000</a>
    </div> 
    </Container>
);

export default W3NavBar1;