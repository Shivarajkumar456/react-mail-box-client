import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mailActions } from '../../store/Mail';
import Sidebar from '../Header/Sidebar';

const MailContent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mails = useSelector((state) => state.mail.mailData);
    const count = useSelector((state) => state.mail.count);
    const email = localStorage.getItem("email");
    const inboxMail = mails.filter(mail => mail.to === email);
    const pageMail = inboxMail.filter(mail => mail.id === id);
    const mailid = email.replace(/[@ .]/g, '');

    const readTrue = async () => {
        try {
            const res = await fetch(`https://mail-box-8893a-default-rtdb.firebaseio.com/${mailid}/${pageMail.id}.json`, {
                method: "PUT",
                body: JSON.stringify({ ...pageMail, isRead : true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(mailActions.editMail());
            } else {
                throw data.error
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    readTrue();
    return <>
        <div className='containers'>
            <Sidebar />
            {console.log(pageMail, count)}
        </div>
        
    </>
}

export default MailContent;