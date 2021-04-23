import React from 'react';
import style from './Carousel.module.css';
import { Carousel as CarouselBootstrap } from 'react-bootstrap';
const Carousel = () => {
    return (
        <div className={style.CarouselContainer}>
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
                        src="./images/clinic-front.jpg"
                        alt="Clinic front"
                    />

                    {/* <CarouselBootstrap.Caption></CarouselBootstrap.Caption> */}
                </CarouselBootstrap.Item>
                <CarouselBootstrap.Item className={style.Fade}>
                    <img
                        className="d-block w-100"
                        src="./images/op-room.jpg"
                        alt="op-room"
                    />

                    {/* <CarouselBootstrap.Caption></CarouselBootstrap.Caption> */}
                </CarouselBootstrap.Item>
            </CarouselBootstrap>
        </div>
    );
};

export default Carousel;
