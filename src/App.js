import React from 'react';
import {Container} from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import {MediaProvider} from './contexts/MediaContext';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Profile from './views/Profile';
import Single from './views/Single';
import {themeOptions} from './theme/themeOptions';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Upload from './views/Upload';
import MyFiles from './views/MyFiles';
import Modify from './views/Modify';
<<<<<<< HEAD
import MyFavorites from './views/Favorite';
=======
import Search from './views/Search';
import SearchResults from './views/SearchResults';
>>>>>>> 551c057d27beb31b1a53c81d584043bf49702f17

const theme = createTheme(themeOptions);

const App = () => {
  return (
    // eslint-disable-next-line no-undef
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Nav />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/single" element={<Single />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/myfiles" element={<MyFiles />} />
              <Route path="/modify" element={<Modify />} />
<<<<<<< HEAD
              <Route path="/myfavorites" element={<MyFavorites />} />
=======
              <Route path="/search" element={<Search />} />
              <Route path="/searchresults" element={<SearchResults />} />
>>>>>>> 551c057d27beb31b1a53c81d584043bf49702f17
            </Routes>
          </Container>
        </ThemeProvider>
      </MediaProvider>
    </Router>
  );
};

export default App;
