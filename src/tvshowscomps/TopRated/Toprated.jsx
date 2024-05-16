"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./TopRated.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

function TopRated({ title, api, length }) {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useRouter();

  const [
    lightMode,
    setLightMode,
    activeNavLink,
    setActiveNavLink,
    activeSideLink,
    setActiveSideLink,
    storedNavLink,
    setStoredNavLink,
    storedSideLink,
    setStoredSideLink,
    handleNavClick,
    handleSideClick,
    toggleLightMode,
    showProfile,
    setShowProfile,
    filteredType,
    setFilteredType,
    cat,
    setCat,
  ] = useContext(movieContext);
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(`${api}`);
        const data = await response.json();
        const filterMovies = data.filter(
          (movie) => (movie.vote_average / 2).toFixed(1) >= 4.2
        );
        setFilteredMovies(filterMovies);

        setTopRatedMovies([...data.slice(0, length)]);
      } catch (error) {
        console.error("Error fetching TopRated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, []);
  console.log(filteredMovies);
  return (
    <div className={style.line}>
      {filteredMovies.length === 0 ? (
        <SkeletonTheme
          baseColor={lightMode ? "#eee" : "#202020"}
          highlightColor={lightMode ? "#b2b5bd" : "#444"}
        >
          <div className={style.header}>
            <h2>
              <Skeleton width={200} height={20} borderRadius={5} />
            </h2>
            <div style={{ zIndex: "3" }} className={style.seeAll}>
              <p>
                <Skeleton width={100} height={20} borderRadius={5} />
              </p>
            </div>
          </div>
          <div className={style.movies}>
            <Skeleton width={199} height={100} borderRadius={7} />
            <Skeleton width={199} height={100} borderRadius={7} />
            <Skeleton width={199} height={100} borderRadius={7} />
            <Skeleton width={199} height={100} borderRadius={7} />
            <Skeleton width={199} height={100} borderRadius={7} />
            <Skeleton width={199} height={100} borderRadius={7} />
          </div>
        </SkeletonTheme>
      ) : (
        <>
          <div className={style.header}>
            <h2>{title}</h2>
            <div
              className={style.seeAll}
              onClick={() => {
                setFilteredType("Top Rated");
                setCat(1);
                navigate.push("/search");
              }}
            >
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
              {filteredMovies.map((movie) => (
                <div
                  className={style.movieBox}
                  key={movie.id}
                  onClick={() => {}}
                >
                  <div className={style.thumbnail}>
                    <Image
                      src={movie.backdrop_path}
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
                    <h2 className={style.movieBan}>
                      {movie.number_of_seasons > 1
                        ? `${movie.number_of_seasons} seasons`
                        : `${movie.number_of_seasons} season`}
                    </h2>
                  </div>
                  <h1>{movie.name}</h1>
                  <div className={style.rates}>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <p
                      style={{ fontWeight: "600", color: lightMode && "#fff" }}
                    >
                      {movie.vote_average != 0
                        ? (movie.vote_average / 2).toFixed(1)
                        : "Not rated"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopRated;

("https://api.themoviedb.org/3/movie/top_rated?api_key=0febce395055c78ab86a029443008afc");
