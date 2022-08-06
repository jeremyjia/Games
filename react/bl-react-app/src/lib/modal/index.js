import React from "react";
import "../../Components/w3/4/w3.css"; 

const Modal = function({state}){
	const closeMe = function(){    
        document.getElementById('id01').style.display='none';
    }

	return (
		<div id="id01" class="w3-modal"> 
			<div class="w3-modal-content">
                  <div class="w3-container">
                        <span onClick={() => closeMe()}  class="w3-button w3-display-topright">&times;</span>
                        <h2>Modal information:</h2>  
                        <table class="w3-table-all w3-hoverable">
                            <thead>
                            <tr class="w3-light-grey w3-hover-blue">
                                <th>Field</th>
                                <th>{state.xd}</th> 
                            </tr>
                            </thead>
                             
                        </table>  
                  </div>
              </div>

	  	</div>
	);

}
export default Modal;