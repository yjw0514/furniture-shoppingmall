import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { authService } from '../firebase';

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
      // user 전체를 저장하지 말고 필요한 부분만 추출해서 저장할것
      // if (user) {
      //   dbService
      //     .collection('users')
      //     .where('userId', '==', user.uid)
      //     .get()
      //     .then((data) =>
      //       setCurrentUser({ nickName: data.docs[0].id, userId: user.uid })
      //     )
      //     .catch((err) => console.log(err));
      //   setLoading(false);
      // }
      setCurrentUser(user);
      setLoading(false);
      // setCurrentUser(user);
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
