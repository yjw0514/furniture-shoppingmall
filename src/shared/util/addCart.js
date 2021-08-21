import { dbService } from '../../firebase';
export const addCartHandler = (newProduct, currentUser) => {
  const cartRef = dbService
    .collection('cart')
    .doc(currentUser.uid)
    .collection('products')
    .doc(newProduct.productId);

  let productData;

  cartRef.get().then((doc) => {
    if (!doc.exists) {
      dbService
        .collection('cart')
        .doc(currentUser.uid)
        .collection('products')
        .doc(newProduct.productId)
        .set({
          products: newProduct,
        });
    } else {
      dbService
        .collection('cart')
        .doc(currentUser.uid)
        .collection('products')
        .doc(newProduct.productId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            productData = doc.data();
            productData.products.quantity++;
            cartRef.update({
              'products.quantity': productData.products.quantity,
            });
          }
        });
    }
  });
};
