import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import styles from "../Home/Home.module.css";
import { useLoaderData, Link } from "react-router-dom";
import { contextAutoriz, contextHistory } from "../../components/Layout/Layout";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
    const { enter } = useContext(contextAutoriz);
    const { setHistory } = useContext(contextHistory);

    const { popular, nowPlaying } = useLoaderData();

    // Передаём ВЕСЬ массив, без slice
    const films = popular.films;
    const nowPlay = nowPlaying.items;

    const addHistoryNew = (film) => {
        setHistory(prev => ([...prev, {
            filmId: film.kinopoiskId,
            poster: film.posterUrlPreview,
            rating: film.ratingKinopoisk || film.rating,
            name: film.nameRu,
            age: film.age ? parseInt(film.age.replace("age", "")) : null,
            timestamp: new Date().toISOString(),
            displayDate: new Date().toLocaleDateString(),
            displayTime: new Date().toLocaleTimeString()
        }]));
    };

    const addHistoryTop = (film) => {
        setHistory(prev => ([...prev, {
            filmId: film.filmId,
            poster: film.posterUrlPreview,
            rating: film.rating,
            name: film.nameRu,
            age: film.age ? parseInt(film.age.replace("age", "")) : null,
            timestamp: new Date().toISOString(),
            displayDate: new Date().toLocaleDateString(),
            displayTime: new Date().toLocaleTimeString()
        }]));
    };

    return (
        <>
            <div className={styles["home-container"]}>
                <h1 className={styles["h1"]}>Найди своё кино!</h1>
                <p>Лучшие фильмы и сериалы онлайн</p>
            </div>

            {/* Блок "Скоро на экранах" (афиша) */}
            <div className={styles["linkblock"]}>
                <div className={styles["sectionHeader"]}>
                    <h2 className={styles["sectionTitle"]}>🎬 Скоро на экранах</h2>
                    <Link to="/now-playing" className={styles["link"]}>Смотреть всю Афишу →</Link>
                </div>
                <Swiper 
                    className={styles["blockContainer"]} 
                    spaceBetween={20} 
                    slidesPerView={5} 
                    modules={[Navigation]} 
                    navigation
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 15 },
                        640: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        1280: { slidesPerView: 5, spaceBetween: 25 }
                    }}
                >
                    {nowPlay.map(film => (
                        <SwiperSlide key={film.kinopoiskId} className={styles["popular"]}>
                            <Link to={`/movieCard/${film.kinopoiskId}`} onClick={() => enter && addHistoryNew(film)}>
                                <div className={styles["rating"]}>{film.ratingKinopoisk || film.rating}</div>
                                <img src={film.posterUrlPreview} alt={film.nameRu} />
                                <p>{film.nameRu}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Блок "Топ-19 лучших фильмов" (популярное) */}
            <div className={styles["linkblock"]}>
                <div className={styles["sectionHeader"]}>
                    <h2 className={styles["sectionTitle"]}>⭐ Топ-19 лучших фильмов</h2>
                    <Link to="/movie/2" className={styles["link"]}>Смотреть все фильмы →</Link>
                </div>
                <Swiper 
                    className={styles["blockContainer"]} 
                    spaceBetween={20} 
                    slidesPerView={5} 
                    modules={[Navigation]} 
                    navigation
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 15 },
                        640: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        1280: { slidesPerView: 5, spaceBetween: 25 }
                    }}
                >
                    {films.map(film => (
                        <SwiperSlide key={film.filmId} className={styles["popular"]}>
                            <Link to={`/movieCard/${film.filmId}`} onClick={() => enter && addHistoryTop(film)}>
                                <div className={styles["rating"]}>{film.rating}</div>
                                <img src={film.posterUrlPreview} alt={film.nameRu} />
                                <p>{film.nameRu}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}