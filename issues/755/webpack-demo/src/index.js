import _ from 'lodash';

 function component() {
   const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
   element.innerHTML = _.join(['bv0.12: ','Hello', 'webpack'], ' ');

   return element;
 }

 document.body.appendChild(component());