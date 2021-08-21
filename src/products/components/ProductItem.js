import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { addCartHandler } from '../../shared/util/addCart';
import Modal from '../../shared/UIElement/Modal';
import './ProductItem.css';

export default function ProductItem(props) {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onAddCart = () => {
    if (!currentUser) openModal();
    const newProduct = {
      productId: props.id,
      productName: props.name,
      category: props.category,
      quantity: 1,
      price: props.price,
      image: props.image,
      isChecked: false,
    };
    addCartHandler(newProduct, currentUser);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        close={closeModal}
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
          <p className='product_category'>{props.category}</p>
          <h3 className='product_name'>{props.name}</h3>
          <p className='product_price'>
            {props.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            원
          </p>
          <button className='cart_btn' onClick={onAddCart}>
            <span>ADD TO CART</span>
          </button>
        </div>
      </li>
    </>
  );
}
