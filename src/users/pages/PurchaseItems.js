import React from 'react';
import './PurchaseItems.css';

export default function PurchaseItems(props) {
  const date = props.date.split('T')[0];

  return (
    <>
      <tr>
        <td className='list_td'>{date}</td>
        <td className='list_td'>
          <img
            src={props.product.image}
            className='list_img'
            alt='purchase-product'
          />
        </td>
        <td className='list_td'>
          <p className='list_name'>{props.product.productName}</p>
        </td>
        <td className='list_td'>{props.product.quantity}</td>
        <td className='list_td'>₩ {props.product.price}</td>
      </tr>
    </>
  );
}
