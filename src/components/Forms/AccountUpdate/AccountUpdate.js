import React from 'react';
import './AccountUpdate.css';
import { useSelector } from 'react-redux';
import { selectEmail, selectLoggedIn, selectIdToken } from '../../features/userSlice';
import { useRef, useState } from 'react';
import { useHistory,Link } from 'react-router-dom';
import { db } from '../../Firebase/Firebase';

function AccountUpdate(props) {
  const userLoggedIn = useSelector(selectLoggedIn);
  const userEmail = useSelector(selectEmail);
  const userIDToken = useSelector(selectIdToken);

  const [updatedFullname, setUpdatedFullname] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [dataBaseID, setDataBaseID] = useState(' ');

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState("");


  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmInputRef = useRef();
  const newPasswordInputRef = useRef();
  const newConfirmInputRef = useRef();

  const history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      /*Getting the values from Firebase Cloud firestore */

      const data = db.collection('contacts').get().then((snapshot) => {
        console.log(snapshot.docs);
        snapshot.docs.forEach((doc => {
          renderContacts(doc);
        }))
      })
    };
    fetchData();
  }, []);

  /* Called from useEffect to set the values from db to updated State values.*/

  const renderContacts = (doc) => {
    if (userLoggedIn && userEmail == doc.data().email) {
      setDataBaseID(doc.id);
      const updatedFullname = doc.data().fullname;
      setUpdatedFullname(updatedFullname);
      const updatedEmail = doc.data().email;
      setUpdatedEmail(updatedEmail);
      const updatedPhone = doc.data().phone;
      setUpdatedPhone(updatedPhone);
      const updatedUsername = doc.data().username;
      setUpdatedUsername(updatedUsername);
    }
  }


  /* onClick Submit - PreLogin 
  Adding user account information to Firebase Cloud firestore
  */
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if ({ userLoggedIn }) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const confirmPassword = confirmInputRef.current.value;

      if (enteredPassword !== confirmPassword) {
        alert('Passwords does not match !')
        return;
      }
      setIsLoading(true);
      if (isLogin) {
        //...
      } else {
        fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrnDGW8sU4MGsFP_JNvTKQaH7XzT-wlQI',
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true

            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then((res) => {
          if (res.ok) {
            alert('Account created successfully.Please login to continue.');
            storeDB();

          } else {
            return res.json().then((data) => {
              //show an error model
              console.log(data);
              let errorMessage = "Authentication failed.Please try again."
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            })
          }
        })
        setIsLoading(false);
      }
    }
  };

  // const [records, setRecords] = useState([]);
  /* For demo purpose*/
  const [userRegistration, setUserRegistration] = useState({
    username: "",
    password: "",
    phone: "",
    pan: "",
    email: ""
  });


  /*onChange Handler -PreLogin */
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setUserRegistration({
      ...userRegistration,
      [name]: value
    })
  }

  /*onChange Email Handler  */
  const onChangeHandlerEmail = (e) => {
    {
      userLoggedIn ? alert('Customers are not authorized to change Email.Please contact your nearest Bank.')
        : setEmail(e.target.value)
    }
  }

  /*Adding account information to Firebase Cloud Fire store . */
  const storeDB = () => {
    setIsLoading(true);

    db.collection("contacts")
      .add({
        username,
        email,
        fullname,
        username,
        phone,
      })
      .then(() => {
        setIsLoading(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setIsLoading(false);
      });

    history.replace('./login');
    setUsername(" ");
    setEmail(" ");
    setFullname(" ");
    setPhone(" ");
    setAccountType(" ");
  }

  /*onClick Update button - Post Login
  Updating the user account information and password.
  */

  const newPasswordUpdateHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    const confirmNewPassword = newConfirmInputRef.current.value;

    if (enteredNewPassword !== confirmNewPassword) {
      alert('Passwords does not match !')
      return;
    }

    // add validation
    setIsLoading(true);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBrnDGW8sU4MGsFP_JNvTKQaH7XzT-wlQI', {
      method: 'POST',
      body: JSON.stringify({
        idToken: userIDToken,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        updatedB();
      } else {
        return res.json().then((data) => {
          //show an error model
          console.log(data);
          let errorMessage = "Authentication failed.Please try again."
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        })
      }
      setIsLoading(false);
    })
  };

  /*Update Account Information to Firebase Fire Cloud 
  Called from success of password update Authorization callback.
  */

  const updatedB = () => {
    db.collection('contacts').doc(dataBaseID).update({
      username: updatedUsername,
      fullname: updatedFullname,
      phone: updatedPhone,
    })
    alert('Your Account details has been updated successfully.Please login with the updated password from next Login.');
    history.replace('/home');
    setUsername(" ");
    setEmail(" ");
    setFullname(" ");
    setPhone(" ");
    setAccountType(" ");
  }

  const headerText = userLoggedIn ? 'Account Update' : 'Registration';


  return (
    <React.Fragment>
      <form className="formAccountUpdate"
        onSubmit={userLoggedIn ? newPasswordUpdateHandler : formSubmitHandler}
      >
        <div className="bodyAccount">
          <div className="containerAccount">
            <div className="title">{headerText}</div>
            <div className="contentAccount">
              <div className="formAccount" action="#">
                <div className="user-details">
                  <div className="input-box">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      value={userLoggedIn ? updatedFullname : fullname}
                      onChange={(e) => { userLoggedIn ? setUpdatedFullname(e.target.value) : setFullname(e.target.value) }}

                      placeholder="Enter your full name" required
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="name">Username *</label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={userLoggedIn ? updatedUsername : username}
                      onChange={(e) => { userLoggedIn ? setUpdatedUsername(e.target.value) : setUsername(e.target.value) }}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"                     
                      placeholder="Enter your email"
                      ref={emailInputRef}
                      disabled = {(userLoggedIn)? "disabled" : ""}
                      autoComplete="off"
                      type="email"
                      name="email"
                      id="email"
                      value={userLoggedIn ? updatedEmail : email}
                      onChange={onChangeHandlerEmail}
                      required />
                  </div>
                  <div className="input-box">
                    <label htmlFor="number">Phone Number *</label>
                    <input
                      type="text"
                      placeholder="Enter your phone number"
                      value={userLoggedIn ? updatedPhone : phone}
                      onChange={(e) => { userLoggedIn ? setUpdatedPhone(e.target.value) : setPhone(e.target.value) }}
                      required />
                  </div>
                  <div className="input-box">
                    <label htmlFor="password">Password *</label>
                    <input
                      ref={userLoggedIn ? newPasswordInputRef : passwordInputRef}
                      placeholder="Enter your password"
                      onChange={onChangeHandler}
                      autoComplete="off"
                      type="password"
                      name="password"
                      id="password"
                      required />
                  </div>
                  <div className="input-box">
                    {/* <span className="details">Confirm Password</span> */}
                    <label htmlFor="password">Confirm Password *</label>
                    <input type="text"
                      placeholder="Confirm your password"
                      ref={userLoggedIn ? newConfirmInputRef : confirmInputRef}
                      required />
                  </div>
                </div>
                {userLoggedIn ? null:
                  <div className="account-details">
                    <input type="radio" name="account" id="dot-1" />
                    <input type="radio" name="account" id="dot-2" />
                    <input type="radio" name="account" id="dot-3" />
                    <label htmlFor="password">Account Type</label>
                    <div className="category">
                      <label htmlFor="dot-1">
                        <span className="dot one"></span>
                        <span className="account">Current</span>
                      </label>
                      <label htmlFor="dot-2">
                        <span className="dot two"></span>
                        <span className="account">Savings</span>
                      </label>
                      <label htmlFor="dot-3">
                        <span className="dot three"></span>
                        <span className="account">NRI</span>
                      </label>
                    </div>
                  </div>
                }
                <div className="button">
                  <input type="submit"
                    style={{ background: isLoading ? "#ccc" : " rgb(2, 2, 110)" }}
                    value={userLoggedIn ? "Update" : "Register"} />
                </div>
                { userLoggedIn ? null :
                <div className="back-login">
                    <p><Link to="/login">Back to Login</Link>.</p>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default AccountUpdate;