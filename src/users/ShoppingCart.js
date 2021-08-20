import React, { useEffect, useState } from "react";
import "./ShoppingCart.css";
import Container from "@material-ui/core/Container";
import { useAuth } from "../context/auth-context";
import { dbService } from "../firebase";
import CartItem from "./pages/CartItem";

export default function ShoppingCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { currentUser } = useAuth();
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    const cartRef = dbService.collection("cart").doc(currentUser.uid);
    cartRef.onSnapshot((doc) => {
      if (doc.exists) {
        setCartProducts(doc.data().products);
      } else if (cartProducts.length === 0) {
        return <div>장바구니가 비어있습니다.</div>;
      }
    });
  }, []);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const checkAllHandler = (checked) => {
    if (checked) {
      const idArray = [];
      cartProducts.forEach((el, id) => idArray.push(el.productId));
      setCheckItems(idArray);
      console.log(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <section className="shopping_cart">
          <h2>Your Shopping Bag</h2>
          <table className="cart_table">
            {/* table title */}
            <thead>
              <tr>
                <th className="checkboxAll">
                  <input
                    type="checkbox"
                    name="checkboxAll"
                    id="checkAll"
                    onChange={(e) => checkAllHandler(e.target.checked)}
                    checked={
                      checkItems.length === cartProducts.length ? true : false
                    }
                  />
                  <label htmlFor="checkAll">전체 선택</label>
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
          <div className="checkout">
            <ul className="total">
              <li>
                <p>Itemtotal:</p>
                <p>₩ 2,000원</p>
              </li>
              <li>
                <p>Estimated Shipping:</p>
                <p>₩ 2,000원</p>
              </li>
              <li>
                <p>Total :</p>
                <p>₩ 1000,000원</p>
              </li>
              <button className="total_btn">
                <span>Secure Checkout</span>
              </button>
            </ul>
          </div>
        </section>
      </Container>
    </div>
  );
}
