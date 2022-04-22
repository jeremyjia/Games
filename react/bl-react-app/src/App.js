import React from 'react';

import MetaTags from 'react-meta-tags';
import './css/w3.css';
import './css/App.css';
import AppHome from './Components/Home.js';
import W3Blog from './Components/w3/blog/index.js';
import W3ExampleDemoHomepageII from './Components/w3/examples/demo/HomepageII/index.js';
import NavBar1 from './Components/w3/NavBar1.js';

const App = () => (
  
  <body class="w3-light-grey"> 
  <MetaTags>
            <title>Page 1</title> 
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
  </MetaTags>
  
  <W3ExampleDemoHomepageII />
  </body>
);

export default App;
