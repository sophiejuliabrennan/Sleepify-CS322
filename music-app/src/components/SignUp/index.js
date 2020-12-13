import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SignUp = () => (
  <div class = "wrop2">
    <div class = "siz">
    <h1>SignUp✎</h1>
    </div>
    <SignUpForm />
  </div>
);

const SignUpLink = () => (
  <div>
    <div class  = "donthavacc">
    <p>Don't have an account? </p>
    </div>
    <Link className="forceLeft"to={ROUTES.SIGN_UP}>Sign Up Now</Link>
  </div>
  
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component{
  constructor(props){
    super(props);
    this.state = { INITIAL_STATE };
  }
  
  onSubmit = e => {
    const { username, email, passwordOne } = this.state;
    console.log(e);
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
		
		//add user to firebase realtime database]
		return this.props.firebase
			.user(authUser.user.uid)
			.set({
				username,
				email,
			});
      })
      .catch(error => {
        this.setState({ error });
      });
 
    e.preventDefault();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render(){
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
    return(
      <div class = "wrap">
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Username"
            required
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            required
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            required
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <button disabled={isInvalid} type="submit">Sign Up</button>
      
          {error && <p>{error.message}</p>}
          
        </form>
      </div>
      </div>
    );
  }
}
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUp;
export { SignUpForm, SignUpLink };