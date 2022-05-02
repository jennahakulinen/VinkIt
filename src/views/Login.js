import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Box, Button} from '@mui/material';
import Nav from '../components/Nav';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <Nav />
      {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: 2,
          mx: 2,
          padding: '0 1rem 0 1rem',
        }}
      >
        {' '}
        {toggle ? 'New user?' : 'Already have an account?'}
        <Button
          sx={{
            background: 'none',
            color: '#48A0B3',
            fontSize: '16px',
          }}
          type="submit"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? 'Register' : 'Login'}
        </Button>
        here!
      </Box>
    </>
  );
};

export default Login;
