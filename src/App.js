//{/*
import React, { useState, useEffect } from 'react';
import { selectName, selectLoggedIn } from './components/features/userSlice'
import { useSelector } from 'react-redux';
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Router from './components/Route/Route';




const App = () => {
  //Firebase call
  const userName = useSelector(selectName);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const userLoggedIn = useSelector(selectLoggedIn);

  return (
    <React.Fragment>
      <div className="App">
        <Header/>
        <Router/>
       {/*<Login loginFailure={showModal} successCallback={successCallback} />
        {userLoggedIn ? <Logout /> : <AccountUpdate />} 
        {modalIsOpen && <Modal show={modalIsOpen} closed={closeModal} />}
        {modalIsOpen && <Backdrop show={modalIsOpen} />}
        */}
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default App;

