import React from 'react';
import style from './Carousel.module.css';
import { Carousel as CarouselBootstrap } from 'react-bootstrap';
const Carousel = () => {
    return (
        <CarouselBootstrap className={style.Carousel}>
            <CarouselBootstrap.Item>
                <img
                    className="d-block w-100"
                    src="../../utils/images/pets.png"
                    alt="Pets"
                />
                <CarouselBootstrap.Caption>
                    <h3>First slide label</h3>
                    <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                    </p>
                </CarouselBootstrap.Caption>
            </CarouselBootstrap.Item>
            <CarouselBootstrap.Item>
                <img
                    className="d-block w-100"
                    src="../../utils/images/clinic-front.png"
                    alt="Clinic front"
                />

                <CarouselBootstrap.Caption>
                    <h3>Second slide label</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </CarouselBootstrap.Caption>
            </CarouselBootstrap.Item>
            <CarouselBootstrap.Item>
                <img
                    className="d-block w-100"
                    src="../../utils/images/op-room.png"
                    alt="op-room"
                />

                <CarouselBootstrap.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                    </p>
                </CarouselBootstrap.Caption>
            </CarouselBootstrap.Item>
        </CarouselBootstrap>
    );
};

export default Carousel;
