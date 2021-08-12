import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Auth.css';
import { useAuth } from '../../context/auth-context';
import { Card } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { signup, login } = useAuth();

  const toggleAuthHandler = () => {
    setIsLoginMode((prev) => !prev);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isLoginMode) {
      if (inputs.password !== inputs.passwordConfirm) {
        return setError('비밀번호가 다릅니다');
      }
      //회원가입
      try {
        setLoading(true);
        setError('');
        await signup(inputs.email, inputs.password);
      } catch (error) {
        setError('회원가입 실패 최소 6자리 입력해주세요');
      }
      setLoading(false);
    } else {
      //로그인
      try {
        setError('');
        setLoading(true);
        await login(inputs.email, inputs.password);
        history.push('/');
      } catch (error) {
        setError('존재하지 않는 아이디이거나 비밀번호가 틀립니다');
      }
      setLoading(false);
    }
  };
  return (
    <>
      <Card className='auth__container'>
        <h2 className='auth__title'>{isLoginMode ? '로그인' : '회원가입'}</h2>
        <form onSubmit={submitHandler}>
          <div className='form__control'>
            <TextField
              name='email'
              label='Email'
              size='medium'
              fullWidth={true}
              onChange={changeHandler}
            />
          </div>
          <div className='form__control'>
            <TextField
              type='password'
              name='password'
              label='Password'
              size='medium'
              fullWidth={true}
              onChange={changeHandler}
            />
          </div>
          {!isLoginMode && (
            <div className='form__control'>
              <TextField
                id='standard-basic'
                type='password'
                name='passwordConfirm'
                label='Password Confirm'
                size='medium'
                fullWidth={true}
                onChange={changeHandler}
              />
            </div>
          )}
          {error && <Alert severity='error'>{error}</Alert>}
          <div className='form__control-btn'>
            <Button
              variant='contained'
              color='primary'
              style={{ marginBottom: '20px', height: 50 }}
              fullWidth
              type='submit'
              disabled={loading}
            >
              {isLoginMode ? 'Log in' : 'Sign up'}
            </Button>
          </div>
        </form>
        <p>
          {isLoginMode ? "don't have an account?" : 'Already have an account?'}
          <span className='authMode-btn' onClick={toggleAuthHandler}>
            {isLoginMode ? 'Sign up' : ' Log in'}
          </span>
        </p>
      </Card>
    </>
  );
};

export default Auth;
