import React, { useContext } from "react";
import Sidebar from "./components/sidebar";
import Player from "./components/player";
import Display from "./components/Display";
import { PlayerContext } from "./components/PlayerContext";

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    // h-screen : fill the screen
    //bg-black : black bg
    <div className="h-screen bg-black">
      {/* screen split into : 90% height for sidebbar and display */}

      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      {/* 10% height for player  */}
      <Player />
      {/* audioref is used to track play music  */}
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default App;
