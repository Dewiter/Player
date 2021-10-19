import React, { useState, useEffect } from 'react';
import Button from './Inputs/Button';
import Suggestions from './Suggestions';
const { v4: uuidv4 } = require('uuid');

const Search = ({ notifHandler, player, playerHandler }) => {
  const [link, setLink] = useState('');
  const [data, setData] = useState({});
  const [sugg, setSugg] = useState(initialState);

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

  const submitSuggestion = (e, sugg) => {
    e.prevent.default();
    console.log(sugg);
  };

  useEffect(() => {
    if (link) {
      document
        .querySelector('.input-search')
        .classList.remove('input-search-not-active');
      document
        .querySelector('.input-search')
        .classList.add('input-search-active');
    } else {
      document
        .querySelector('.input-search')
        .classList.remove('input-search-active');
      document
        .querySelector('.input-search')
        .classList.add('input-search-not-active');
    }
  }, [link]);

  return (
    <div className='search-container'>
      <form className='query'>
        <input
          className='input-search input-search-not-active'
          type='text'
          id='sendLink'
          name='sendLink'
          placeholder='Search'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          autoComplete='off'
        />
        {link && (
          <Suggestions
            value={link}
            submitSuggestion={(e) => submitSuggestion(e, sugg)}
          />
        )}
        <Button content='search' customClass='btn-search' />
      </form>
    </div>
  );
};

export default Search;
