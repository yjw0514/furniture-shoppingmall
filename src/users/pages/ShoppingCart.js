import React, { useEffect, useState } from 'react';
import './ShoppingCart.css';
import Container from '@material-ui/core/Container';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import CartItem from './CartItem';
import { Pagination } from '@material-ui/lab';
import { useSliceProducts } from '../../shared/hooks/UseSliceProducts';
import CircularLoading from '../../shared/UIElement/CirularLoading';
import { useHistory } from 'react-router-dom';

export default function ShoppingCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { currentUser } = useAuth();
  const [checkItems, setCheckItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { setCurrentPage, currentProducts, setCurrentProducts, count } =
    useSliceProducts(3, cartProducts);

  const cartRef = dbService.collection('cart').doc(currentUser.uid);
  const buyRef = dbService.doc(`/buy/${currentUser.uid}`);

  useEffect(() => {
    const cartRef = dbService.collection('cart').doc(currentUser.uid);
    cartRef.onSnapshot((doc) => {
      if (doc.exists) {
        setCartProducts(doc.data().products);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [currentUser.uid]);

  const calcTotal = (products) => {
    let total = 0;
    products.forEach((el, i) => {
      if (products[i].isChecked === true) {
        total += products[i].price * products[i].quantity;
      }
    });
    setTotal(total);
  };

  const checkoutHandler = () => {
    cartRef
      .get()
      .then((doc) => {
        if (doc.exists && cartProducts.length > 0) {
          let newProducts = [];
          newProducts = doc.data().products.filter((el) => {
            return !checkItems.includes(el.productId);
          });

          cartRef.update({ products: newProducts });

          const items = doc.data().products.filter((el) => {
            return checkItems.includes(el.productId);
          }); //구매한 상품
          items.forEach((el, i) => (el.date = new Date().toISOString()));

          let itemsWithDate = [{ products: [...items] }];

          buyRef.get().then((doc) => {
            if (doc.exists) {
              let buyProducts = [];

              buyProducts = doc.data().itemsWithDate;
              itemsWithDate.forEach((el) => buyProducts.push(el));
              buyRef.update({ itemsWithDate: buyProducts });
              console.log(buyProducts);
            } else {
              buyRef.set({
                itemsWithDate,
              });
            }
          });
          setTotal(0);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);

      const sameIndex = cartProducts.findIndex((el) => el.productId === id);
      cartProducts[sameIndex].isChecked = true;
      cartRef.update({ products: cartProducts });
      calcTotal(cartProducts);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));

      const sameIndex = cartProducts.findIndex((el) => el.productId === id);
      cartProducts[sameIndex].isChecked = false;
      cartRef.update({ products: cartProducts });

      calcTotal(cartProducts);
    }
  };

  const checkAllHandler = (checked) => {
    if (checked) {
      const idArray = [];
      currentProducts.forEach((el, id) => {
        idArray.push(el.productId);
      });
      console.log(idArray);

      cartProducts.forEach((el) => (el.isChecked = false));
      for (let i = 0; i < idArray.length; i++) {
        let id = cartProducts.findIndex((obj) => obj.productId === idArray[i]);
        cartProducts[id].isChecked = true;
      }

      cartRef.update({ products: cartProducts });

      calcTotal(cartProducts);

      setCheckItems(idArray);
    } else {
      setCheckItems([]);
      cartProducts.forEach((el) => (el.isChecked = false));
      cartRef.update({ products: cartProducts });

      calcTotal(cartProducts);
    }
  };

  const onPageChange = (e, number) => {
    setCurrentPage(number);
  };

  const updateCurrentProduct = (productId) => {
    setCurrentProducts(
      currentProducts.filter((el) => el.productId !== productId)
    );
  };

  if (loading) {
    return <CircularLoading />;
  }

  let content;
  if (!loading && cartProducts.length === 0) {
    content = (
      <>
        <Container maxWidth='lg'>
          <section className='shopping_cart'>
            <h2>Your Shopping Bag</h2>
            <div className='noresult_box'>
              <h2>장바구니가 비어있습니다.</h2>
              <button onClick={() => history.push('/category')}>
                쇼핑하러 가기
              </button>
            </div>
          </section>
        </Container>
      </>
    );
  } else if (!loading && cartProducts.length > 0) {
    content = (
      <div>
        <Container maxWidth='lg' style={{ position: 'relative' }}>
          <section className='shopping_cart'>
            <h2>Your Shopping Bag</h2>
            <table className='cart_table'>
              {/* table title */}
              <thead>
                <tr>
                  <th className='checkboxAll cart_th'>
                    <input
                      type='checkbox'
                      name='checkboxAll'
                      id='checkAll'
                      onChange={(e) => checkAllHandler(e.target.checked)}
                      checked={
                        checkItems.length > 0 &&
                        checkItems.includes(currentProducts[0].productId) &&
                        checkItems.length === currentProducts.length
                          ? true
                          : false
                      }
                    />
                    <label htmlFor='checkAll'>선택</label>
                  </th>
                  <th className='cart_th'>Item</th>
                  <th className='cart_th'></th>
                  <th className='cart_th'>Quantity</th>
                  <th className='cart_th'>Price</th>
                  <th className='cart_th'>삭제</th>
                </tr>
              </thead>
              {/* table content */}
              <tbody>
                {currentProducts &&
                  currentProducts.map((product, index) => (
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
                      total={total}
                      setTotal={setTotal}
                      updateCurrentProduct={updateCurrentProduct}
                    />
                  ))}
              </tbody>
            </table>
            {/* total */}
            <div className='checkout'>
              <div className='total'>
                <div className='total_inner'>
                  <p>Total :</p>
                  <p>
                    ₩{' '}
                    {total
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                </div>
                <button className='total_btn' onClick={checkoutHandler}>
                  <span>Secure Checkout</span>
                </button>
              </div>
            </div>
          </section>
          {/* page */}
          <div className='paging' style={{ width: '100%', marginTop: '40px' }}>
            <Pagination
              count={count}
              variant='outlined'
              color='primary'
              onChange={onPageChange}
            />
          </div>
        </Container>
      </div>
    );
  }

  return content;
}
