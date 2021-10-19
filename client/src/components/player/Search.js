import React, { useState, useEffect } from 'react';
import Button from './Inputs/Button';
const { v4: uuidv4 } = require('uuid');

const Search = ({ notifHandler, player, playerHandler }) => {
  const [link, setLink] = useState('');
  const [data, setData] = useState({});
  const [suggestionApi, setSuggestionApi] = useState([]);
  const [suggestion, setSuggestion] = useState({});

  const SendSong = async (e) => {
    e.preventDefault();

    const btn = e.target.childNodes[1];
    const input = e.target.childNodes[0];
    btn.disabled = true;
    input.disabled = true;

    if (suggestionApi.length > 0) {
      let send;
      if (suggestion) {
        send = suggestion;
      } else {
        send = suggestionApi[0];
      }
      setLink(send.name);
      const encode = JSON.stringify(send);
      const url = 'http://localhost:5000/youtube/query/';
      fetch(url, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: encode,
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

  const getSuggestions = async (e) => {
    setLink(e.target.value);
    const url = `http://localhost:5000/youtube/suggestions/${e.target.value}`;
    if (e.target.value) {
      const response = await fetch(url, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
        .then((result) => {
          return result.json();
        })
        .then((resultParsed) => {
          return resultParsed;
        })
        .catch((err) => {
          console.log(err);
        });
      if (response) {
        setSuggestionApi(response);
      }
    }
  };

  useEffect(() => {
    if (data) {
      if (data.status === 200) {
        notifHandler({ type: 'ADD_SONG' });
        data.key = uuidv4();
        data.index = player.queue.length;
        if (player.queue.length === 0) {
          playerHandler({ type: 'INIT', payload: data.data[0] });
        } else {
          playerHandler({ type: 'UPDATE', payload: data.data[0] });
        }
      }
    }
  }, [data]);

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

  const displayChange = (res) => {
    setSuggestion(res);
    setLink(res.name);
  };

  return (
    <div className='search-container'>
      <form className='query' onSubmit={(e) => SendSong(e)}>
        <input
          className='input-search input-search-not-active'
          type='text'
          id='sendLink'
          name='sendLink'
          placeholder='Search'
          value={link}
          onChange={(e) => getSuggestions(e)}
          autoComplete='off'
        />
        <Button content='search' customClass='btn-search' />
      </form>
      <div className='suggestions'>
        {link &&
          suggestionApi.map((res) => {
            return (
              <div className='suggestion'>
                <p>{res.name}</p>
                <Button
                  content='plus-circle'
                  customClass='btn-suggestion'
                  onclick={() => displayChange(res)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
