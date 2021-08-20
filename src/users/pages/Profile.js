import { Button, Card, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';

import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      dbService
        .collection('users')
        .where('userId', '==', currentUser.uid)
        .limit(1)
        .get()
        .then((data) => {
          setUser(data.docs[0].data());
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  return (
    <div>
      {user && (
        <>
          <Container maxWidth='md' style={{ height: '80vh' }}>
            <Card
              style={{ maxWidth: '450px', marginTop: '150px', padding: '10px' }}
            >
              <div className='user-container'>
                <div className='user__avatar'>
                  <img src={user.imageUrl} alt='' />
                </div>
                <div className='user-info'>
                  <div className='user-nickName'>
                    <p>Nickname</p>
                    <p>{user.nickName}</p>
                  </div>
                  <div className='user-email'>
                    <p>Email</p>
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
              <div className='editBtn'>
                <Button className='button' variant='contained' color='primary'>
                  프로필사진 변경
                </Button>
              </div>
            </Card>
          </Container>
        </>
      )}
    </div>
  );
}
