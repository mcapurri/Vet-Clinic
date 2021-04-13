import React from 'react';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={style.Footer}>
            <h5> Follow Us </h5>
            <ul>
                <li>
                    <Link to="#">
                        <img
                            style={{ width: '2rem' }}
                            src="/images/twitter-logo.png"
                            alt="twitter-logo"
                        />{' '}
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        {' '}
                        <img
                            style={{ width: '2rem' }}
                            src="/images/facebook-logo.png"
                            alt="facebook-logo"
                        />{' '}
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        {' '}
                        <img
                            style={{ width: '2rem' }}
                            src="/images/instagram-logo.png"
                            alt="instagram-logo"
                        />{' '}
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
