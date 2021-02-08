// search song
const searchSong = async () => {
    const searchText = document.getElementById('searchField').value;
    
    const url = ` https://api.lyrics.ovh/suggest/${searchText}`;
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySongs(data.data))
    //     .catch(error => displayError('Something went wrong!'))
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch (error) {
        displayError('Something went wrong! Please try later.');
    }
}

// display songs
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onClick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.append(songDiv)
    });
}

// get lyric
const getLyric = async (artist, title) => {
   
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayLyrics(data.lyrics))
    try {
        const res = await fetch(url);
        const data = await res.json()
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Lyrics not found! Please try later.');
    }
}

// display lyrics
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

// display error
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}