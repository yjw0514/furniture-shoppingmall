import { Button, Card, Container } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { dbService, storage } from '../../firebase';

import CircularProgress from '@material-ui/core/CircularProgress';

import './Profile.css';

export default function Profile() {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);
  console.log(image);
  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      dbService
        .collection('users')
        .where('userId', '==', currentUser.uid)
        .limit(1)
        .onSnapshot((sanpshot) => {
          console.log('snapshot listening...');
          setUser(sanpshot.docs[0].data());
          console.log(sanpshot.docs[0].data());
          setLoading(false);
        });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image) {
      setImage(image);
    }

    setLoading(true);
    const uploadImage = storage.ref(`images/avatar/${image.name}`).put(image);
    uploadImage.on(
      'state_change',
      null,
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref('images/avatar/')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            dbService
              .collection('users')
              .doc(user.nickName)
              .update({ imageUrl: url });
            setLoading(false);
          })
          .then(() => {});
      }
    );
  };

  return (
    <div>
      {loading && <CircularProgress />}
      {!loading && user && (
        <Container maxWidth='md' style={{ height: '80vh' }}>
          <Card
            style={{ maxWidth: '450px', marginTop: '150px', padding: '10px' }}
          >
            <div className='user-container'>
              <div className='user__avatar'>
                <img src={user.imageUrl} alt='userAvatar' />
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
              <Button
                className='button'
                variant='contained'
                color='primary'
                onClick={() => fileInput.current.click()}
              >
                프로필사진 변경
              </Button>
            </div>
          </Card>
          <div className='filebox'>
            <input
              type='file'
              onChange={handleChange}
              ref={fileInput}
              required
            />
          </div>
        </Container>
      )}
    </div>
  );
}
