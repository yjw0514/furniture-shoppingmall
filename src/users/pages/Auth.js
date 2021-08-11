import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Auth.css';

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleAuthHandler = () => {
    setIsLoginMode((prev) => !prev);
  };
  console.log(isLoginMode);
  return (
    <>
      <div className='auth__container'>
        <h2 className='auth__title'>{isLoginMode ? '로그인' : '회원가입'}</h2>
        <form>
          <div className='form__control'>
            <TextField
              id='standard-basic'
              label='Email'
              size='medium'
              fullWidth={true}
            />
          </div>
          <div className='form__control'>
            <TextField
              id='standard-basic'
              label='Password'
              size='medium'
              fullWidth={true}
            />
          </div>
          <Button
            variant='contained'
            color='primary'
            style={{ marginBottom: '20px' }}
          >
            {isLoginMode ? 'Log in' : 'Sign up'}
          </Button>
        </form>
        <p>
          don't have an account?
          <span className='authMode-btn' onClick={toggleAuthHandler}>
            {isLoginMode ? 'Sign up' : ' Log in'}
          </span>
        </p>
      </div>
    </>
  );
};

export default Auth;
