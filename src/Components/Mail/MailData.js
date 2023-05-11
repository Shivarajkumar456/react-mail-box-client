import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './MailData.css'

const MailData = (props) => {
const readMessageHandler = (event)=>{
    event.preventDefault();
    console.log('inbox mail clicked');
}

const deleteMailHandler = (event) => {
    event.preventDefault();
    console.log('inbox delete mail clicked');
}
  return <>
  <NavLink to={`/inbox/${props.mail.id}`}>
  <div className='list'>
    <div className='symbolTo' onClick={readMessageHandler}>
      {!props.isRead && <div className='circle' />}
      <div className='to'>{props.mail.from}</div>
    </div>
    <div className='subject'>{props.mail.title}</div>
    <div className='delete'>
      <button onClick={deleteMailHandler}>Delete</button>
    </div>
  </div>
  </NavLink>
</>
}

export default MailData;