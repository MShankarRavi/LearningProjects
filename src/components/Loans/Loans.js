import Section from '../UI/Section';
import LoanItem from './LoanItem';
import classes from './Loans.module.css';

const Loans = (props) => {
  let loanList = <h2>No Loans applied yet!</h2>;

  if (props.items.length > 0) {
    loanList = (
      <ul>
        {props.items.map((loan) => (
          <LoanItem key={loan.id}>{loan.text}</LoanItem>
        ))}
      </ul>
    );
  }

  let content = loanList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = 'Loading Loan details...';
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Loans;