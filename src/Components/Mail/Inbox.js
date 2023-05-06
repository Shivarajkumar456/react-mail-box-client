import { useEffect, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../../store/Mail";
import MailData from "./MailData";
import './Inbox.css';

const Inbox = ()=> {
    const mails  = useSelector(state => state.mail.mailData);
    const email = useSelector(state=> state.auth.email);
    const replaceEmail = email.replace(/[@ .]/g, '');
    const dispatch = useDispatch();
    const inboxMails = mails.filter(mail=>mail.to === email );

    useEffect(() => {
        let newdata = []
        async function fetchMails(){
        try {
          const res = await fetch(
            `https://reactmailbox-7a108-default-rtdb.firebaseio.com/${replaceEmail}.json`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          if (res.ok) {
            
            for (let key in data) {
              newdata.push({ id: key, ...data[key] });
            }
            dispatch(
            mailActions.replaceMails({
                mailData : newdata,
            })
            )
    
          } else {
            throw data.error;
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    
      fetchMails()
       }, [dispatch,replaceEmail]);

       const mailItem = inboxMails.map(mail=>(
         <MailData key={mail.id} mail={mail} toorFrom='From' />
    ));
    
    return (
    <Fragment>
    <div className='containers'>
      <div className='sidebar'>
      <div className='sideContent'>
      <NavLink to="/compose" className='none' activeClassName='active'> <div className='content'>Compose</div></NavLink>
        <NavLink to="/inbox" className='none' activeClassName='active'><div className='content'>Inbox</div></NavLink>
       <NavLink to="/sent" className='none' activeClassName='active'> <div className='content'>Sent</div></NavLink>
       </div>
      </div>
      <div className = 'inbox'>
        {mailItem}
      </div>
    </div>
  </Fragment>
)
    
}
export default Inbox;