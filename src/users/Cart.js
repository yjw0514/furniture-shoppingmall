import React, { useEffect, useState } from 'react';
import './ShoppingCart.css';
import Container from '@material-ui/core/Container';
import { useAuth } from '../context/auth-context';
import { dbService } from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
// import CartItem from './pages/CartItem';
import CartItemTest from './pages/CartItemTest';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [checkItems, setCheckItems] = useState([]);
  const [totalMoney, setTotalMoney] = useState();

  const cartRef = dbService
    .collection('cart')
    .doc(currentUser.uid)
    .collection('products');

  const buyRef = dbService.doc(`/buy/${currentUser.uid}`);

  useEffect(() => {
    setLoading(true);
    const cartRef = dbService
      .collection('cart')
      .doc(currentUser.uid)
      .collection('products');
    cartRef.onSnapshot((snapshot) => {
      let loadedCarts = [];
      //   let checkItems = [];
      snapshot.forEach((doc) => {
        loadedCarts.push(doc.data().products);
        // checkItems.push(doc.data().products.productId);
      });
      setCartProducts(loadedCarts);
      //   setCheckItems(checkItems);
      setLoading(false);
    });
  }, [currentUser.uid]);

  useEffect(() => {
    cartRef
      .where('products.isChecked', '==', true)
      .get()
      .then((docs) => {
        let sum = 0;
        docs.forEach((doc) => {
          sum += doc.data().products.price * doc.data().products.quantity;
        });

        setTotalMoney(sum);
      });
  });

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      cartRef.doc(id).update({ 'products.isChecked': true });
      setCheckItems([...checkItems, id]);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
      cartRef.doc(id).update({ 'products.isChecked': false });
    }
  };

  const checkAllHandler = (checked) => {
    if (checked) {
      const idArray = [];
      cartProducts.forEach((el, id) => {
        idArray.push(el.productId);
      });
      cartRef.get().then((docs) =>
        docs.forEach((doc) => {
          doc.ref.update({ 'products.isChecked': true });
        })
      );
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
      cartRef.get().then((docs) =>
        docs.forEach((doc) => {
          doc.ref.update({ 'products.isChecked': false });
        })
      );
    }
    setLoading(false);
  };

  const checkoutHandler = () => {
    cartRef
      .where('products.isChecked', '==', true)
      .get()
      .then((docs) => {
        let buyHistory = [];
        let buyItems = [];
        docs.forEach((doc) => {
          buyItems.push({ ...doc.data().products });
        });
        buyHistory.push({ products: [...buyItems], date: new Date() });
        return buyHistory;
      })
      .then((buyHistory) => {
        buyRef.get().then((doc) => {
          if (doc.exists) {
            let oldHistory;
            oldHistory = doc.data().buyHistory;
            oldHistory.forEach((history, i) => {
              buyHistory.push(oldHistory[i]);
            });
            buyRef.update({ buyHistory });
          } else {
            buyRef.set({ buyHistory: buyHistory });
          }
        });
      });
  };

  return (
    <div>
      {loading && <CircularProgress />}
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
                      checkItems && checkItems.length === cartProducts.length
                        ? true
                        : false
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
              {!loading &&
                cartProducts &&
                cartProducts.map((product, index) => (
                  <CartItemTest
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
                <p>₩ {totalMoney}원</p>
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
