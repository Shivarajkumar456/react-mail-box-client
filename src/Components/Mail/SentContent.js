import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../Header/Sidebar';
import './Content.css';

const SentContent = () => {
    const { id } = useParams();
    const mails = useSelector((state) => state.mail.mailData);
    const email = localStorage.getItem("email");
    const sentMail = mails.filter(mail => mail.from === email);
    const pageMail = sentMail.filter(mail => mail.id === id);
    
    return <>
        <div className='containers'>
            <Sidebar />
            <div className='mailContent'>
                <p>To: {pageMail[0].to}</p>
                <p>Title: {pageMail[0].title}</p>
                <p>Maessage: {pageMail[0].message}</p>
            </div>
        </div>
        
    </>
}

export default SentContent;