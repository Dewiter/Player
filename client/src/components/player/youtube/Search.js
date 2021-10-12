import React, { useState } from 'react';

const Search = () => {
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
    <>
      <form action=''>
        <input className='input-search' type='text' placeholder='Search' />
        <button className='btn-search'>
          <i class='fas fa-search'></i>
        </button>
      </form>
    </>
  );
};

export default Search;
