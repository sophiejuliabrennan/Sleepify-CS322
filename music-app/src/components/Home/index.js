import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import "./card.css";
import Playlists from '../PlaylistWork/Index';


const Discover = () => (
  <div class = "home">
    <div>
    <h1>Discover Sleepify♪♫♬</h1>
    <h2>Types Of Playlists: </h2>
<br></br>
<br></br>
<br></br>

<div container = "columns">

    <div class="container">
    <a href="http://localhost:3000/PlaylistSleep" >
    <img src = "img_sleep.jpg" alt="sleep"></img>
        <button class="btn">Sleep</button>
     
        </a>
    </div>
    
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

    <div class="container">
    <a href="http://localhost:3000/PlaylistStudy" >
      <img src = "img_study.jpg" alt="study"></img>
        <button class="btn">Study</button>
        
        </a>
    </div>
    
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

    <div class="container">
    <a href="http://localhost:3000/PlaylistWork" >
      <img src = "img_work.jpg" alt="work"></img>
        <button class="btn">Work</button>
        </a>
    </div>

   </div>
  </div></div>
);


const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Discover);




