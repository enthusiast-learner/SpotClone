import React, { useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "./PlayerContext";

const Displayalbum = () => {

  // useParams() :-> reat rounter hook that grabs parameter from url
  //  const { id } = useParams(); : this line gets the albumid from url 
  const { id } = useParams();
  // console.log(id);
  // albumsData[] is an array having album info
  // We're using id as the index to grab the right album info (name, desc, image, etc.)..
  // store album info into albumData
  const albumData = albumsData[id];
  // console.log(albumData);

  // accessing global {PlaywithId} function to start song when clicked
  const { PlaywithId } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md-items-end">
        {/* getting info from albumData and show on ui */}
        <img className="w-48 rounded" src={albumData.image} alt=""></img>
        <div className="flex flex-col">
          <p>PlayList</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl ">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt=""
            />
            <b>Spotify</b>• 1,323,154 likes • <b>50 Songs,</b>
            about 2 hrs 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4 ">#</b> Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr></hr>
      {/* songsData is an array of object from assets 
      having all song info */}
      {/* item : song items in songData array
      index: unique key - current song playing -song id-0,1,2... (id) */}
      {/* mapping on songsData array and showing it on ui */}
      {songsData.map((item, index) => (
        // playing when click on song 
        <div
          onClick={() => PlaywithId(item.id)} 
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap- p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-poiter"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline mr-5 w-10" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px] ">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default Displayalbum;
