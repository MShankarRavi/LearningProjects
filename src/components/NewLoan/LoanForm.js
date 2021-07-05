import { useState } from 'react';
import { useRef } from 'react';
import './LoanForm.css'

const LoanForm = (props) => {

  
    const [records, setRecords] = useState([]);
    const [loanRegistration, setLoanRegistration] = useState({
            account: "",
            amount: "",
            pan: ""
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        setLoanRegistration({
            ...loanRegistration,
            [name]: value
        })
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const newRecord = {
            ...loanRegistration,
            id: new Date().getTime().toString()
        }
        console.log(records);
        setRecords([
            ...records, newRecord
        ])
        
    if (records.length > 0) {
      props.onEnterLoan(records);
    }
        setLoanRegistration({
            account: "",
            amount: "",
            pan: ""
        })
    }

  const LoanInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = LoanInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterLoan(enteredValue);
    }
  };

  return (
    <form
      className="form-inline"
      onSubmit={formSubmitHandler}>
      <h1>Please fill in the details to apply loan.</h1>
      <label for="number">Account Number :</label>
      <input type="number" id="account" placeholder="Enter Account number" name="account" 
                                 value={loanRegistration.password}
                                 onChange={onChangeHandler}
                                  />
      <label for="text">Loan Amount :</label>
      <input type="amount" id="amount" placeholder="Enter loan amount" name="amount"
                                 value={loanRegistration.password}
                                 onChange={onChangeHandler}
      />
      <label for="pan">PAN number :</label>
      <input type="password" id="pan" placeholder="Enter PAN number" name="pan" 
                                 value={loanRegistration.password}
                                 onChange={onChangeHandler}
      />

      <p>By applying for loan you agree to our <a href="#">Terms & Privacy</a></p>
      {/*<button type="submit">Submit</button> */}
      <button>{props.loading ? 'Sending...' : 'Apply Loan'}</button>
      <input type='text' ref={LoanInputRef} />
    </form>
  );

};

export default LoanForm;

