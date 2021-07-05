import { Link } from "react-router-dom";
export const FAQ = [
{
    id:1,
    'question' : 'What are the functionalities available in this Sample Bank app?',
     'answer' : <div>   User can : <br/>
     <Link to = "/home">1.Sign up</Link> : Create an account by clicking on Sign up from Login screen.An email and password has been created for the user by issuing an HTTP POST request to the Auth signupNewUser endpoint. <br/>
     <Link to = "/home">2.Login</Link>  : User can sign in with the email and password by issuing an HTTP POST request to the Auth verifyPassword endpoint.<br/>
     <Link to = "/home">3.Home</Link>  - FAQ Section : On successful Login, user will be navigated to the Home screen,where you can see the FAQ related to the Bank app.<br/>
     <Link to = "/home">4.Navigation Links :</Link> Post Login screens will have Navigation Links available in the Header.<br/>
     <Link to = "/home">5.Apply Loan :</Link>  On clicking Apply Loan, user can navigate to Loan section and can apply a Loan.The Http calls are implemented using Custom Hook concept and the applied loan amount and tenure will be shown in the same page below the apply section.<br/>
     <Link to = "/home">6.Account Update :</Link> Here user wont be able to update Email as it is the Primary Key of that user.<br/>
     - The Account Update screen will be pre-populated with data from the Firebase Cloud Firebase based on the email id entered on successful login.<br/>
     - The add , get and update dB operations are done in the Account update screen.<br/>
     - User can also update password or re-enter the initial password to update Account details.<br/>
     Once updated, the user will be taken back to Home screen.<br/>
     <Link to = "/home">7.State Management :</Link>   The state management to get details on whether user is Logged In, whether a valid token is sent from Firebase  while Login and user information is done by implementing Redux Toolkit.<br/>
     <Link to = "/home">8.Logout :</Link>  On clicking Logout the user information, isLoggedIn and isToken values will be cleared and user will navigate back to Login screen.<br/>
     <Link to = "/home">9.SCSS implementation.</Link>  <br/>
     <Link to = "/home"> 10.Routing :</Link> Separate file for Routing. <br/>
     </div>

},
{
    id:2,
    'question' :'What should I do if I would like to open another account or sign up for additional services? ',
    'answer': 'Contact Deposit Services at 1800-000-6900.'

},
{
    id:3,
    'question' : 'Are there any restrictions on my choice of a PIN ?  ',
    'answer': 'Visit any of our branches and ask to talk to a Client Representative. '


},
{
    id:4,
    'question' : 'Who should I contact if I have problems with my account? ',
    'answer': 'Contact Deposit Services at 1800-000-6900.'

},
{
    id:5,
    'question' : 'When will my funds transfer actually be posted to my account ? ',
    'answer': 'Your transaction is posted immediately. Transfers initiated during non-business hours will be posted the morning of the next business day. '

},

]

export default FAQ;