import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../images/bill.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedIn } from '../features/userSlice';
import { login, logout } from '../features/userSlice';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';

function Header(props) {

  let  userLoggedIn = useSelector(selectLoggedIn);

  const [activeSession,setActiveSession] = useState('');

  if(userLoggedIn){
    localStorage.setItem('active-session',JSON.stringify(userLoggedIn));
  }
  let  sessionData = localStorage.getItem('active-session');
  if(sessionData){
    sessionData = (JSON.parse(sessionData));
  }


  const history = useHistory();

  const dispatch = useDispatch();

  const onClickLogoutHandler = () => {
    history.replace('/login');
    localStorage.clear();
    dispatch(
      logout({
        name: " ",
        email: " ",
        password: " ",
        loggedIn: false,
        idToken: " "
      })
    )
  }
  return (
    <header>
      <div className={classes.container}>
        <h1 ></h1>
        <div>
          <Link to = {userLoggedIn ? '/home' : '/login'} className={classes.logo}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <nav>
       
       { (userLoggedIn || sessionData) ?
          <ul>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/loanAmountForm'>Apply Loan</Link></li>
            <li><Link to='/accountUpdate'>Update Account</Link></li>        
            <button className={classes.buttonLogout} onClick={onClickLogoutHandler}>
              Logout
            </button>
          </ul> : null 
          }
        </nav>

      </div>
    </header>
  );
}

export default Header;