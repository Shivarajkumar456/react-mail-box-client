import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './MailData.css'

const MailData = (props) => {
  const email = localStorage.getItem("email");
  const mailid = email.replace(/[@.]/g, '');
  const fromName = props.mail.from.split('@')[0];
  const toName = props.mail.to.split('@')[0];


const deleteMailHandler = async () => {
    console.log('inbox delete mail clicked');
    try {
      const res = await fetch(`https://reactmailbox-7a108-default-rtdb.firebaseio.com/${mailid}/${props.mail.id}.json`, {
          method: "Delete",
      });
      const data = await res.json();
      console.log(data);
  } catch (error) {
      console.log(error.message);
  }
}

if(props.toFrom === 'from'){
  return <><div className='heading'>
  <h1>Inbox</h1>
</div>
<div className='list'>
<NavLink to={`/inbox/${props.mail.id}`} className={'textDec'}>
  <div className='symbolTo'>
    {!props.isRead && <div className='circle' />}
    <div className='to'>From: {fromName}</div>
    <div className='subject'>{props.mail.title}</div>
  </div>
  </NavLink>
  <div className='delete'>
    <button onClick={deleteMailHandler}>Delete</button>
  </div>
</div></>
}else if(props.toFrom === 'to') {
  return <>
  <div className='list'>
  <NavLink to={`/sent/${props.mail.id}`} className={'textDec'}>
    <div className='symbolTo'>
      <div className='to'>To: {toName}</div>
      <div className='subject'>{props.mail.title}</div>
    </div>
    </NavLink>
    <div className='delete'>
      <button onClick={deleteMailHandler}>Delete</button>
    </div>
  </div></>
}
}

export default MailData;