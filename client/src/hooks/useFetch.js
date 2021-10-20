import { useAsyncFn } from 'react-use';
import { useEffect, useState } from 'react';

export const useFetch = () => {
  const [send, setSend] = useState({});
  const [data, fetchData] = useAsyncFn(
    async (url, type = 'GET', body = null) => {
      const content = body
        ? {
            method: type,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            body: body,
          }
        : {
            method: type,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          };

      const response = await fetch(url, content)
        .then((result) => result.json())
        .catch((error) => error);
      return response;
    }
  );
  useEffect(() => {
    if (send.url) {
      fetchData(send.url, send.type, send.body);
    }
  }, [send]);

  return [data, setSend];
};
