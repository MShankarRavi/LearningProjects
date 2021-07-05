import React from 'react';
import { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import './Login.scss';
import {login} from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';


function Login(props) {

    const [isLogin,setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [loggedIn,setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    /* Validating the user entered password and returning true if its valid */
    const  validatePassword = (p) => {
        
        let errors = [];
        if (p.length < 8) {
            errors.push("Your password must be at least 8 characters"); 
            alert("Your password must be at least 8 characters"); 
            return;
        }
        if (p.search(/[a-z]/i) < 0) {
            errors.push("Your password must contain at least one letter.");
            alert("Your password must contain at least one letter.");
            return
        }
        if (p.search(/[0-9]/) < 0) {
            errors.push("Your password must contain at least one digit."); 
            alert("Your password must contain at least one digit."); 
            return;
        }
        if (errors.length > 0) {
            return false;
        }else{
            return true;
        }        
    }


    /*User entered data and login state is passed to the dispatch method */
    const callReducer = (idToken) =>{
        if (idToken) {
            console.log("Logged in");
            successCallback({
                name,
                email,
                password,
                loggedIn:true,
                idToken,
            })
        } else {
           // props.loginFailure();
        }
    }
    
    /*Called when submitted button is clicked by user.Login Authentication using firebase */
    const formSubmitHandler = (e) => {
        let idToken = null;
        e.preventDefault();

        //validation
        const isValidPassword = validatePassword(password);
        if(isValidPassword) {
        //Login Authentication using firebase
        if(isLogin){
          const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrnDGW8sU4MGsFP_JNvTKQaH7XzT-wlQI";
          fetch(
              url,
              {
                  method:'POST',
                  body:JSON.stringify({
                      email,
                      password,
                      returnSecureToken:true,

                  }),
                  headers:{
                      'Content-Type':'application/json',
                  },
              }
          ).then((res)=>{
              setIsLoading(false);
              if(res.ok){
                  return res.json();
              }else{
                  return res.json().then((data)=>{
                      let errorMessage = "Authentication failure";
                      if(data & data.error & data.error.message)
                      {
                          errorMessage = data.error.message;
                      }
                  })
              }
          }).then((data)=>{
            console.log(data);
            if(data.idToken){
           idToken = data.idToken;
           setIsLoggedIn(true);
           alert('Login Successful.')
           history.replace('./home');
           callReducer(idToken);
        }
          }).catch((err)=>{
            alert("The email address or password that you've entered does not match any account.Please try again .");
          })
        }
    }

    };

    /* Login successcall back to dispatch the data */
    const successCallback = (user) => {
        dispatch(
          login({
            name: user.name,
            email: user.email,
            password: user.password,
            loggedIn: user.loggedIn,
            idToken :user.idToken
          })
        )
    
      }

    return (
        <>
        <form className="formLogin" onSubmit={formSubmitHandler}>
            <div className="form-inner">
                <div className = "login-border">
                <h2>Login Here !</h2>
                {/*Error */}
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text"
                        placeholder="Enter your username"
                        name="name"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => (setName(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        placeholder="Enter your email address"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e) => (setEmail(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        required
                        onChange={(e) => (setPassword(e.target.value))}
                    />
                </div>
                <input type="submit" value="Login" />
                <div className="container signin">
                    <p>New User? <Link to="/accountupdate">Sign Up</Link>.</p>
                </div>
            </div>
            </div>
        </form>
        </>
    );
}

export default Login;