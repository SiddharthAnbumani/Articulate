import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState('sardonic'); // Default word
  const [query, setQuery] = useState('sardonic'); // Separate query state
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
        setData(response.data);
      } catch (err) {
        setError("Word not found. Try another word!");
      }
      setLoading(false);
    };

    fetchData();
  }, [query]); 

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-extrabold text-blue-700 mb-5">Articulate</h1>
      
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Try ..." 
          className="w-full; p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button 
          onClick={() => setQuery(word)} 
          disabled={loading} 
          className="ml-3 px-5 py-3 bg-indigo-500 text-white rounded-lg transition duration-300 hover:bg-fuchsia-500 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && <p className="text-center mt-5 text-lg text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-5 text-lg">{error}</p>}
      
      {data && !error && (
        <div className="text-center mt-5 bg-white p-5 rounded-lg shadow-lg w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800">{data[0]?.word}</h2>
          <p className="text-gray-500 italic">{data[0]?.phonetic}</p>
          <h3 className="text-lg font-medium mt-2 text-gray-700">Definition:</h3>
          <p className="text-lg text-gray-800">{data[0]?.meanings[0]?.definitions[0]?.definition}</p>
        </div>
      )}
    </div>
  );
}
