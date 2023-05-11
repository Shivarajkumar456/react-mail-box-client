import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './Sidebar.css';

const Sidebar = ()=>{
    const count = useSelector((state) => state.mail.count);
    return <div className='sidebar'>
          <div className='sideContent'>
          <NavLink to="/compose" className='none' activeClassName='active'> <div className='content'>Compose</div></NavLink>
          <NavLink to="/inbox" className='none' activeClassName='active'><div className='content'>Inbox{count>0 ?<sup id='unread'>{count}</sup>:''}</div></NavLink>
          <NavLink to="/sent" className='none' activeClassName='active'> <div className='content'>Sent</div></NavLink>
           </div>
          </div>
}

export default Sidebar;