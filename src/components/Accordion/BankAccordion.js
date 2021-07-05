import React from 'react';
import { useState } from 'react';
import './Accordion.css';

function BankAccordion({ question, answer }) {
    const [show, setShow] = useState(false);
    return (
        <>
            
            <div className='question'>
            <h1 >{question}</h1>
                <span  onClick={() => setShow(!show)}>
                    {show ? "–" : "+"}
                </span>
            </div>
            {show && 
            <div className = 'answer'>
            <p>{answer}</p>
            </div>}

        </>
    );
}

export default BankAccordion;