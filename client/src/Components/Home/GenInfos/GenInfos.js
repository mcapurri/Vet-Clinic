import React from 'react';
import style from './GenInfos.module.css';

const GenInfos = () => {
    return (
        <section className={style.Container}>
            <article className={style.Box}>
                <img src="/images/services.png" alt="services" />
                <h3> Services </h3>
                <p className="text"> Check out our at home sevices </p>
                <a className="link-btn" href="#">
                    More{' '}
                </a>
            </article>

            <article className={style.Box}>
                <img src="/images/team.png" alt="team" />
                <h3> Team </h3>
                <p className="text">
                    {' '}
                    Find out more about our specialized team.{' '}
                </p>
                <a className="link-btn" href="#">
                    More{' '}
                </a>
            </article>

            <article className={style.Box}>
                <img src="/images/news.png" alt="news" />
                <h3> News </h3>
                <p className="text"> All the news about pets. </p>
                <a className="link-btn" href="#">
                    {' '}
                    More{' '}
                </a>
            </article>
        </section>
    );
};

export default GenInfos;
