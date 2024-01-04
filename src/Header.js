// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import reactLogo from './logo.svg';
import './header.css';

const Header = () => {
  return (
    <header className="fixed-header">
      <nav>
        <ul className='react-ul'>
          <Link to='/' className='links-in-navbar'>
            <li className='react-li'><img src={reactLogo} alt='react-logo' style={{ height: '45px' }} /></li>
            <li className='react-li'><h3 id='heading-react'>React Play Store</h3></li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
