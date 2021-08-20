import React, { useState } from 'react';
import CategoryItem from './CategoryItem';

import { Container, Divider, TextField } from '@material-ui/core';
import { FaBed, FaChair, FaAddressCard } from 'react-icons/fa';
import { GiDesk, GiSofa } from 'react-icons/gi';

export default function CategoryList(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
    // onSearchFilter()
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
            props.categorySelectHandler('all');
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
            props.categorySelectHandler('sofa');
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
            props.categorySelectHandler('bed');
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
            props.categorySelectHandler('chair');
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
            props.categorySelectHandler('desk');
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
          <h1 className='category__title'>{props.selecteCategory}</h1>

          <ul className='category__filter'>
            <li
              className='filter-item'
              onClick={() => {
                props.productFilter('desc');
              }}
            >
              낮은가격순
            </li>
            <li
              className='filter-item'
              onClick={() => {
                props.productFilter('asce');
              }}
            >
              높은가격순
            </li>
            <li
              className='filter-item'
              onClick={() => {
                props.productFilter('register');
              }}
            >
              최근제품순
            </li>
          </ul>
        </div>
        <div className='search'>
          <TextField
            id='standard-basic'
            label='검색어'
            onChange={searchTermHandler}
            value={searchTerm}
          />
        </div>
        <ul className='category-list'>
          {props.filterProducts &&
            props.filterProducts.map((product) => (
              <CategoryItem
                id={product.id}
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.imageUrl}
                category={product.category}
                avgRating={product.avgRating}
                reviewCount={product.scoreCount}
              />
            ))}
        </ul>
      </Container>
    </section>
  );
}
