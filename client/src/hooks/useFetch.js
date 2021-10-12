import React, { useState, useEffect } from 'react';

export const useFetch = ({ url }) => {
  const [data, setData] = useState({});

  const getData = async (url) => {
    const response = await fetch(url, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).catch((err) => console.error(err));
    await setData(response.json());
  };

  useEffect(() => {
    getData(url);
  }, [url]);

  return data;
};
