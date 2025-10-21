import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const genres = ['pop', 'rock', 'hip-hop', 'jazz', 'electronic', 'indie', 'r&b', 'country', 'reggae'];

  const fetchSong = async (genreIndex = 0) => {
    setLoading(true);
    setError(null);
    try {
      const randomGenre = genres[genreIndex];
      // Add random offset to ensure different tracks each time (max 1000 results)
      const randomOffset = Math.floor(Math.random() * 40); // Offset up to 40 (Deezer total limit ~1000)
      const response = await fetch(`/api/search?q=${randomGenre}&limit=25&index=${randomOffset}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data); // Debug: Check console
      if (data.data && data.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const track = data.data[randomIndex];
        setSong({
          strTrack: track.title,
          strArtist: track.artist.name,
          strAlbum: track.album.title,
          intYear: track.album.release_date ? track.album.release_date.split('-')[0] : 'Unknown',
          strTrackThumb: track.album.cover_big || 'https://via.placeholder.com/500x500?text=No+Artwork'
        });
      } else if (genreIndex < genres.length - 1) {
        fetchSong(genreIndex + 1);
      } else {
        throw new Error('No tracks available for any genres');
      }
    } catch (error) {
      console.error('Error fetching song:', error);
      setError(error.message || 'Failed to fetch song. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400"></div>
      </div>
    );
  }

  if (error || !song) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-900 to-black p-4">
        <p className="text-lg font-semibold mb-4">{error || 'No song available. Try again later.'}</p>
        <button
          onClick={() => fetchSong()}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-bold transition-colors duration-200 shadow-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black p-4">
      <div className="max-w-md w-full bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden relative fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-lg"
          style={{ backgroundImage: `url(${song.strTrackThumb || 'https://via.placeholder.com/500x500?text=No+Artwork'})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 to-gray-900/80"></div>

        <div className="relative p-6 text-center text-white">
          <img
            src={song.strTrackThumb || 'https://via.placeholder.com/300x300?text=No+Artwork'}
            alt={`${song.strTrack} artwork`}
            className="w-72 h-72 mx-auto rounded-xl shadow-2xl object-cover border-4 border-purple-800/50 mb-6"
          />
          <h1 className="text-4xl font-bold mb-3 truncate tracking-tight">{song.strTrack}</h1>
          <p className="text-xl text-gray-200 mb-4 font-medium">by {song.strArtist}</p>
          <p className="text-lg text-gray-300 mb-2">Album: {song.strAlbum || 'Single'}</p>
          <p className="text-lg text-gray-300 mb-6">Released: {song.intYear || 'Unknown'}</p>
          <button
            onClick={() => fetchSong()}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full text-white font-bold transition-colors duration-200 shadow-lg"
          >
            New Song
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;