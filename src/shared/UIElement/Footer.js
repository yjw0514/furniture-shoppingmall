import React from 'react';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import './Footer.css';
export default function Footer() {
  return (
    <footer className='footer'>
      <ul className='footer__icons'>
        <li className='icon-item'>
          <AccountCircleOutlinedIcon
            style={{ fontSize: 50, fontWeight: 'light' }}
          />
        </li>
        <li className='icon-item'>
          <AccountCircleOutlinedIcon
            style={{ fontSize: 50, fontWeight: 'light' }}
          />
        </li>
        <li className='icon-item'>
          <AccountCircleOutlinedIcon
            style={{ fontSize: 50, fontWeight: 'light' }}
          />
        </li>
        <li className='icon-item'>
          <AccountCircleOutlinedIcon
            style={{ fontSize: 50, fontWeight: 'light', color: 'lightgray' }}
          />
        </li>
      </ul>
      <ul className='footer__menu'>
        <li className='menu-item'>Home</li>
        <li className='menu-item'>Services</li>
        <li className='menu-item'>About</li>
        <li className='menu-item'>Terms</li>
        <li className='menu-item'>Privacy Policy</li>
      </ul>
      <div className='footer__name'>
        <p>Company Name c 2018</p>
      </div>
    </footer>
  );
}
