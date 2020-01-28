import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetch(fn) {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false
  });
  const [req, setReq] = useState();

  useEffect(() => {
    if (!req) return;
    setRes({
      data: null,
      pending: true,
      error: false,
      complete: false
    });
    axios(req)
      .then(res =>
        setRes({
          data: res.data,
          pending: false,
          complete: true,
          error: false
        })
      )
      .catch(() =>
        setRes({
          data: null,
          pending: false,
          error: true,
          complete: true
        })
      );
  }, [req]);

  return [res, (...args) => setReq(fn(...args))];
}
