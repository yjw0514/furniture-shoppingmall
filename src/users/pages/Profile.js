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
  const [cartNum, setCartNum] = useState(0);
  const [buyNum, setBuyNum] = useState(0);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      dbService
        .collection('users')
        .where('userId', '==', currentUser.uid)
        .limit(1)
        .onSnapshot((sanpshot) => {
          setUser(sanpshot.docs[0].data());

          setLoading(false);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    const cartRef = dbService.collection('cart').doc(currentUser.uid);

    cartRef.get().then((doc) => {
      const cartNum = doc.data().products.length;
      setCartNum(cartNum);
    });
  }, [currentUser.uid]);

  useEffect(() => {
    const buyRef = dbService.collection('buy').doc(currentUser.uid);

    buyRef.get().then((doc) => {
      const buyNum = doc.data().itemsWithDate.length;
      setBuyNum(buyNum);
    });
  }, [currentUser.uid]);

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
    <section className='profile-wrap'>
      {loading && <CircularProgress />}
      {!loading && user && (
        <div className='user-profile'>
          <div className='user-image'>
            <img src={user.imageUrl} alt='userAvatar' />
          </div>
          <div className='user-info'>
            <div className='user-info__header'>
              <p className='user-nickName'>{user.nickName}</p>

              <button
                className='image__btn'
                onClick={() => fileInput.current.click()}
              >
                프로필사진
              </button>
            </div>
            <div className='user-info__products'>
              <div className='user-purchase__num'>
                <span>구매내역</span>
                <span>{buyNum}</span>
              </div>
              <div className='user-cart__num'>
                <span>장바구니</span>
                <span>{cartNum}</span>
              </div>
            </div>
            <p className='user-email'>{user.email}</p>
          </div>
          <div className='filebox'>
            <input
              type='file'
              onChange={handleChange}
              ref={fileInput}
              required
            />
          </div>
        </div>
      )}
    </section>
  );
}
