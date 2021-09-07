import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import Modal from '../../shared/UIElement/Modal';
import Rating from '@material-ui/lab/Rating';
import './ProductItem.css';
import { addToCart } from '../../shared/util/addCart';
import CommentList from '../../users/pages/CommentList';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SnackBar from '../../shared/UIElement/SnackBar';

export default function ProductItem(props) {
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { currentUser } = useAuth();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const openRatingModal = () => {
    if (!currentUser) {
      return setLoginModalOpen(true);
    }
    setRatingModalOpen(true);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const closeRatingModal = () => {
    setRatingModalOpen(false);
  };

  const ratingSubmitHandler = (comment) => {
    props.addComment(props.id, props.name, value, comment);
    setRatingModalOpen(false);
  };

  const addCartHandler = () => {
    if (!currentUser) {
      openLoginModal();
    } else {
      addToCart(currentUser.uid, props, handleClick);
      handleClick();
    }
  };

  return (
    <>
      {ratingModalOpen && (
        <CommentList
          open={ratingModalOpen}
          handleClose={closeRatingModal}
          onReviewSubmit={ratingSubmitHandler}
          id={props.id}
        >
          <Rating
            name='simple-controlled'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </CommentList>
      )}

      <Modal
        open={loginModalOpen}
        close={closeLoginModal}
        header='Notice'
        footer={<button onClick={() => history.push('/auth')}>Log In</button>}
      >
        로그인이 필요합니다.
      </Modal>
      <li className='product_card'>
        <div className='img_wrap'>
          <img src={props.image} className='product_image' alt='product' />
        </div>
        <div className='product_content'>
          <div className='product_content-header'>
            <div className='span'>
              <div className='rating'>
                <Rating
                  name='read-only'
                  value={props.avgRating}
                  readOnly
                  size='small'
                />
              </div>
            </div>
            <p className='product_review' onClick={openRatingModal}>
              별점주기({props.reviewCount})
            </p>
          </div>
          <h3 className='product_name'>{props.name}</h3>
          <p className='product_price'>
            {props.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            원
          </p>
          <button className='cart_btn' onClick={addCartHandler}>
            <span>ADD TO CART</span>
          </button>
          <div className='basket_icon_btn'>
            <ShoppingBasketIcon
              className='basket_icon'
              onClick={addCartHandler}
              style={{ fontSize: '28px' }}
            />
          </div>
        </div>
      </li>
      <SnackBar open={open} close={handleClose}>
        <p style={{ wordBreak: 'keep-all' }}> 장바구니에 담았습니다. </p>
      </SnackBar>
    </>
  );
}
