import React from 'react';

export const useFetch = async (url, type = 'GET', body = null) => {
  const response = await fetch(url, {
    method: type,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: body,
  })
    .then((result) => result.json())
    .catch((error) => error);
  return response;
};
