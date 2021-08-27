import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { dbService } from "../../firebase";
import Modal from "../../shared/UIElement/Modal";
import "./ProductItem.css";
import { addToCart } from "../../shared/util/addCart";

export default function ProductItem(props) {
  // const classes = useStyles();

  const { currentUser } = useAuth();
  const history = useHistory();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const addCartHandler = () => {
    if (!currentUser) {
      openLoginModal();
    } else {
      addToCart(currentUser.uid, props);
    }
  };

  return (
    <>
      <Modal
        open={loginModalOpen}
        close={closeLoginModal}
        header="Notice"
        footer={<button onClick={() => history.push("/auth")}>Log In</button>}
      >
        로그인이 필요합니다.
      </Modal>
      <li className="product_card">
        <div className="img_wrap">
          <img src={props.image} className="product_image" alt="product" />
        </div>
        <div className="product_content">
          <p className="product_category">{props.category}</p>
          <h3 className="product_name">{props.name}</h3>
          <p className="product_price">
            {props.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            원
          </p>
          <button className="cart_btn" onClick={addCartHandler}>
            <span>ADD TO CART</span>
          </button>
        </div>
      </li>
    </>
  );
}
