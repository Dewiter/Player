import React, { useState, useEffect } from 'react';
import Button from './Inputs/Button';

const Search = ({ state, handler }) => {
  const [link, setLink] = useState('');
  const [data, setData] = useState({});

  const SendLink = async (e) => {
    e.preventDefault();

    const btn = e.target.childNodes[1];
    const input = e.target.childNodes[0];
    btn.classList.remove('btn-not-pressed');
    btn.classList.add('btn-pressed');
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

      btn.classList.remove('btn-pressed');
      btn.classList.add('btn-not-pressed');
      btn.disabled = false;
      input.disabled = false;
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
      <form className='query' onSubmit={SendLink}>
        <input
          className='input-search'
          type='text'
          id='sendLink'
          name='sendLink'
          placeholder='Search'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button content='search' />
      </form>
    </>
  );
};

export default Search;
