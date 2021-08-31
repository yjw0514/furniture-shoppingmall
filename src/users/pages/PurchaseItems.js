import React from 'react';
import './PurchaseItems.css';

export default function PurchaseItems(props) {
  const date = props.date.split('T')[0];
  return (
    <>
      {props.products.map((item, index) => (
        <tr key={index}>
          <td className='list_td'>{date}</td>
          <td className='list_td'>
            <img src={item.image} className='list_img' alt='purchase-product' />
          </td>
          <td className='list_td'>
            <p className='list_name'>{item.productName}</p>
          </td>
          <td className='list_td'>{item.quantity}</td>
          <td className='list_td'>₩ {item.price}</td>
        </tr>
      ))}
    </>
  );
}
