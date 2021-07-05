import React, { useState } from 'react';
import './LoanAmountForm.css';
import Loans from '../../Loans/Loans';
import useHttp from '../../hooks/use-http';
import { useEffect } from 'react';
import { selectEmail } from '../../features/userSlice';
import { useSelector } from 'react-redux';


//  LoanAmountForm component to enter loan amount and duration to get details
const LoanAmountForm = (props) => {

    const userEmail = useSelector(selectEmail);
    const getCurrentDate = () =>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = month  + '\n'+ day  + ',' + year;
    return output;
    }


    const [loanDuration, setLoanDuration] = useState(6);
    const [loanAmount, setLoanAmount] = useState(50000);
    const [date,setDate] = useState('');
    const [loans, setLoans] = useState([]);

    let { isLoading, error, sendRequest: fetchLoans } = useHttp();

    useEffect(() => {
        const transformLoans = (loansObj) => { 
            const loadedLoans = [];
            
            for (const loanKey in loansObj) {
                if(loansObj[loanKey].text[0].userEmail === userEmail){
                loadedLoans.push({ id: loanKey, text: `💰 Loan amount of Rs ${loansObj[loanKey].text[0].loanAmount} for a Tenure of ${loansObj[loanKey].text[0].loanDuration} Months has been approved on ${loansObj[loanKey].text[0].currentDate} ` });
                }
            }

            setLoans(loadedLoans);
        };

        fetchLoans(
            { url: 'https://react-contact-form-cad6d-default-rtdb.firebaseio.com/loans.json' },
            transformLoans
        );
    }, [fetchLoans]);

    const loanAddHandler = (loan) => {
        setLoans((prevLoans) => prevLoans.concat(loan));
    };

    //Firebase call
    /*Post Service */

    let {sendRequest: sendLoanRequest } = useHttp();

    const createLoan = (loanText, loanData) => {
      const generatedId = loanData.name; // firebase-specific => "name" contains generated id
      const createdLoan = { id: generatedId, text: loanText };
  
      props.onAddLoan(createdLoan);
    };
  
    const enterLoanHandler = async (loanText) => {
      sendLoanRequest(
        {
          url:'https://react-contact-form-cad6d-default-rtdb.firebaseio.com/loans.json',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { text:loanText },
        },
        createLoan.bind(null, loanText)
      );
    };

    const changeLoanDurationHandler = (event) => {
        setLoanDuration(event.target.value);
    }

    const changeLoanAmountHandler = (event) => {
        setLoanAmount(event.target.value);
    }

    let currentDate = getCurrentDate();

    const formSubmitHandler = (event) => {
        event.preventDefault();
        let loanValue = [];
        loanValue = [{
           loanAmount ,
           loanDuration,
           currentDate,
           userEmail
        }]
        enterLoanHandler(loanValue);

    }

    return (
        <React.Fragment>
            <form className="loanForm" onSubmit={formSubmitHandler}>           
                <div className="mt-5">
                    <div className="m-auto max-width-form">
                    <div className = "dotted-lines"><h1>Select your required Loan Amount and Tenure :</h1></div>
                        {/* card */}
                        <div className="card mb-3 bg-light">
                            <div className="card-body">
                                {/* Enter loan amount */}
                                <div className="form-group">
                                    <label htmlFor="amountRange" className="m-0">
                                        <h4 className="font-weight-normal m-0">Loan Amount :</h4>
                                    </label>
                                    <div className="font-weight-light text-md-left text-center">( Use slider to select an amount between RS 50000 and 500000 )</div>
                                    <div className="d-flex align-items-center mt-2">
                                        {/* slider */}
                                        <div className="w-75">
                                            <input type="range" min={50000} max={500000} className="form-control-range" id="amountRange" onChange={changeLoanAmountHandler} value={loanAmount} />
                                        </div>
                                        {/* input read-only */}
                                        <div className="w-25 pl-2">
                                            <input type="text" className="form-control-range font-size-large" id="amountValue" value={loanAmount} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* card */}
                        <div className="card mb-3 bg-light">
                            <div className="card-body">
                                {/* Select loan duration */}
                                <div className="form-group">
                                    <label htmlFor="durationSelect" className="m-0">
                                        <h4 className="font-weight-normal m-0">Loan Duration :</h4>
                                    </label>
                                    <div className="font-weight-light text-md-left text-center">( Select number of months between 6 to 24 )</div>
                                    {/* select for duration */}
                                    <div className="mt-3">
                                        <select className="form-control font-size-large" id="durationSelect" onChange={changeLoanDurationHandler} value={loanDuration}>
                                            <option value="6">6 months</option>
                                            <option value="7">7 months</option>
                                            <option value="8">8 months</option>
                                            <option value="9">9 months</option>
                                            <option value="10">10 months</option>
                                            <option value="11">11 months</option>
                                            <option value="12">12 months</option>
                                            <option value="13">13 months</option>
                                            <option value="14">14 months</option>
                                            <option value="15">15 months</option>
                                            <option value="16">16 months</option>
                                            <option value="17">17 months</option>
                                            <option value="18">18 months</option>
                                            <option value="19">19 months</option>
                                            <option value="20">20 months</option>
                                            <option value="21">21 months</option>
                                            <option value="22">22 months</option>
                                            <option value="23">23 months</option>
                                            <option value="24">24 months</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            {/* Button to call getLoanDetails method received as a prop from App component */}
                            <button className="btn btn-primary pr-4 pl-4">
                                {/*   <h4 className="font-weight-normal m-0">Apply Loan</h4> */}
                                {props.loading ? 'Sending...' : 'Apply Loan'}
                            </button>
                            <p>By applying for loan you agree to our <a href="#">Terms & Conditions</a></p>
                        </div>
                        <div className = "dotted-lines">Approved Loans : </div>
                        <div>
                           {/* <NewLoan onAddLoan={loanAddHandler} /> */}
                            <Loans
                                items={loans}
                                loading={isLoading}
                                error={error}
                                onFetch={fetchLoans}
                            />    </div>

                    </div>
                </div>

            </form>
        </React.Fragment>
    );
};

export default LoanAmountForm;

