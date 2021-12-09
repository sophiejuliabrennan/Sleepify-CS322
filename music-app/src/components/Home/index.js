import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import "./card.css";

const Discover = () => (
  <div class = "home">
    <div>
    <h1>Discover Sleepify♪♫♬</h1>
    
  </div></div>
);

// class GetMusicBase extends Component{
//   constructor(props){
//     super(props);
//     this.state = {};
//   }

  // Click me func :get every song with a reference and metadata from the database
 

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Discover);
