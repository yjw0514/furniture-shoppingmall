import { Button } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';

export default function ProductDetail() {
  const pid = useParams().productId;
  const { currentUser } = useAuth();

  const getProductHandler = (e) => {
    dbService
      .doc(`/users/${currentUser.nickName}`)
      .update({
        buyHistory: {
          productId: pid,
          createdAt: new Date(),
        },
      })
      .then(() => {
        console.log('구입완료');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button variant='contained' color='primary' onClick={getProductHandler}>
        구입하기
      </Button>
    </div>
  );
}
