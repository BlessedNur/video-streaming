"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Sidebar from "@/components/Sidebar/Sidebar";
import Banner from "@/components/DetailsBanner/Banner";
import Navbar from "@/components/DetailsNavbar/Navbar";

function Page() {
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
    genre,
    setGenre,
    searchValue,
    setSearchValue,
    selectedMovie,
    setSelectedMovie,
  ] = useContext(movieContext);

  const movieListRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollAllDown, setShowScrollAllDown] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = movieListRef.current.scrollTop;
      setShowScrollDown(scrollPosition < 1);
      setShowScrollAllDown(scrollPosition < 50);
    };

    if (movieListRef.current) {
      movieListRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (movieListRef.current) {
        movieListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  function convertRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  useEffect(() => {
    setLoading(true); // Set loading state to true when selectedMovie changes
  }, [selectedMovie]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  
  return (
    <>
      {selectedMovie.length === 0 ? (
        <h1>Nothing here</h1>
      ) : (
        <section className={`${style.main} `}>
          <Sidebar />
          <Navbar />
          <div
            className={`${style.contentsDisplay} ${
              lightMode ? "mainLight" : ""
            }`}
          >
            <Banner bannerWidth={"100%"} />
            <div className={style.layer}>
              <div
                className={`${style.lists} ${lightMode ? style.lineDark : ""} ${
                  style.lineThree
                } ${style.lineTwo} ${
                  !showScrollDown ? style.lineTwoShow : style.lineTwoHide
                } ${lightMode && style.lineTwoLight} ${
                  showScrollAllDown ? style.lineThreeShow : style.lineThreeHide
                }`}
              >
                <div
                  className={`${style.movieList} scroller ${
                    lightMode ? style.movieListLight : style.movieListDark
                  }`}
                  ref={movieListRef}
                >
                  <div className={style.intro}>
                    <div className={style.leftIntro}>
                      {/* <div className={style.image}>
                      </div> */}
                      <Image
                        src={selectedMovie.poster_path}
                        width={200}
                        height={200}
                        className={style.movieImage}
                      />
                    </div>
                    <div className={style.RightIntro}>
                      {selectedMovie.Logo[0] ? (
                        <div className={style.image}>
                          <Image
                            src={selectedMovie.Logo[0]}
                            width={200}
                            height={30}
                            className={style.ImageMovie}
                          />
                        </div>
                      ) : (
                        <h1>{selectedMovie.title || selectedMovie.name}</h1>
                      )}
                      <div className={style.genres}>
                        {selectedMovie.genreNames.map((name, index) => (
                          <p key={index}>{name} </p>
                        ))}
                      </div>
                      <div className={style.actions}>
                        <button>Watch</button>{" "}
                        <button
                          onClick={() =>
                            alert(`Added ${selectedMovie.title} to watchlist`)
                          }
                          className={lightMode ? style.contentLight : ""}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={style.overview}>
                    <div className="info">
                      <h3>{convertRuntime(selectedMovie.runtime)}</h3>
                      <h3>{selectedMovie.release_date.split("-")[0]}</h3>
                      <h3>PG 13</h3>
                    </div>
                    <div className={style.storyLine}>
                      <h1 style={{ fontSize: "20px" }}>Overview</h1>
                      <p>{selectedMovie.overview}</p>
                    </div>
                  </div>
                  <div
                    className={`${style.scrollDown} ${
                      !showScrollAllDown && style.hiddenScroller
                    }`}
                  >
                    <h3 style={{ color: lightMode && "#000" }}>Scroll Down</h3>
                    <i className={`fas fa-chevron-down ${style.scrollBtn}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;