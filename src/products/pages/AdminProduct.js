import React, { useState } from 'react';
import { useEffect } from 'react';
import { dbService } from '../../firebase';
import AdminProductList from '../components/AdminProductList';
export default function AdminProduct() {
  const [productList, setProductList] = useState([]);
  const [limit] = useState(3);
  const [currentPage, setCurrntPage] = useState(1);

  useEffect(() => {
    dbService.collection('product').onSnapshot((snapshot) => {
      setProductList(
        snapshot.docs.map((doc) => {
          return { productId: doc.id, ...doc.data() };
        })
      );
    });
  }, []);

  const setCurrentPage = (number) => {
    setCurrntPage(number);
  };

  const lastIndex = currentPage * limit;
  const firstIndex = lastIndex - limit;
  const currentProducts = productList.slice(firstIndex, lastIndex);

  return (
    <AdminProductList
      currentProducts={currentProducts}
      count={Math.ceil(productList.length / limit)}
      setCurrentPage={setCurrentPage}
    />
  );
}
