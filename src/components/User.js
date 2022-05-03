import React, {useContext, useEffect} from 'react';
import {useUser} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import {useNavigate} from 'react-router-dom';
import {Box} from '@mui/material';

const UserInfo = () => {
  const {user, setUser} = useContext(MediaContext);
  const {getUser} = useUser();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await getUser(localStorage.getItem('token'));
      setUser(userData);
    } catch (err) {
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log('userdata', user);
  return <Box></Box>;
};

export default UserInfo;
