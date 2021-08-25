import React, { useEffect, useState } from 'react';
import './ShoppingCart.css';
import Container from '@material-ui/core/Container';
import { useAuth } from '../context/auth-context';
import { dbService } from '../firebase';
import CartItem from './pages/CartItem';

export default function ShoppingCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { currentUser } = useAuth();
  const [checkItems, setCheckItems] = useState([]);
  const buyRef = dbService.doc(`/buy/${currentUser.uid}`);
  const cartRef = dbService.collection('cart').doc(currentUser.uid);

  useEffect(() => {
    const cartRef = dbService.collection('cart').doc(currentUser.uid);
    cartRef.onSnapshot((doc) => {
      if (doc.exists) {
        setCartProducts(doc.data().products);
      } else if (cartProducts.length === 0) {
        return <div>장바구니가 비어있습니다.</div>;
      }
    });
  }, [currentUser.uid, cartProducts.length]);

  const checkoutHandler = () => {
    cartRef
      .get()
      .then((doc) => {
        let newProducts = [];
        newProducts = doc.data().products.filter((el) => {
          return !checkItems.includes(el.productId);
        });

        cartRef.update({ products: newProducts });

        const items = doc.data().products.filter((el) => {
          return checkItems.includes(el.productId);
        }); //구매한 상품
        console.log(items);
        const itemsWithDate = [
          { products: [...items], date: new Date().toISOString() },
        ];
        console.log(itemsWithDate);
        return itemsWithDate;
      })
      .then((itemsWithDate) => {
        buyRef.get().then((doc) => {
          if (doc.exists) {
            let buyProducts = [];
            buyProducts = doc.data().itemsWithDate;
            itemsWithDate.forEach((el) => buyProducts.push(el));

            buyRef.update({ itemsWithDate: buyProducts });
          } else {
            buyRef.set({
              itemsWithDate,
            });
          }
        });
      })
      .catch((err) => console.error(err));
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      cartRef.get().then((doc) => {
        let newCart = doc.data().products;
        const sameIndex = doc
          .data()
          .products.findIndex((e) => e.productId === id);

        newCart[sameIndex].isChecked = true;
        cartRef.update({ products: newCart });
      });
      setCheckItems([...checkItems, id]);
    } else {
      cartRef.get().then((doc) => {
        let newCart = doc.data().products;
        const sameIndex = doc
          .data()
          .products.findIndex((e) => e.productId === id);
        newCart[sameIndex].isChecked = false;
        cartRef.update({ products: newCart });
      });
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const checkAllHandler = (checked) => {
    if (checked) {
      const idArray = [];
      cartProducts.forEach((el, id) => {
        idArray.push(el.productId);
      });
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <div>
      <Container maxWidth='lg'>
        <section className='shopping_cart'>
          <h2>Your Shopping Bag</h2>
          <table className='cart_table'>
            {/* table title */}
            <thead>
              <tr>
                <th className='checkboxAll'>
                  <input
                    type='checkbox'
                    name='checkboxAll'
                    id='checkAll'
                    onChange={(e) => checkAllHandler(e.target.checked)}
                    checked={
                      checkItems.length === cartProducts.length ? true : false
                    }
                  />
                  <label htmlFor='checkAll'>전체 선택</label>
                </th>
                <th>Item</th>
                <th></th>
                <th>Quantity</th>
                <th>Price</th>
                <th>선택 삭제</th>
              </tr>
            </thead>
            {/* table content */}
            <tbody>
              {cartProducts &&
                cartProducts.map((product, index) => (
                  <CartItem
                    key={product.productId}
                    id={product.productId}
                    name={product.productName}
                    price={product.price}
                    image={product.image}
                    quantity={product.quantity}
                    index={index}
                    checkItems={checkItems}
                    setCheckItems={setCheckItems}
                    handleSingleCheck={handleSingleCheck}
                  />
                ))}
            </tbody>
          </table>
          {/* total */}
          <div className='checkout'>
            <div className='total'>
              <div className='total_inner'>
                <p>Total :</p>
                <p>₩ 원</p>
              </div>
              <button className='total_btn' onClick={checkoutHandler}>
                <span>Secure Checkout</span>
              </button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
