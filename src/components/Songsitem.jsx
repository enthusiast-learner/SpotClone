import React, { useContext } from "react";
import { PlayerContext } from "./PlayerContext";
import { songsData } from "../assets/assets";

// passing props
// It receives props from the DisplayHome component:name,image,desc,id
const Songsitem = ({ name, image, desc, id }) => {
  // console.log("songdetail:",songsData)

  // this line says:{hey react ,give me the {PlaywithId} function from PlayerContext}
  // this function plays song with given id
  const { PlaywithId } = useContext(PlayerContext);
  return (
    // when click :  plays song with given id
    <div
      onClick={() => PlaywithId(id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default Songsitem;
