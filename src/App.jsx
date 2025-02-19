// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function App() {
//   const [data,setData] = useState(null)
//   const [loading,SetLoading] = useState(false)
//   const [word, setWord] = useState('hello')
//   const [error, setError] = useState('')

//   useEffect(()=>{
//     const fetchData = async()=>{
//       try{
//       const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/sardonic`)
//       setData(response)
//       console.log(Array.isArray(response.data));  // Should print 'true'
//       console.log(response.data.length);         // Should be greater than 0
//       }catch(err){
//         console.error("API Error:", err.response ? err.response.data : err.message);
//       }
//     }
//   })

//   return (
//     <>
//     <h1 className='text-6xl font-extrabold text-blue-700 text-center mt-3'>Articulate</h1>
//     <p>{response.data}</p>
//     </>
    
//   )
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState('sardonic'); // Default word
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        console.log("Is Array:", Array.isArray(response.data)); 
        console.log("Data Length:", response.data.length); 
        setData(response.data); 
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
        console.error("API Error:", err.response ? err.response.data : err.message);
      }
      setLoading(false);
    };

    fetchData(); // Call the function
  }, [word]); // Runs when 'word' changes

  return (
    <>
      <h1 className='text-6xl font-extrabold text-blue-700 text-center mt-3'>Articulate</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>} {/* Display data for debugging */}
    </>
  );
}
