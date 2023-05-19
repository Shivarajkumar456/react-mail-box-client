import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mailActions } from '../../store/Mail';
import Sidebar from '../Header/Sidebar';

const MailContent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mails = useSelector((state) => state.mail.mailData);
    const email = localStorage.getItem("email");
    const inboxMail = mails.filter(mail => mail.to === email);
    const pageMail = inboxMail.filter(mail => mail.id === id);
    const mailid = email.replace(/[@ .]/g, '');

    useEffect(()=>{
    const readTrue = async () => {
        try {
            const res = await fetch(`https://reactmailbox-7a108-default-rtdb.firebaseio.com/${mailid}/${id}.json`, {
                method: "PUT",
                body: JSON.stringify({ ...pageMail[0], isRead : true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(mailActions.editMail({pageMail:pageMail}));
            } else {
                throw data.error
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    readTrue();
},[mailid, pageMail,dispatch,id])    
    return <>
        <div className='containers'>
            <Sidebar />
            <div>
                <p>From: {pageMail[0].from}</p>
                <p>Title: {pageMail[0].title}</p>
                <p>Maessage: {pageMail[0].message}</p>
            </div>
        </div>
        
    </>
}

export default MailContent;