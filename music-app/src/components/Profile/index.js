import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import firebase from "firebase";


class Profile extends Component 
{
  constructor(props) 
  {
    super(props);
 
    this.state = 
    {
      loading: false,
      users: [],
    };
  }
 
  render() 
  {
    const { users,loading } = this.state;

    return (
      <div1>
        <h1>Profile</h1>

        {loading && <div> Loading ... </div>}

        <CurrentID users= {users}/>
        &nbsp;
        <CurrentEmail users= {users}/>
        &nbsp;
        <CurrentName users= {users}/>
        &nbsp;
        <Age users= {users}/>
        &nbsp;
        <Picture users= {users}/>
        
      </div1>
    );
  }
}

function ID()
{
  var user = firebase.auth().currentUser;

  if (user) 
  {
      document.getElementById("ID").innerHTML = "ID: " + user.uid;
  } 
}

const CurrentID = () => (
  <div onLoad={ID}>
    <button id="ID" onClick={ID}>CHECK CURRENT ID</button>
  </div>
);

function email()
{
  var user = firebase.auth().currentUser;

  if (user) 
  {
      document.getElementById("email").innerHTML = "Email: " + user.email;
  } 
}

const CurrentEmail = () => (
  <div onLoad={email}>
    <button id="email" onClick={email}>CHECK CURRENT EMAIL</button>
  </div>
);

function Username()
{
  var user = firebase.auth().currentUser;

  if (user) 
  {
      document.getElementById("Username").innerHTML = "Username: " + user.username;
  } 
}

const CurrentName = () => (
  <div onLoad={Username}>
    <button id="Username" onClick={Username}>CHECK CURRENT USERNAME</button>
  </div>
);

function age()
{
  document.getElementById("age").innerHTML = "You are : " + prompt("Enter your age please:");
}

const Age = () => (
  <div onLoad={age}>
    <button id="age" onClick={age}>USER AGE</button>
  </div>
);

function picture()
{
   window.addEventListener('load', function() 
  {
    document.querySelector('input[type="file"]').addEventListener('change', function() 
    {
       /* if (this.files && this.files[0]) 
        {
          var img = document.querySelector('img');
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
           img.onload = alert(this.src);
        }*/
    });
  });
}

const Picture = () => (
  <div>
    <button id="picture" onClick={picture}>UPLOAD PROFILE PICTURE</button>
  </div>
);

 
const condition = authUser => !!authUser;
export default withAuthorization(condition)(withFirebase(Profile));