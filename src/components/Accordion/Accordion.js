import React from 'react';
import { useState } from 'react';

import { FAQ } from './AccordionData';
import BankAccordion from './BankAccordion';
import './Accordion.css';

function Accordion(props) {
    const [data, setData] = useState(FAQ)
    return (
        <>
            <div className = 'header-faq'>About this app & FAQs </div>
            <section className="accordionSection">

                {
                    data.map((curElem) => {
                        const { id, question, answer } = curElem;
                        return <BankAccordion key={id} {...curElem} />

                    })

                }

            </section>
        </>
    );
}

export default Accordion;