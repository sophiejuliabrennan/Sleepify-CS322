import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
    <div className="NavBar" id="nav-container">
        <nav>
            <ul id="nav-list">    
                <li>
                    <Link to = { ROUTES.SIGN_IN }>
                        Sign In
                    </Link>
                </li>
                <li>
                    <Link to = { ROUTES.SIGN_UP }>
                        Create Account
                    </Link>
                </li>
                <li>
                    <Link to = { ROUTES.SIGN_OUT }>
                        Sign Out
                    </Link>
                </li>
                
                <li>
                    <Link to = { ROUTES.HOME }>
                        Home
                    </Link>
                </li>
                <li>
                
                    <input className={"searchBar"}type="text" placeholder="Search Music" name="search"/>
                
                </li>
                <li>
                    <Link to = { ROUTES.UPLOAD }>
                        Upload
                    </Link>
                </li>
                
                <li>
                    <Link to = { ROUTES.ADMIN }>
                        Admin 
                    </Link>
                </li>
                <li>
                    <li>
                        <Link to = { ROUTES.ACCOUNT }>Account</Link>
                    </li>
                    {/* Drop down options */}
                    <ul>
                        <li>
                            <Link to = { ROUTES.PROFILE }>Profile</Link>
                        </li>
                        <li>
                            <Link to = { ROUTES.LIKES }>Likes</Link>
                        </li>
                        <li>
                            <Link to = { ROUTES.PASSWORD_FORGET }>Forgot Password</Link>
                        </li>
                        <li>
                            <Link to = { ROUTES.PASSWORD_CHANGE }>Change Password</Link>
                        </li>
                    </ul>
                </li>

            </ul>
        </nav>
    </div>
);
 
export default Navigation;