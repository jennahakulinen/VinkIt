import React from 'react';
import {FavoriteBorder} from '@mui/icons-material';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const HeartButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      startIcon={<FavoriteBorder />}
      onClick={() => {
        navigate('/myfavorites');
      }}
      style={{color: 'red'}}
    ></Button>
  );
};

export default HeartButton;

// {favorites.includes(i) ? (
//   <Favorite
//   onClick={() => addFavorite({ items, i})}
//   style={{color: 'red'}}
//   />
// ) : (
//   <FavoriteBorder
//     onClick={() => addFavorite({items, i})}
//     style={{color: 'red'}}
//     />
// )}
