import React from 'react';
import { withAuthorization } from '../Session';
 
const Upload = () => (
  <div>
    <h1>Upload</h1>
  </div>
);
 
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Upload);