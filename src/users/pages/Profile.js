import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

export default function Profile() {
  const { logout } = useAuth();
  const history = useHistory();
  const logoutHandler = () => {
    logout();
    history.push('/auth');
  };
  return (
    <div>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
}
