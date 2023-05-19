import { Fragment, useRef, useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../../store/Mail';
import Sidebar from '../Header/Sidebar';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './MailHome.css';

const MailHome = ()=> {
  const dispatch = useDispatch()
    const subject = useRef(null);
    const to = useRef(null);
    const authemail = useSelector(state=> state.auth.email);
    const changed = useSelector(state=>state.mail.changed);
    const replaceEmail = authemail.replace(/[@ .]/g, '');
    const [editorState , setEditorState] = useState(()=> EditorState.createEmpty() );
    const editorHandler=(editorState)=>{
        setEditorState(editorState);
    }
    const email = localStorage.getItem('email');
    const senderEmail = email.replace(/[@.]/g, '')

     const sendEmail = async (event)=>{
      event.preventDefault();
       console.log("compose button clicked");
       const toMail = to.current.value
       const recieverMail = toMail.replace(/[@.]/g, '');
       const mailData = {
         from : localStorage.getItem('email'),
         to : toMail,
         title : subject.current.value,
         message : editorState.getCurrentContent().getPlainText(),
         isRead: false
       }
       try{
        const res = await fetch(`https://reactmailbox-7a108-default-rtdb.firebaseio.com/${senderEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers : {
            'Content-Type':'application/json'
        }
        })
        if(sendEmail !== recieverMail){
          await fetch(`https://reactmailbox-7a108-default-rtdb.firebaseio.com/${recieverMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers : {
            'Content-Type':'application/json'
        }
        })
        }
        const data = await res.json();
        dispatch(mailActions.add({id: data.name, ...mailData}));
        console.log(data.name);
       }catch(error){
        console.log(error.message)
    }

       to.current.value = '';
       subject.current.value = '';
       setEditorState(null)
     }

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
            if(!data[key].isRead && data[key].to === email){
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
    setInterval(()=>fetchMails(), 2000)
    
     }, [dispatch,replaceEmail, changed, email]);


    return (
        <Fragment>
        <div className='containers'>
          <Sidebar />
  
          <form className='form' onSubmit={sendEmail}>
            <div>
              <label htmlFor="to">To:</label>
              <br />
              <input type="text" id="to" placeholder="Enter Reciever's Email" ref={to}/>
            </div>
            <div>
              <label htmlFor="subject">Subject:</label>
              <br />
              <input type="text" id="subject" placeholder="Enter The Subject" ref={subject}/>
            </div>
            <div className='footer'>
            <div className='editing'>
            <Editor
              editorState={editorState}
              onEditorStateChange={editorHandler}
              />
          </div>
          </div>
          <div className='sendbtn'>
            <button className='sendButton'>send</button>
          </div>
          </form>
        </div>
      </Fragment>
    )
}

export default MailHome;