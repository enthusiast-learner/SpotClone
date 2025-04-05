import React from "react";
import { useNavigate } from "react-router-dom";

// passing props {we want to use here in this file}
// these props coming from <Displayhome /> where we used albumitem.jsx

export const Albumitem = ({image, name, desc, id}) => {

  // navigate to another page {navigate with code not <link>}
    const navigate = useNavigate();

  return (
    // when someone click navigate to another page {album/1 ,album/2}
    <div onClick={()=>navigate( `/album/${id}`)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img className="rounded" src={image} alt=""></img>
      <p className="font-bold mt-2 mb-1">{name}</p>
     
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};
