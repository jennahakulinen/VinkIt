import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Box, Button} from '@mui/material';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
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
        New user?
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
        Here!
      </Box>
    </>
  );
};

export default Login;
