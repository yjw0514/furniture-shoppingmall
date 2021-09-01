import React, { useState } from 'react';
import { useEffect } from 'react';
import { dbService } from '../../firebase';
import { useSliceProducts } from '../../shared/hooks/UseSliceProducts';
import AdminProductList from '../components/AdminProductList';
export default function AdminProduct() {
  const [productList, setProductList] = useState([]);
  const { setCurrentPage, currentProducts, count } = useSliceProducts(
    6,
    productList
  );

  useEffect(() => {
    console.log('useEffect from admin productlist');
    dbService
      .collection('product')
      .orderBy('date')
      .get()
      .then((docs) => {
        let loadedProducts = [];
        docs.forEach((doc) => {
          loadedProducts.push({ ...doc.data(), id: doc.id });
        });
        setProductList(loadedProducts);
      });
  }, []);

  const onSetCurrentPage = (number) => {
    setCurrentPage(number);
  };

  return (
    <AdminProductList
      currentProducts={currentProducts}
      count={count}
      setCurrentPage={onSetCurrentPage}
    />
  );
}
