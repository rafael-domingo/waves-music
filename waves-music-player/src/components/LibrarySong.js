import React from 'react';


const LibrarySong = ({ song, setCurrentSong, songs, audioRef, isPlaying, setSongs }) => {
    const songSelectHandler = async () => {        
        await setCurrentSong(song);
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
        if (isPlaying) audioRef.current.play();
        
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