import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]); //play 0th song
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totaltime: { second: 0, minute: 0 },
  });

  //   function for play and pause the song

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
    console.log("playStatus:", playStatus);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
    console.log("playStatus:", playStatus);
  };

  //   end pause and play function

  const PlaywithId = async (id) => {
    await setTrack(songsData[id]);

    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async  ()=>{
    if(track.id > 0){
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const next = async  ()=>{
    if(track.id < songsData.length-1){
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const seekSong = async (e)=>{
    // console.log("eventse:",e);
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)* audioRef.current.duration);
  }

  // Effect runs when track changes & plays new song
  useEffect(() => {
    if (track) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  }, [100]); // Dependency: track updates

  useEffect(() => {
    setTimeout(() => {
      //when player time change this function excuted
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";

        //incrasing time with song playtime
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totaltime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    PlaywithId,
    previous,
    next,
    seekSong
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
