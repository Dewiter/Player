import React, { useState, useEffect } from 'react';
import Button from './Inputs/Button';
const { v4: uuidv4 } = require('uuid');

const Search = ({ notifHandler, player, playerHandler }) => {
  const [link, setLink] = useState('');
  const [data, setData] = useState({});

  const SendLink = async (e) => {
    e.preventDefault();

    const btn = e.target.childNodes[1];
    const input = e.target.childNodes[0];
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
          setData(() => {
            return res;
          });
        })
        .catch((err) => console.error(err));

      btn.disabled = false;
      input.disabled = false;
      setLink('');
    } else {
      notifHandler({ type: 'EMPTY_INPUT' });
    }
  };

  useEffect(() => {
    if (link) {
      if (data?.status === '200') {
        notifHandler({ type: 'ADD_SONG' });
        data.key = uuidv4();
        data.index = player.queue.length;
        if (player.queue.length === 0) {
          playerHandler({ type: 'INIT', payload: data });
        } else {
          playerHandler({ type: 'UPDATE', payload: data });
        }
      } else {
        notifHandler({ type: 'BAD_LINK' });
      }
    }
  }, [data]);

  return (
    <div className='search-container'>
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
        <Button content='search' customClass='btn-search' />
      </form>
    </div>
  );
};

export default Search;
