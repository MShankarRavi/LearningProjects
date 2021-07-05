import classes from './LoanItem.module.css';

const LoanItem = (props) => {
  return <li className={classes.loan}>{props.children}</li>
};

export default LoanItem;