import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../../store/Mail";
import MailData from "./MailData";
import './Inbox.css';
import Sidebar from "../Header/Sidebar";

const Inbox = ()=> {
    const mails  = useSelector(state => state.mail.mailData);
    const email = useSelector(state=> state.auth.email);
    const changed = useSelector(state=>state.mail.changed);
    const replaceEmail = email.replace(/[@ .]/g, '');
    const dispatch = useDispatch();
    const inboxMails = mails.filter(mail=>mail.to === email );

    useEffect(() => {
        let newdata = []
        let count = 0;
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
              if(!data[key].isRead){
                count++;
              }
            }
            dispatch(
            mailActions.replaceMails({
                mailData : newdata,
                count : count,
                changed: changed
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
       }, [dispatch,replaceEmail, changed]);

       const mailItem = inboxMails.map(mail=>(
         <MailData key={mail.id} mail={mail} toorFrom='From' />
    ));
    
    return (
    <Fragment>
    <div className='containers'>
      <Sidebar />
      <div className = 'inbox'>
        {mailItem}
      </div>
    </div>
  </Fragment>
)
    
}
export default Inbox;