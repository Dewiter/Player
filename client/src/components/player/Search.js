import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import Button from './Inputs/Button';
import { useAsyncFn } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

const Search = ({ notifHandler, player, playerHandler }) => {
  const [link, setLink] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState({});

  // ---------------------------------------------------------------------------//
  // Fetches suggestions triggered by on change from input                      //
  // ---------------------------------------------------------------------------//
  const [suggestionState, fetchSuggestions] = useAsyncFn(async (suggestion) => {
    setLink(suggestion);
    const url = `${process.env.REACT_APP_BACK_END_PORT}youtube/suggestions/${suggestion}`;
    if (suggestion) {
      // const response = await fetch(url, {
      //   headers: { 'Access-Control-Allow-Origin': '*' },
      // })
      //   .then((result) => {
      //     return result.json();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      return useFetch(url);
    }
  });

  // ---------------------------------------------------------------------------//
  // Fetches song based on either selected or first suggestion                  //
  // ---------------------------------------------------------------------------//
  const [data, fetchData] = useAsyncFn(async (e) => {
    e.preventDefault();
    // const btn = e.target.childNodes[1];
    // const input = e.target.childNodes[0];
    if (suggestionState.value) {
      let send;
      if (selectedSuggestion) {
        send = selectedSuggestion;
      } else {
        send = suggestionState.value[0];
      }
      setLink(send.name);
      const encode = JSON.stringify(send);
      const url = `${process.env.REACT_APP_BACK_END_PORT}youtube/query/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: encode,
      })
        .then((result) => {
          return result.json();
        })
        .catch((err) => console.error(err));
      return response;
    } else {
      notifHandler({ type: 'EMPTY_INPUT' });
    }
  });

  // ---------------------------------------------------------------------------//
  // Adds song to queue                                                         //
  // ---------------------------------------------------------------------------//
  useEffect(() => {
    if (!data.loading) {
      console.log(data.value);
      // if (data.value.status === 200) {
      //   notifHandler({ type: 'ADD_SONG' });
      //   data.value.key = uuidv4();
      //   data.value.index = player.queue.length;
      //   if (player.queue.length === 0) {
      //     playerHandler({ type: 'INIT', payload: data.value.data[0] });
      //   } else {
      //     playerHandler({ type: 'UPDATE', payload: data.value.data[0] });
      //   }
      // }
    }
  }, [data.loading]);

  // ---------------------------------------------------------------------------//
  // Styling for suggestions                                                    //
  // ---------------------------------------------------------------------------//
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
    setSelectedSuggestion(res);
    setLink(res.name);
  };

  // ---------------------------------------------------------------------------//
  // Componenent                                                                //
  // ---------------------------------------------------------------------------//

  return (
    <div className='search-container'>
      <form className='query' onSubmit={(e) => fetchData(e)}>
        <input
          className='input-search input-search-not-active'
          type='text'
          id='sendLink'
          name='sendLink'
          placeholder='Search'
          value={link}
          onChange={(e) => fetchSuggestions(e.target.value)}
          autoComplete='off'
        />
        <Button content='search' customClass='btn-search' />
      </form>
      {suggestionState.loading ? (
        <div className='suggestions'>
          <div>loading...</div>
        </div>
      ) : suggestionState.error ? (
        <div>Error : {suggestionState.error}</div>
      ) : (
        <div className='suggestions'>
          {suggestionState.value?.map((res) => {
            return (
              <div key={uuidv4()} className='suggestion'>
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
      )}
    </div>
  );
};

export default Search;
