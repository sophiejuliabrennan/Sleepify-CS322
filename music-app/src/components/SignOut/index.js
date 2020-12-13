import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const SignOut = () => (
  <div>
    {/* <h1>SignOut</h1> */}
    <SignOutForm />
  </div>
);

class SignOutFormBase extends Component{

  signingOut = e => {
    console.log(e);
    this.props.firebase.doSignOut();
  }
  render(){
    return(
      <div>
        <button onClick={this.signingOut}>Sign Out Confirmation</button>
      </div>
    );
  }
}
const SignOutForm = withFirebase(SignOutFormBase);
 
export default SignOut;
export { SignOutForm };