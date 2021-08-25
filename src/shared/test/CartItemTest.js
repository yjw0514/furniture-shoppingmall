import React from 'react';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import './CartItem.css';

export default function CartItem(props) {
  const { currentUser } = useAuth();

  const cartRef = dbService
    .doc(`/cart/${currentUser.uid}`)
    .collection('products')
    .doc(props.id);

  const deleteHandler = () => {
    cartRef.delete().catch((err) => console.log(err));
  };

  let productData;
  const minusHnadler = () => {
    cartRef.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        productData = doc.data();
        if (productData.products.quantity < 1) return;
        productData.products.quantity--;
        cartRef.update({
          'products.quantity': productData.products.quantity,
        });
      }
    });
  };

  const plusHnadler = () => {
    cartRef.get().then((doc) => {
      if (doc.exists) {
        productData = doc.data();
        productData.products.quantity++;
        cartRef.update({
          'products.quantity': productData.products.quantity,
        });
      }
    });
  };

  return (
    <>
      <tr>
        <td>
          <input
            type='checkbox'
            name='checkbox'
            id={props.index}
            onChange={(e) =>
              props.handleSingleCheck(e.target.checked, props.id)
            }
            checked={props.checkItems.includes(props.id) ? true : false}
          />
        </td>
        <td>
          <img src={props.image} className='cart_img' alt='cart-product' />
        </td>
        <td>
          <p className='cart_name'>{props.name}</p>
        </td>
        <td>
          <button className='minus' onClick={minusHnadler}>
            –
          </button>
          <span>{props.quantity}</span>
          <button className='plus' onClick={plusHnadler}>
            +
          </button>
        </td>
        <td>
          ₩
          {(props.price * props.quantity)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          원
        </td>
        <td>
          <button className='deleteBtn' onClick={deleteHandler}>
            ×
          </button>
        </td>
      </tr>
    </>
  );
}
