import React from 'react';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className={style.Footer}>
            <h5> Follow Us </h5>
            <ul>
                <li>
                    <Link to="#"> Twitter </Link>
                </li>
                <li>
                    <Link to="#"> Facebook </Link>
                </li>
                <li>
                    <Link to="#"> Instagram </Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
