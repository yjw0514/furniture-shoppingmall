import React, { useState } from 'react';
import { useEffect } from 'react';
import { dbService } from '../../firebase';
// import { fetchProducts } from '../../shared/util/fetchAdminProducts';
import AdminProductList from '../components/AdminProductList';
export default function AdminProduct() {
  const [productList, setProductList] = useState([]);
  const [limit] = useState(3);
  const [currentPage, setCurrntPage] = useState(1);
  // const [lastDoc, setLastDoc] = useState(null);
  // const [count, setCount] = useState();

  useEffect(() => {
    console.log('useEffect from admin productlist');
    dbService
      .collection('product')
      .orderBy('date')
      // .limit(3)
      .get()
      .then((docs) => {
        let loadedProducts = [];
        docs.forEach((doc) => {
          loadedProducts.push(doc.data());
        });

        setProductList(loadedProducts);
      });
  }, []);

  const setCurrentPage = (number) => {
    setCurrntPage(number);
    // const { lastVisible, products } = fetchProducts(lastDoc);
  };

  const lastIndex = currentPage * limit;
  const firstIndex = lastIndex - limit;
  const currentProducts = productList.slice(firstIndex, lastIndex);

  return (
    <AdminProductList
      currentProducts={currentProducts}
      // count={count / 3}
      count={Math.ceil(productList.length / limit)}
      setCurrentPage={setCurrentPage}
    />
  );
}
