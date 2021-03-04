import React from 'react';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className={style.Footer}>
            <h5> Follow Us </h5>
            <ul>
                <li>
                    <Link href="#"> Twitter </Link>
                </li>
                <li>
                    <Link href="#"> Facebook </Link>
                </li>
                <li>
                    <Link href="#"> Instagram </Link>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
