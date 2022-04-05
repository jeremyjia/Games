 
import '../../../css/w3.css';
import Header from './header.js';
import Body from './body.js';
import Footer from './footer.js';

const W3Blog = () => (    
    <body class="w3-light-grey"> 
        <div class="w3-content" style={{maxWidth:"1400px"}}> 
            <Header />
            <Body />
            <Footer />
        </div>         
    </body>
);

export default W3Blog;