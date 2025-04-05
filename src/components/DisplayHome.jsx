import React from "react";
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import { Albumitem } from "./Albumitem";
import { songsData } from "../assets/assets";
import Songsitem from "./Songsitem";

const DisplayHome = () => {
  // console.log("Songs Data:", songsData);
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        {/* overflow-x-auto : div is horizontally scrollable */}
        {/* flex :  makes the children (albums) appear in a row. */}
        <div className="flex overflow-x-auto">
          {/* albumsData and songsData : arrays of objects from assets file */}
          {/* item : you are looping through each item in albumsData */}
          {/* index : is the current position in array {0,1,2..}  : its a Key means unique value*/}
          {albumsData.map((item, index) => (
            // returning jsx file <AlbumItem/>
            // For each album, renders one <Albumitem />
            // Passes the album data into the component so it knows what to show
            <Albumitem
            // getting values from albumdata array and storing into below : key,name,desc,id,image
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
        <div className="flex overflow-auto scrollbar-hide">
          {/* mapping on songSData array of objects */}
          {/* index : current position in array : key - unique value */}
          {/* item : mapping on each item in songsData array */}
          {songsData.map((item, index) => (

          //  returning <Songsitem /> component
            <Songsitem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
