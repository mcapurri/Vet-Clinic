import React from 'react';
import style from './LandingSection.module.css';
const LandingSection = () => {
    return (
        <div className={style.Container}>
            <div className={style.Title}>
                <h1>
                    <b>Your Vet Clinic.</b>{' '}
                </h1>
                <p>
                    <small>
                        <b>We care about pets and owners</b>{' '}
                    </small>{' '}
                </p>
            </div>
            <div>
                <img src="./images/medicine.svg" />
            </div>
        </div>
    );
};

export default LandingSection;
