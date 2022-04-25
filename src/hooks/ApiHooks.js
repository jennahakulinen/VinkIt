import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {appID, baseUrl} from '../utils/variables';

const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.message;
      throw new Error(message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const useMedia = (showAllFiles, userId, favorites, token) => {
  const {update} = useContext(MediaContext);
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMedia = async () => {
    try {
      setLoading(true);
      let media = await useTag().getTag(appID);
      if (favorites) {
        const favorites = await useFavourite().getFavourite(token);
        media = media.filter((file) => {
          for (const favorite of favorites) {
            if (favorite.file_id === file.file_id) {
              return file;
            }
          }
        });
      }
      // jos !showAllFiles, filteröi kirjautuneen
      // käyttäjän tiedostot media taulukkoon
      if (!showAllFiles) {
        media = media.filter((file) => file.user_id === userId);
      }

      const allFiles = await Promise.all(
        media.map(async (file) => {
          return await fetchJson(`${baseUrl}media/${file.file_id}`);
        })
      );

      setMediaArray(allFiles);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
  }, [userId, update]);

  const postMedia = async (formdata, token) => {
    try {
      setLoading(true);
      const fetchOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: formdata,
      };
      return await fetchJson(baseUrl + 'media', fetchOptions);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (fileId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'media/' + fileId, fetchOptions);
  };

  const putMedia = async (fileId, data, token) => {
    try {
      setLoading(true);
      const fetchOptions = {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return await fetchJson(baseUrl + 'media/' + fileId, fetchOptions);
    } finally {
      setLoading(false);
    }
  };
  return {
    mediaArray,
    postMedia,
    deleteMedia,
    putMedia,
    loading,
  };
};

const useUser = () => {
  const getUser = async (token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'users/user', fetchOptions);
  };

  const getUsername = async (username) => {
    const checkUser = await fetchJson(baseUrl + 'users/username/' + username);
    return checkUser.available;
  };

  const getUserById = async (userId, token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'users/' + userId, fetchOptions);
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'users', fetchOptions);
  };

  return {getUser, postUser, getUsername, getUserById};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'login', fetchOptions);
  };
  return {postLogin};
};

const useTag = () => {
  const getTag = async (tag) => {
    const tagResult = await fetchJson(baseUrl + 'tags/' + tag);
    if (tagResult.length > 0) {
      return tagResult;
    } else {
      throw new Error('No results');
    }
  };

  const getFileTags = async (fileId) => {
    const tagResult = await fetchJson(baseUrl + 'tags/file/' + fileId);
    if (tagResult.length > 0) {
      const filteredCategories = [tagResult[1]];
      return filteredCategories;
    } else {
      throw new Error('No results');
    }
  };

  const postTag = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchJson(baseUrl + 'tags', fetchOptions);
  };
  return {getTag, getFileTags, postTag};
};

const useComment = () => {
  const getComment = async (fileId) => {
    const commentResult = await fetchJson(baseUrl + 'comments/file/' + fileId);
    if (commentResult.length > 0) {
      return commentResult;
    } else {
      throw new Error('No results');
    }
  };

  const postComment = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchJson(baseUrl + 'comments', fetchOptions);
  };

  const deleteComment = async (commentId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'comments/' + commentId, fetchOptions);
  };

  return {getComment, postComment, deleteComment};
};

const useFavourite = () => {
  const getFavourite = async (token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    const favoriteResult = await fetchJson(
      baseUrl + 'favourites/',
      fetchOptions
    );
    if (favoriteResult.length > 0) {
      return favoriteResult;
    } else {
      throw new Error('No results');
    }
  };
  const addFavorite = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchJson(baseUrl + 'favourites/', fetchOptions);
  };

  const deleteFavourite = async (fileId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'favourites/' + fileId, fetchOptions);
  };
  return {getFavourite, addFavorite, deleteFavourite};
};

const useSearch = () => {
  const postResults = async (search, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(search),
    };
    return await fetchJson(baseUrl + 'media/search', fetchOptions);
  };
  return {postResults};
};

export {
  useMedia,
  useLogin,
  useUser,
  useTag,
  useComment,
  useFavourite,
  useSearch,
};
