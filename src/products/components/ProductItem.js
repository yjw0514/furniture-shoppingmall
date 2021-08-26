import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import Modal from '../../shared/UIElement/Modal';
import './ProductItem.css';

export default function ProductItem(props) {
  // const classes = useStyles();

  const { currentUser } = useAuth();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const addCartHandler = () => {
    console.log('d');
    if (!currentUser) {
      openModal();
    } else {
      const newProduct = {
        productId: props.id,
        productName: props.name,
        category: props.category,
        quantity: 1,
        price: props.price,
        image: props.image,
        isChecked: false,
      };
      const cartRef = dbService.doc(`/cart/${currentUser.uid}`);
      console.log(currentUser.uid);
      cartRef.get().then((doc) => {
        if (!doc.exists) {
          dbService.doc(`/cart/${currentUser.uid}`).set({
            products: [newProduct],
          });
        } else {
          dbService
            .doc(`/cart/${currentUser.uid}`)
            .get()
            .then((doc) => {
              let newProducts = [];
              newProducts = doc.data().products;

              const sameIndex = doc
                .data()
                .products.findIndex(
                  (e) => e.productId === newProduct.productId
                );

              if (sameIndex >= 0) {
                newProducts[sameIndex].quantity++;
                cartRef.update({ products: newProducts });
              } else {
                newProducts.push(newProduct);
                cartRef.update({ products: newProducts });
              }
            })
            .then((result) => {
              props.handleClick();
            })
            .catch((err) => console.log(err));
        }
      });
    }
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
          <button className='cart_btn' onClick={addCartHandler}>
            <span>ADD TO CART</span>
          </button>
        </div>
      </li>
    </>
  );
}
