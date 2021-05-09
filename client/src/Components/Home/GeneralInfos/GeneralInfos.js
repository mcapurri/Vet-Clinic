import React from 'react';
import style from './GeneralInfos.module.css';

const GeneralInfos = () => {
    return (
        <section className={style.Container}>
            <article className={style.Box}>
                <img src="/images/services.png" alt="services" />
                <h3> Services </h3>
                <p className="text">
                    {' '}
                    We offer a varied range of veterinary services for your pet.
                </p>
                <a className="link-btn" href="#GeneralInfos">
                    More{' '}
                </a>
            </article>

            <article className={style.Box}>
                <img src="/images/team.png" alt="team" />
                <h3> Team </h3>
                <p className="text">
                    {' '}
                    Find out more about our talented experts.{' '}
                </p>
                <a className="link-btn" href="#More">
                    More{' '}
                </a>
            </article>

            <article className={style.Box}>
                <img src="/images/news.png" alt="news" />
                <h3> News </h3>
                <p className="text">
                    {' '}
                    Be always up to date with our latest news & promotions.{' '}
                </p>
                <a className="link-btn" href="#More">
                    {' '}
                    More{' '}
                </a>
            </article>
        </section>
    );
};

export default GeneralInfos;
