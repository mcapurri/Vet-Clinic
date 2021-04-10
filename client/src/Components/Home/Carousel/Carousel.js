import React from 'react';
import style from './Carousel.module.css';
import { Carousel as CarouselBootstrap } from 'react-bootstrap';
const Carousel = () => {
    return (
        <div className={style.CarouselContainer}>
            <CarouselBootstrap data-interval="5000">
                <CarouselBootstrap.Item>
                    <img
                        className="d-block w-100"
                        src="./images/pets.png"
                        alt="Pets"
                    />
                    {/* <CarouselBootstrap.Caption></CarouselBootstrap.Caption> */}
                </CarouselBootstrap.Item>
                <CarouselBootstrap.Item>
                    <img
                        className="d-block w-100"
                        src="./images/clinic-front.jpg"
                        alt="Clinic front"
                    />

                    {/* <CarouselBootstrap.Caption></CarouselBootstrap.Caption> */}
                </CarouselBootstrap.Item>
                <CarouselBootstrap.Item>
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
