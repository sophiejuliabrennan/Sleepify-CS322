import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import SignOutPage from '../SignOut';
import PasswordForgetPage from '../PasswordForget';
import PasswordChangePage from '../PasswordChange';
import HomePage from '../Home';
import AccountPage from '../Account';
import UploadPage from '../Upload';
import AdminPage from '../Admin';
import ProfilePage from '../Profile';
import LikesPage from '../Likes';
import * as ROUTES from '../../constants/routes';

const App = () => (
    <Router>
            <Navigation />
            {/* Show contents of each route */}
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_OUT} component={SignOutPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangePage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.UPLOAD} component={UploadPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.PROFILE} component={ProfilePage} />
            <Route path={ROUTES.LIKES} component={LikesPage} />
    </Router>
);
 
export default App;