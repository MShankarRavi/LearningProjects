import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import AccountUpdate from '../Forms/AccountUpdate/AccountUpdate';
import Login from '../Forms/Login/Login';
import LoanForm from '../NewLoan/LoanForm';
import Home from '../Forms/Home/Home';
import LoanAmountForm from '../Forms/LoanAmountForm/LoanAmountForm';
import { selectLoggedIn } from '../features/userSlice';
import { useSelector } from 'react-redux';

function Router(props) {

    const userLoggedIn = useSelector(selectLoggedIn);
    return (

        <Switch>

            <Route path="/accountupdate">
                <AccountUpdate />
            </Route>
            <Route path="/loanform">
                <LoanAmountForm />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/loanAmountForm">
                <LoanAmountForm />
            </Route>

            <Route path="/" exact>
                <Login />
            </Route>
            <Route exact path="/" render={() => (
                userLoggedIn ? (
                    <Redirect to="/login" />
                ) : (
                    <Redirect to="/Login" />
                )
            )} />

        </Switch>


    );
}

export default Router;