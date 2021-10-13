import React, { useState, useEffect } from 'react';

const Search = ({ state, handler }) => {
  const [link, setLink] = useState('');
  const [data, setData] = useState({});

  const SendLink = async (e) => {
    e.preventDefault();

    const btn = e.target.childNodes[1];
    const input = e.target.childNodes[0];
    btn.classList.remove('btn-search');
    btn.classList.add('btn-submit');
    btn.disabled = true;
    input.disabled = true;

    //fetch data
    if (link) {
      const url = `http://localhost:5000/youtube/query/${link.split('=')[1]}`;
      await fetch(url, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          setData((prev) => {
            return res;
          });
        })
        .catch((err) => console.error(err));

      btn.classList.remove('btn-submit');
      btn.classList.add('btn-search');
      btn.disabled = false;
      input.disabled = true;
    } else {
      handler({ type: 'EMPTY_INPUT' });
    }
  };

  useEffect(() => {
    if (link) {
      if (data?.status === '200') {
        handler({
          type: 'ADD_SONG',
          payload: data,
        });
      } else {
        handler({
          type: 'BAD_LINK',
        });
      }
    }
  }, [data]);

  return (
    <>
      <form onSubmit={SendLink}>
        <input
          className='input-search'
          type='text'
          id='sendLink'
          name='sendLink'
          placeholder='Search'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button className='btn-search'>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </>
  );
};

export default Search;
