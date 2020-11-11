import React from 'react';
import { withAuthorization } from '../Session';
 
const Profile = () => (
  <div>
    <h1>Profile</h1>
    <button></button>
  </div>
);
 
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Profile);