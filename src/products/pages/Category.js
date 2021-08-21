import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase';
import './Category.css';
import CategoryList from '../components/CategoryList';

export default function Category() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selecteCategory, setSelecteCategory] = useState('All Products');

  useEffect(() => {
    dbService.collection('product').onSnapshot((snapshot) => {
      setLoadedProducts(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
      setFilterProducts(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });
  }, []);

  const productFilter = (filter) => {
    if (filter === 'desc') {
      const newArr = [...filterProducts];
      const filteredArr = newArr.sort((a, b) => {
        return a.price - b.price;
      });
      setFilterProducts(filteredArr);
    } else if (filter === 'asce') {
      const newArr = [...filterProducts];
      const filteredArr = newArr.sort((a, b) => {
        return b.price - a.price;
      });
      setFilterProducts(filteredArr);
    } else {
      const newArr = [...filterProducts];
      const filteredArr = newArr.sort((a, b) => {
        return b.date.toDate().getTime() - a.date.toDate().getTime();
      });
      setFilterProducts(filteredArr);
    }
  };

  const categorySelectHandler = (name) => {
    setSelecteCategory(name.toUpperCase());
    if (name === 'all') {
      return setFilterProducts(loadedProducts);
    }
    setFilterProducts(
      loadedProducts.filter((product) => product.category === name)
    );
  };

  return (
    <CategoryList
      filterProducts={filterProducts}
      categorySelectHandler={categorySelectHandler}
      selecteCategory={selecteCategory}
      productFilter={productFilter}
    />
  );
}
