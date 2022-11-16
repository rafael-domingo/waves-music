import React from 'react';
import { playAudio } from '../util';

const LibrarySong = ({ song, setCurrentSong, songs, audioRef, isPlaying, setSongs }) => {
    const songSelectHandler = () => {        
        setCurrentSong(song);
        // Add Active State
        const newSongs = songs.map((sng) => {
            if (sng.id === song.id) {
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
        playAudio(isPlaying, audioRef);
        
    }
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt='album-cover' src={song.cover} />    
            <div className="song-description">    
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
       
        </div>
    )
}

export default LibrarySong;