import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, timeUpdateHandler, songs, setCurrentSong, setSongs, songEndHandler }) => {            
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((sng) => {
            if (sng.id === nextPrev.id) {
                return {
                    ...sng,
                    active: true,
                }
            } else {
                return {
                    ...sng,
                    active: false
                }
            }
         })
        setSongs(newSongs);   
    }
    // Event handlers
    const playSongHandler = () => {        
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }        
    }

    const getTime = (time) => {
        // formats time 
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({
            ...songInfo,
            currentTime: e.target.value
        })
    }
    const skipTrackHandler = async (direction) => {
        
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (currentIndex < songs.length || currentIndex > 0) {
            if (direction === 'skip-forward') {
                currentIndex < songs.length - 1 && (await setCurrentSong(songs[currentIndex + 1]))     
                activeLibraryHandler(songs[currentIndex + 1]);
            } else if (direction === 'skip-backward') {
                currentIndex > 0 && (await setCurrentSong(songs[currentIndex - 1]))
                activeLibraryHandler(songs[currentIndex - 1]);
            }
        }        
        if (isPlaying) audioRef.current.play();
      
    }
    
    // Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
                    <input
                    min={0}
                    max={songInfo.duration || 0}
                    onChange={dragHandler}
                    value={songInfo.currentTime}
                        type="range" />
                    <div className="animate-track" style={trackAnim}></div>
                    </div>
                    <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
                    
                
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-backward')} className='skip-back' size='2x' icon={faAngleLeft} />                
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay} />                
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className='skip-forward' size='2x' icon={faAngleRight} />                
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    )
}

export default Player;