import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

 
const Landing = () => (
  <div1>
    <div>
    <h1>Sleepify</h1>
    </div>

    <div2 id = "center">
    <h3>Sign In</h3>
    </div2>

   <Link className="one" to = { ROUTES.SIGN_IN }>Sign In</Link>
  
    <br></br>
    <br></br>
    <br></br>

    <div2 id = "center">
    <h3>If you have not created account yet, please Sign Up first:</h3>
    </div2>

    <Link className="one" to = { ROUTES.SIGN_UP }>Sign Up</Link>
    

    <br></br>
    <br></br>
    <br></br>

   
    
  </div1>

);

export default Landing;