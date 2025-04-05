import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import Displayalbum from "./Displayalbum";
import { albumsData } from "../assets/assets";

const Display = () => {
  // displayRef will give you direct access to the DOM element this component renders
  // its used here to change the bg color dyamically
  const displayRef = useRef();
  // uselocation give information about current route
  //  If the URL is /album/3, then location.pathname will be "/album/3"
  const location = useLocation();
  // this checks if the current path is for album
  // Returns true if the word "album" is in the path (like /album/2), otherwise false.
  const  isAlbum = location.pathname.includes("album");
  // If the current page is an album page, this gets the last character of the path (which you assume is the album ID).
  // Example: /album/2 → albumId = "2"
  // if its not an album page.albumID id empty String ""
  const albumId = isAlbum ? location.pathname.slice(-1) : "";

  // convert albumId into Number and uses it to fetch bg color from albumsData from assetsfile
  // create gradient bg
  const bgColor = albumsData[Number(albumId)].bgColor;
  // console.log("bgcolor:",bgColor)
  // console.log("Id:",albumId)
  // console.log("isalbum:" , isAlbum)
  // console.log( "location:",location);

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6  pt-2 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<Displayalbum />}></Route>
      </Routes>
    </div>
  );
};

export default Display;
