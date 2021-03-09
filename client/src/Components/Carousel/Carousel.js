import React from 'react';
import style from './Carousel.module.css';
import { Carousel as CarouselBootstrap } from 'react-bootstrap';
const Carousel = () => {
    return (
        <CarouselBootstrap className={style.Carousel} data-interval="10000">
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
                    src="./images/clinic-front.png"
                    alt="Clinic front"
                />

                {/* <CarouselBootstrap.Caption></CarouselBootstrap.Caption> */}
            </CarouselBootstrap.Item>
            <CarouselBootstrap.Item>
                <img
                    className="d-block w-100"
                    src="./images/op-room.png"
                    alt="op-room"
                />

                {/* <CarouselBootstrap.Caption></CarouselBootstrap.Caption> */}
            </CarouselBootstrap.Item>
        </CarouselBootstrap>
    );
};

export default Carousel;
