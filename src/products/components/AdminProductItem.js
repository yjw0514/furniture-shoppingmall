import React, { useState } from 'react';

import { dbService } from '../../firebase';
import { Button } from '@material-ui/core';
import Modal from '../../shared/UIElement/Modal';
import { Link } from 'react-router-dom';

export default function AdminProductItem(props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const onProductDelte = () => {
    dbService
      .collection('product')
      .doc(props.id)
      .delete()
      .then(() => console.log('delete successfully'));
    setDeleteModalOpen(false);
  };
  return (
    <>
      <Modal
        open={deleteModalOpen}
        close={closeDeleteModal}
        header='정말 삭제하시겠습니까?'
        mainClass='rating__main'
        footer={<button onClick={onProductDelte}>삭제</button>}
      />
      <tr>
        <td>
          <img src={props.imageUrl} className='cart_img' alt='img' />
        </td>
        <td>
          <p className='cart_name'>{props.name}</p>
        </td>
        <td>
          <p className='category'>{props.category}</p>
        </td>
        <td>₩{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        <td>
          <Button
            variant='contained'
            color='secondary'
            onClick={(e) => {
              setDeleteModalOpen(true);
            }}
          >
            삭제
          </Button>
        </td>
        <td>
          <Link to={`/admin/edit/${props.id}`}>
            <Button variant='contained' color='primary'>
              수정
            </Button>
          </Link>
        </td>
      </tr>
    </>
  );
}
