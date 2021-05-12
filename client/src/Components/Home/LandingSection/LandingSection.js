import React from 'react';
import style from './LandingSection.module.css';
import { Container, Jumbotron } from 'react-bootstrap';
const LandingSection = () => {
    return (
        <div className={style.Container}>
            <Jumbotron fluid>
                <Container className={style.JumboContainer}>
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
                    <div className={style.ImgContainer}>
                        <img src="./images/medicine.svg" alt="vets-img" />
                    </div>
                </Container>
            </Jumbotron>
        </div>
    );
};

export default LandingSection;
