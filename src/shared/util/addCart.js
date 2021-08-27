import { dbService } from "../../firebase";

export function addToCart(userId, props) {
  const newProduct = {
    productId: props.id,
    productName: props.name,
    category: props.category,
    quantity: 1,
    price: props.price,
    image: props.image,
    isChecked: false,
  };
  const cartRef = dbService.doc(`/cart/${userId}`);

  cartRef.get().then((doc) => {
    if (!doc.exists) {
      dbService.doc(`/cart/${userId}`).set({
        products: [newProduct],
      });
    } else {
      dbService
        .doc(`/cart/${userId}`)
        .get()
        .then((doc) => {
          let newProducts = [];
          newProducts = doc.data().products;

          const sameIndex = doc
            .data()
            .products.findIndex((e) => e.productId === newProduct.productId);

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
