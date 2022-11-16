import React from 'react';

const LibrarySong = ({ song, setCurrentSong, songs }) => {
    const songSelectHandler = () => {        
        setCurrentSong(song);
    }
    return (
        <div onClick={songSelectHandler} className='library-song'>
            <img alt='album-cover' src={song.cover} />    
            <div className="song-description">    
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
       
        </div>
    )
}

export default LibrarySong;