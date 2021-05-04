import React from 'react';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    // console.log('props', props);
    return (
        <footer className={style.Footer}>
            {!props.isEmployee && (
                <>
                    <div className={style.Socials}>
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
                        <h5> Follow Us </h5>
                    </div>
                    {props.width < '860' && (
                        <div className={style.Infos}>
                            <address className="address">
                                Animal Clinic <br /> Buschkrug Allee 206, <br />{' '}
                                12359 Berlin <br /> Germany <br />{' '}
                                <small>+49 157 00 00 00</small>
                            </address>
                        </div>
                    )}
                </>
            )}
        </footer>
    );
};

export default Footer;
