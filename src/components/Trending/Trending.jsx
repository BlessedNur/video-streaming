import React, { useEffect, useState } from "react";
import style from "./Trending.module.css";
import Image from "next/image";

function Trending({ title, api }) {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchtrendingMovies = async () => {
      try {
        const response = await fetch(`${api}`);
        const data = await response.json();
        setTrendingMovies(data.results.slice(10, 15));
      } catch (error) {
        console.error("Error fetching Trending movies:", error);
      }
    };

    fetchtrendingMovies();
  }, []);

  return (
    <div className={style.line}>
      <div className={style.header}>
        <h2>{title}</h2>
        <div className={style.seeAll}>
          <p>See All</p>
          <i
            class="fa fa-chevron-right"
            style={{ fontSize: "10px" }}
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div className={style.movieList}>
        <div className={style.movies}>
          {trendingMovies.map((movie) => (
            <div
              className={style.movieBox}
              key={movie.id}
              onClick={() => alert(`this is ${movie.title}`)}
            >
              <div className={style.thumbnail}>
                <Image
                  src={`https://Image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={`Poster for ${movie.title}`}
                  width={200}
                  height={100}
                  className={style.movieImage}
                />
                <div class={style.playing}>
                  <div className={style.video}>
                    <i
                      className={`fa fa-play ${style.player}`}
                      aria-hidden="true"
                    ></i>
                    <div className={style.round}></div>
                  </div>
                  <div class={`${style.waves} ${style.waveOne}`}></div>
                  <div class={`${style.waves} ${style.waveTwo}`}></div>
                  <div class={`${style.waves} ${style.waveThree}`}></div>
                </div>
              </div>
              <h1>{movie.title}</h1>
              <div className={style.rates}>
                <i class="fa fa-star" aria-hidden="true"></i>
                <p style={{ fontWeight: "600" }}>
                  {movie.vote_average != 0
                    ? (movie.vote_average / 2).toFixed(1)
                    : "Not rated"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Trending;