import React, { useEffect, useState } from "react";

import Modal from "../../shared/UIElement/Modal";
import Rating from "@material-ui/lab/Rating";

import { useAuth } from "../../context/auth-context";
import { useHistory } from "react-router-dom";
import { dbService } from "../../firebase";
import "./CategoryItem.css";
import CommentList from "../../users/pages/CommentList";
import { addComment } from "../../shared/util/rating";
import { addToCart } from "../../shared/util/addCart";
import SnackBar from "../../shared/UIElement/SnackBar";

export default function CategoryItem(props) {
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    if (currentUser) {
      dbService
        .collection("users")
        .where("userId", "==", currentUser.uid)
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

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const ratingSubmitHandler = (comment) => {
    addComment(
      props.id,
      props.name,
      user.nickName,
      value,
      comment,
      user.imageUrl
    );
    setRatingModalOpen(false);
  };

  const onAuthRedirect = (e) => {
    history.push("/auth");
  };

  const addCartHandler = () => {
    if (!currentUser) {
      openLoginModal();
    } else {
      addToCart(currentUser.uid, props, handleClick);
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
            name="simple-controlled"
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
        header="로그인이 필요합니다"
        mainClass="rating__main"
        footer={<button onClick={onAuthRedirect}>confirm</button>}
      >
        {"로그인 페이지로 이동하시겠습니까?"}
      </Modal>
      <li className="category_card">
        <div className="img_wrap">
          <img src={props.image} className="product_image" alt="productImg" />
        </div>
        <div className="product_content">
          <div className="product_content-header">
            <div className="span">
              <div className="rating">
                <Rating name="read-only" value={props.avgRating} readOnly />
              </div>
            </div>
            <p className="product_review" onClick={openRatingModal}>
              별점주기({props.reviewCount})
            </p>
          </div>
          <h3 className="product_name">
            {props.name.length > 10
              ? `${props.name.slice(0, 11)}..`
              : props.name}
          </h3>

          <p className="product_price">
            {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </p>
          <button className="category-cart_btn" onClick={addCartHandler}>
            <span>ADD TO CART</span>
          </button>
        </div>
      </li>
      <SnackBar open={open} close={handleClose}>
        장바구니에 담겼습니다.
      </SnackBar>
    </>
  );
}
