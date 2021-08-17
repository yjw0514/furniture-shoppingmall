import React from 'react';

import './CategoryItem.css';

export default function CategoryItem(props) {
  return (
    <li className='category_card'>
      <div className='img_wrap'>
        <img src={props.image} className='product_image' alt='productImg' />
      </div>
      <div className='product_content'>
        <p className='product_category'>{props.category}</p>
        <h3 className='product_name'>{props.name}</h3>
        <p className='product_price'>{props.price}원</p>
        <button className='cart_btn'>
          <span>ADD TO CART</span>
        </button>
      </div>
    </li>
  );
}
