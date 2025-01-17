import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./Homepage.module.css";
import { movieContext } from "@/context/Context";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Recommended from "../Recommended/Recommended";
import Trending from "../Trending/Trending";
import TopRated from "../TopRated/Toprated";
import Upcoming from "../Upcoming/Upcoming";
import dynamic from "next/dynamic";
import Sidebar from "../Sidebar/Sidebar";
import SideContent from "../SideContent/SideContent";
import useMediaQuery from "../UseMediaQuery";
import Navigation from "../Navigation/Navigation";

function HomePage() {
  const [lightMode, setLightMode] = useContext(movieContext);
  const movieListRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const mobile = useMediaQuery("(max-width:500px)");
  
  const [showScrollAllDown, setShowScrollAllDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = movieListRef.current.scrollTop;
      setShowScrollDown(scrollPosition < 1);
      setShowScrollAllDown(scrollPosition < 50);
      console.log(scrollPosition);
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

  return (
    <main className={`${style.main} `}>
      <Sidebar />
      <Navbar />
      <div
        className={`${style.contentsDisplay} ${lightMode ? "mainLight" : ""}`}
      >
        <div
          className={`${style.lists} ${lightMode ? style.lineDark : ""} ${
            style.lineThree
          } ${style.lineTwo} ${
            !showScrollDown ? style.lineTwoShow : style.lineTwoHide
          } ${lightMode && style.lineTwoLight} ${
            showScrollAllDown ? style.lineThreeShow : style.lineThreeHide
          }`}
        >
          <div className={style.layer} ref={movieListRef}>
            <Banner bannerWidth={"100%"} BannerApi={`/myapi/movie`} />
            <div
              className={`${style.movieLit} scroller ${
                lightMode ? style.movieListLight : style.movieListDark
              }`}
            >
              <div
                className={`${style.scrollDown} ${
                  !showScrollAllDown && style.hiddenScroller
                }`}
              >
                <h3 style={{ color: lightMode && "#000" }}>Scroll Down</h3>
                <i className={`fas fa-chevron-down ${style.scrollBtn}`}></i>
              </div>

              <Upcoming
                title={"Latest Movies & Tv Shows"}
                length={5}
                api={`/myapi/movie`}
              />
              <Recommended
                title={"Recommended Movies & Tv Shows"}
                length={18}
                seeAllTypes={"See All"}
                api={`/myapi/movie`}
              />
              <Trending
                title={"Trending Movies & Tv Shows"}
                length={16}
                api={`/myapi/movie`}
              />
              <TopRated
                title={"Popular Movies & Tv Shows"}
                length={15}
                api={`/myapi/movie`}
              />
            </div>
            {mobile && <SideContent />}
          </div>
        </div>
        {!mobile && <SideContent />}
      </div>
      {mobile && <Navigation />}
    </main>
  );
}

export default HomePage;
