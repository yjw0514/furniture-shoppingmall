import React, { useEffect, useState } from 'react';

import Modal from '../../shared/UIElement/Modal';
import Rating from '@material-ui/lab/Rating';

import { useAuth } from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import { dbService } from '../../firebase';
import './CategoryItem.css';

export default function CategoryItem(props) {
  const [value, setValue] = useState(0);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const history = useHistory();

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

  const openRatingModal = () => {
    if (!currentUser) {
      return setLoginModalOpen(true);
    }
    setRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setRatingModalOpen(false);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const ratingSubmitHandler = () => {
    const productDocument = dbService.doc(`/product/${props.id}`);
    const ratingDocument = dbService
      .collection('rating')
      .where('productId', '==', props.id)
      .where('userId', '==', currentUser.uid)
      .limit(1);

    const rateValue = value;

    let prevTotalScore;
    let prevScore;
    let productData;

    productDocument
      .get()
      .then((doc) => {
        productData = doc.data();
        prevTotalScore = productData.rateScore;
        return ratingDocument.get();
      })
      .then((data) => {
        //유저가 별점을 주지않은 제품
        if (data.empty) {
          console.log('처음 별점주는 제품');
          return dbService
            .collection('rating')
            .doc(`${props.name}_${user.nickName}`)
            .set({
              userId: currentUser.uid,
              productId: props.id,
              rateValue,
            })
            .then(() => {
              productData.scoreCount++;
              productData.rateScore = prevTotalScore + rateValue;
              return productDocument.update({
                rateScore: productData.rateScore,
                scoreCount: productData.scoreCount,
                avgRating: productData.rateScore / productData.scoreCount,
              });
            });
        } else {
          //유저가 이미 별점을 부여한 제품
          console.log('이미별점있는 제품');
          ratingDocument
            .get()
            .then((data) => {
              prevScore = data.docs[0].data().rateValue;
            })
            .then(() => {
              return dbService
                .collection('rating')
                .doc(`${props.name}_${user.nickName}`)
                .set({
                  userId: currentUser.uid,
                  productId: props.id,
                  rateValue,
                });
            })
            .then(() => {
              productData.rateScore = prevTotalScore - prevScore + rateValue;
              return productDocument.update({
                rateScore: productData.rateScore,
                avgRating: productData.rateScore / productData.scoreCount,
              });
            });
        }
      });

    setRatingModalOpen(false);
  };

  const addCartHandler = () => {
    if (!currentUser) {
      setLoginModalOpen(true);
    } else {
    }
  };

  const onAuthRedirect = (e) => {
    history.push('/auth');
  };

  return (
    <>
      <Modal
        open={ratingModalOpen}
        close={closeRatingModal}
        header='제품에 만족하셨나요?'
        mainClass='rating__main'
        footer={<button onClick={ratingSubmitHandler}>submit</button>}
      >
        <Rating
          name='simple-controlled'
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Modal>
      <Modal
        open={loginModalOpen}
        close={closeLoginModal}
        header='로그인이 필요합니다'
        mainClass='rating__main'
        footer={<button onClick={onAuthRedirect}>confirm</button>}
      >
        {'로그인 페이지로 이동하시겠습니까?'}
      </Modal>
      <li className='category_card'>
        <div className='img_wrap'>
          <img src={props.image} className='product_image' alt='productImg' />
        </div>
        <div className='product_content'>
          <div className='product_content-header'>
            <div className='span'>
              <div className='rating'>
                <Rating name='read-only' value={props.avgRating} readOnly />
              </div>
            </div>
            <p className='product_review' onClick={openRatingModal}>
              별점주기({props.reviewCount})
            </p>
          </div>
          <h3 className='product_name'>
            {props.name.length > 10
              ? `${props.name.slice(0, 11)}..`
              : props.name}
          </h3>

          <p className='product_price'>
            {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </p>
          <button className='category-cart_btn' onClick={addCartHandler}>
            <span>ADD TO CART</span>
          </button>
        </div>
      </li>
    </>
  );
}
