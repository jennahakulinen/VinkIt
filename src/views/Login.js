import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@mui/material';
import Nav from '../components/Nav';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <Nav />
      {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}
      OR
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? 'Register' : 'Login'}
      </Button>
    </>
  );
};

export default Login;
