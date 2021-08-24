import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function CommentItem(props) {
  return (
    <li className='commentItem'>
      <div className='comment-content'>
        <div className='user-avatar'>
          <img src={props.avatar} alt='avatar' />
        </div>
        <div className='user-info'>
          <p className='name'>{props.nickName}</p>
          <Rating name='read-only' value={props.rate} readOnly size='small' />
        </div>
        <p className='date'>
          {props.createdAt.split('T')[0].replaceAll('-', '.')}
        </p>
      </div>
      <p className='comment'>{props.comment}</p>
    </li>
  );
}
