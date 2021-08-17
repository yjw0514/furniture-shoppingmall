import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Auth.css';
import { useAuth } from '../../context/auth-context';
import { Card } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { dbService } from '../../firebase';

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signup, login } = useAuth();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickName: '',
  });

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
        const result = await dbService.doc(`/users/${inputs.nickName}`).get();

        if (result.exists) {
          setLoading(false);
          return setError('이미 사용중인 닉네임입니다');
        }
        const data = await signup(inputs.email, inputs.password);
        console.log(data);
        const userId = data.user.uid;
        const newUser = {
          userId,
          email: inputs.email,
          imageUrl: '',
          nickName: inputs.nickName,
        };
        dbService.doc(`/users/${newUser.nickName}`).set(newUser);
        setLoading(false);
        history.push('/');
      } catch (error) {
        const errorMsg = error.message;
        setError(errorMsg);
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
    <div className='auth'>
      <Card
        className='auth__container'
        style={isLoginMode ? { height: 400 } : { height: 600 }}
      >
        <h2 className='auth__title'>{isLoginMode ? '로그인' : '회원가입'}</h2>
        <form onSubmit={submitHandler}>
          <div className='auth-form__control'>
            <TextField
              name='email'
              label='Email'
              size='medium'
              fullWidth={true}
              onChange={changeHandler}
            />
          </div>
          <div className='auth-form__control'>
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
            <div className='auth-form__control'>
              <TextField
                type='password'
                name='passwordConfirm'
                label='Password Confirm'
                size='medium'
                fullWidth={true}
                onChange={changeHandler}
              />
            </div>
          )}
          {!isLoginMode && (
            <div className='auth-form__control'>
              <TextField
                type='text'
                name='nickName'
                label='NickName'
                size='medium'
                fullWidth={true}
                onChange={changeHandler}
              />
            </div>
          )}
          {error && <Alert severity='error'>{error}</Alert>}
          <div className='auth-form__control-btn'>
            <Button
              variant='contained'
              color='primary'
              style={{ marginBottom: '20px', height: 50, width: '100%' }}
              fullWidth
              type='submit'
              disabled={loading}
            >
              {isLoginMode ? 'Log in' : 'Sign up'}
            </Button>
            <p>
              {isLoginMode
                ? "don't have an account?"
                : 'Already have an account?'}
              <span className='authMode-btn' onClick={toggleAuthHandler}>
                {isLoginMode ? 'Sign up' : ' Log in'}
              </span>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
