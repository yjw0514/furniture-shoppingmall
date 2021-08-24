import React from "react";
import { useAuth } from "../../context/auth-context";
import { dbService } from "../../firebase";
import "./CartItem.css";

export default function CartItem(props) {
  // console.log(props.checkItems);
  const { currentUser } = useAuth();
  const cartRef = dbService.doc(`/cart/${currentUser.uid}`);
  // console.log(props.price);
  const deleteHandler = () => {
    cartRef
      .get()
      .then((doc) => {
        let newProducts = [];
        newProducts = doc
          .data()
          .products.filter((el) => el.productId !== props.id);

        cartRef.update({ products: newProducts });
      })
      .catch((err) => console.log(err));
  };

  const minusHnadler = () => {
    cartRef
      .get()
      .then((doc) => {
        let newProducts = [];
        newProducts = doc.data().products;
        const sameIndex = doc
          .data()
          .products.findIndex((el) => el.productId === props.id);

        if (newProducts[sameIndex].quantity > 0) {
          newProducts[sameIndex].quantity--;
          cartRef.update({ products: newProducts });
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const plusHnadler = () => {
    cartRef
      .get()
      .then((doc) => {
        let newProducts = [];
        newProducts = doc.data().products;
        const sameIndex = doc
          .data()
          .products.findIndex((el) => el.productId === props.id);

        newProducts[sameIndex].quantity++;
        cartRef.update({ products: newProducts });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            name="checkbox"
            id={props.index}
            onChange={(e) =>
              props.handleSingleCheck(e.target.checked, props.id)
            }
            checked={props.checkItems.includes(props.id) ? true : false}
          />
        </td>
        <td>
          <img src={props.image} className="cart_img" alt="cart-product" />
        </td>
        <td>
          <p className="cart_name">{props.name}</p>
        </td>
        <td>
          <button className="minus" onClick={minusHnadler}>
            –
          </button>
          <span>{props.quantity}</span>
          <button className="plus" onClick={plusHnadler}>
            +
          </button>
        </td>
        <td>
          ₩
          {(props.price * props.quantity)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          원
        </td>
        <td>
          <button className="deleteBtn" onClick={deleteHandler}>
            <span>×</span>
          </button>
        </td>
      </tr>
    </>
  );
}
