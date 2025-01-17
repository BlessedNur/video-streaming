"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import { movieContext } from "@/context/Context";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Banner/Banner";
import Upcoming from "@/components/Upcoming/Upcoming";
import Recommended from "@/components/Recommended/Recommended";
import Trending from "@/components/Trending/Trending";
import TopRated from "@/components/TopRated/Toprated";
import useMediaQuery from "@/components/UseMediaQuery";
import Navigation from "@/components/Navigation/Navigation";

function HomePage() {
  const [lightMode, setLightMode] = useContext(movieContext);
  const movieListRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollAllDown, setShowScrollAllDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = movieListRef.current.scrollTop;
      setShowScrollDown(scrollPosition < 1);
      setShowScrollAllDown(scrollPosition < 300);
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
  const mobile = useMediaQuery("(max-width:500px)");
  return (
    <main className={`${style.main} `}>
      <Sidebar />
      <Navbar />
      <div
        className={`${style.contentsDisplay} ${lightMode ? "mainLight" : ""}`}
      >
        <div
          className={`${style.movieList} scroller ${
            lightMode ? style.movieListLight : style.movieListDark
          }`}
        >
          <div
            ref={movieListRef}
            className={`${style.lists} ${lightMode ? style.lineDark : ""} ${
              style.lineThree
            } ${style.lineTwo} ${
              !showScrollDown ? style.lineTwoShow : style.lineTwoHide
            } ${lightMode && style.lineTwoLight} ${
              showScrollAllDown ? style.lineThreeShow : style.lineThreeHide
            }`}
          >
            <Banner bannerWidth={"100%"} BannerApi={`/myapi/movie`} />
            <div
              className={`${style.scrollDown} ${
                !showScrollAllDown && style.hiddenScroller
              }`}
            >
              <h3 style={{ color: lightMode && "#000" }}>Scroll Down</h3>
              <i className={`fas fa-chevron-down ${style.scrollBtn}`}></i>
            </div>

            <Upcoming
              title={"Latest Movies"}
              length={15}
              api={`/myapi/movie`}
            />
            <Recommended
              title={"Recommended Movies"}
              length={15}
              seeAllTypes={"See All Movies"}
              api={`/myapi/movie`}
            />
            <Trending
              title={"Trending Movies"}
              length={15}
              api={`/myapi/movie`}
            />
            <TopRated
              title={"Popular Movies"}
              length={5}
              api={`/myapi/movie`}
            />
          </div>
        </div>
      </div>
      {mobile && <Navigation />}
    </main>
  );
}

export default HomePage;
