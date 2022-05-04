import React, {useEffect} from 'react';
import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const Logout = () => {
  const {user, setUser} = useContext(MediaContext);
  useEffect(() => {
    setUser(null);
    localStorage.clear();
  }, []);

  return <>{!user ? <Navigate to="/" /> : <div>Loading...</div>}</>;
};

export default Logout;
