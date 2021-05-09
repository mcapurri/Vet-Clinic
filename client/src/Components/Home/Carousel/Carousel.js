import React from 'react';
import style from './Carousel.module.css';
import { Carousel as CarouselBootstrap } from 'react-bootstrap';
const Carousel = () => {
    return (
        <div className={style.Container}>
            <div className={style.Frame}>
                <CarouselBootstrap
                    interval={parseInt('20000')}
                    fade
                    indicators={false}
                    controls={false}
                >
                    {/* <CarouselBootstrap.Item className={style.Fade}>
                    <img
                        className="d-block w-100"
                        src="./images/pets.png"
                        alt="Pets"
                        style={{ height: '120%' }}
                    />
                </CarouselBootstrap.Item> */}
                    <CarouselBootstrap.Item className={style.Fade}>
                        <img
                            className="d-block w-100"
                            src="./images/clinic-front.png"
                            alt="Clinic front"
                            // style={{ minHeight: '22.7rem' }}
                        />
                    </CarouselBootstrap.Item>
                    <CarouselBootstrap.Item className={style.Fade}>
                        <img
                            className="d-block w-100"
                            src="./images/op-room.png"
                            alt="op-room"
                            // style={{ minWidth: '90vw' }}
                        />
                    </CarouselBootstrap.Item>
                </CarouselBootstrap>
            </div>
        </div>
    );
};

export default Carousel;
