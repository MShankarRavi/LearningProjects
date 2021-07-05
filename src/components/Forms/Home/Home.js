import React from 'react';
import Accordion from '../../Accordion/Accordion';
import classes from '../Home/Home.css';


function Home(props) {
    return (
        <form className = {classes.bodyHome} >
        <div>
         <Accordion/>
        </div>
        </form>
    );
}

export default Home;