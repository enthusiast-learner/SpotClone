import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

// create the object of the context and set it to PlayerContext
// later it used with useContext() to access music player logic anywhere in the app--inside any component
export const PlayerContext = createContext();

// all components in the contextProvider will have access to the playerContext
const PlayerContextProvider = (props) => {
  // useRef : react hook
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  //intializing the first song from songsData {0} as default track
  // by default track[id] = 0
  const [track, setTrack] = useState(songsData[0]);

  //to track whether the song is playing or pause
  const [playStatus, setPlayStatus] = useState(false);

  // stores the current time and total time of song
  // stores time in min:sec format
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totaltime: { second: 0, minute: 0 },
  });

  //   function for play and pause the song

  const play = () => {
    // when we intilalize useRef we set value as -  0
    //  accesses the audio tag via audioRef
    // set intial value in -->current

    audioRef.current.play();
    // when play the song - change the status
    setPlayStatus(true);
    // console.log("playStatus:", playStatus);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
    // console.log("playStatus:", playStatus);
  };

  //  end pause and play function //

  // play specific track by id
  const PlaywithId = async (id) => {
    // setting the new track (setTrack) using songs id from songsData[id]
    await setTrack(songsData[id]);

    // playing the song
    await audioRef.current.play();
    // change the status
    setPlayStatus(true);
  };

  // Previous and Next Track Functions

  const previous = async () => {
    // check if we are not on the first track
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Same logic but moves forward to the next song
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // user clicks on custom seek bar to jump to specific point in the song

  // evet object {e} passed when u click on seekBar
  const seekSong = async (e) => {
    // console.log("eventse:",e);
    
    //  nativeEvent.offsetX -> clicked position
    //  current.offsetWidth -> total bar width
    //  audioRef.current.duration -> total song duration 

    // asssign calculated value to = audioRef.current.currentTime
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  // Effect runs when track changes & plays new song
  // autoplay when track changes
  useEffect(() => {
    if (track) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  }, [track]); // Dependency: track updates

  useEffect(() => {
    setTimeout(() => {
      //when player time change this function executed
      audioRef.current.ontimeupdate = () => {

        // sets the width of seek bar according to how much song played
        // and update ui width acccordingly
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";

        //increasing time with song playtime
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

  // collects all state values,functions,refs related to player
  // share with other components using PlayerContext
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
    seekSong,
  };

  // return the context provider 
  return (
    // A Provider – to wrap components and supply data.
    <PlayerContext.Provider value={contextValue}>
      {/* It wraps your app's child components (like the player UI, song list, album display, etc.). 
     * It provides shared state and functions (like play/pause, track, seek info)
       to all nested components via context.*/}
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
