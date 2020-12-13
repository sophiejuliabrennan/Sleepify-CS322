import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const SignIn = () => (
  <div class = "sign">
  <div>

    <h1 id = "hed">MusiQ</h1>
    <SignInForm />
    <SignUpLink />
  </div></div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          required
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          required
        />
        
        <button id = "btn" disabled={isInvalid} type="submit">
          Sign In
        </button>
 
        {error && <span><br></br>{error.message}</span>}
      </form>
    );
  }
}
 
const SignInForm = withRouter(withFirebase(SignInFormBase));


export default SignIn;
 
export { SignInForm };