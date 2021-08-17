import { Container, Divider, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaBed, FaChair, FaAddressCard } from 'react-icons/fa';
import { GiDesk, GiSofa } from 'react-icons/gi';

import './Category.css';
import { dbService } from '../../firebase';
import CategoryItem from '../components/CategoryItem';

export default function Category() {
  const [loadedProducts, setLoadedProducts] = useState();
  const [filterProducts, setFilterProducts] = useState();
  const [selecteCategory, setSelecteCategory] = useState('All Products');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {}, []);

  const priceFilter = (filter) => {
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
    <section className='category'>
      <div className='category__main'>
        <div className='main__img'>
          <img src='image/main.jpg' alt='category-main-img' />
        </div>
      </div>
      <ul className='category__list'>
        <Divider orientation='vertical' flexItem />
        <li
          className='list-item'
          onClick={() => {
            categorySelectHandler('all');
          }}
        >
          <span>
            <FaAddressCard size={40} />
          </span>
          <p>ALL</p>
        </li>
        <Divider orientation='vertical' flexItem />
        <li
          className='list-item'
          onClick={() => {
            categorySelectHandler('sofa');
          }}
        >
          <span>
            <GiSofa size={40} />
          </span>
          <p>SOFA</p>
        </li>
        <Divider orientation='vertical' flexItem />
        <li
          className='list-item'
          onClick={() => {
            categorySelectHandler('bed');
          }}
        >
          <span>
            <FaBed size={40} />
          </span>
          <p>BED</p>
        </li>
        <Divider orientation='vertical' flexItem />

        <li
          className='list-item'
          onClick={() => {
            categorySelectHandler('chair');
          }}
        >
          <span>
            <FaChair size={40} />
          </span>
          <p>CHIAR</p>
        </li>
        <Divider orientation='vertical' flexItem />
        <li
          className='list-item'
          onClick={() => {
            categorySelectHandler('desk');
          }}
        >
          <span>
            <GiDesk size={40} />
          </span>
          <p>DESK</p>
        </li>
        <Divider orientation='vertical' flexItem />
      </ul>
      <Container maxWidth='lg'>
        <div className='category__list-header'>
          <h1 className='category__title'>{selecteCategory}</h1>
          <ul className='category__filter'>
            <li
              className='filter-item'
              onClick={() => {
                priceFilter('desc');
              }}
            >
              낮은가격순
            </li>
            <li
              className='filter-item'
              onClick={() => {
                priceFilter('asce');
              }}
            >
              높은가격순
            </li>
            <li
              className='filter-item'
              onClick={() => {
                priceFilter('register');
              }}
            >
              등록순
            </li>
          </ul>
        </div>
        <ul className='category-list'>
          {!loading &&
            filterProducts &&
            filterProducts.map((product) => (
              <CategoryItem
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.imageUrl}
                category={product.category}
              />
            ))}
        </ul>
      </Container>
    </section>
  );
}
