import React from 'react';
import { Redirect } from 'react-router-dom';

export const logOut = (cache) => {
  localStorage.clear()
  cache.writeData({ data: { isLoggedIn: false }})
  return (
    <Redirect to="/signin" />
  )
}
