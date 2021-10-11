import React, { useState } from 'react';

function App() {
  const [youtube, setYoutube] = useState('');
  const [isSent, setIsSent] = useState('');
  const sendLink = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/youtube/add-content/${
      youtube.split('=')[1]
    }`;
    fetch(url, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setIsSent(data.value);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section>
      <form action='' onSubmit={sendLink}>
        <label htmlFor='link'>send link</label>
        <input
          id='link'
          name='link'
          type='text'
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button>send</button>
      </form>
      <h1>{isSent}</h1>

      <button></button>
    </section>
  );
}

export default App;
