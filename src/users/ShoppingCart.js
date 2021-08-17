import React from 'react';
import './ShoppingCart.css';
import Container from '@material-ui/core/Container';

export default function ShoppingCart() {
  return (
    <div>
      <Container maxWidth='lg'>
        <section className='shopping_cart'>
          <h2>Your Shopping Bag</h2>
          <table className='cart_table'>
            {/* table title */}
            <thead>
              <tr>
                <th className='checkboxAll'>
                  <input type='checkbox' name='checkboxAll' id='checkAll' />
                  <label htmlFor='checkAll'>전체 선택</label>
                </th>
                <th>Item</th>
                <th></th>
                <th>Quantity</th>
                <th>Shipping Cost</th>
                <th>Price</th>
                <th>선택 삭제</th>
              </tr>
            </thead>
            {/* table content */}
            <tbody>
              <tr>
                <td>
                  <input type='checkbox' name='checkbox'></input>
                </td>
                <td>
                  <img src='image/bed_3.jpg' className='cart_img' />
                </td>
                <td>
                  <p className='cart_name'>Bed</p>
                </td>
                <td>
                  <button className='minus'>–</button>
                  <span>1</span>
                  <button className='plus'>+</button>
                </td>
                <td>₩2,000원</td>
                <td>₩10,000원</td>
                <td>
                  <button className='deleteBtn'>X</button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* total */}
          <div className='checkout'>
            <ul className='total'>
              <li>
                <p>Itemtotal:</p>
                <p>₩ 2,000원</p>
              </li>
              <li>
                <p>Estimated Shipping:</p>
                <p>₩ 2,000원</p>
              </li>
              <li>
                <p>Total :</p>
                <p>₩ 1000,000원</p>
              </li>
              <button className='total_btn'>
                <span>Secure Checkout</span>
              </button>
            </ul>
          </div>
        </section>
      </Container>
    </div>
  );
}
