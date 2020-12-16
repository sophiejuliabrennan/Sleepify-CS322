import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

 
const Landing = () => (
  <div1>
    <div>
    <h1>MusiQ</h1>
    </div>

    <div2 id = "center">
    <h3>Sign In before listening to music:</h3>
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

    <h1>We are a free music streaming website</h1>
    <h2>And the features that this website provide include:</h2>
    <h3>Any user can upload their music so you can listen to it online.</h3>
    <h3>You may download songs you like</h3>
    <h3>Before listening to the songs, you have to create an account with us.</h3>
    <h3>You can browse the music by songs, artists or genre.</h3>
    <h3>You can do all of that in seconds and its free of charge.</h3>
    
  </div1>

);

export default Landing;