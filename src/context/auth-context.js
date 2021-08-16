import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { authService, dbService } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return authService.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return authService.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return authService.signOut();
  }

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}
