import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase';

import { Button, Fade, makeStyles, Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';

import './CommentList.css';
import CommentItem from '../components/CommentItem';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '1000px',
    height: '500px',
    overflowY: 'scroll',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Comments(props) {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const classes = useStyles();
  const { open, handleClose } = props;

  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    dbService
      .collection('rating')
      .where('productId', '==', props.id)
      .get()
      .then((docs) => {
        let loadedComments = [];
        docs.forEach((doc) =>
          loadedComments.push({ ...doc.data(), id: doc.id })
        );
        setCommentList(loadedComments);
      });
  }, [props.id]);

  return (
    <section className='comment-modal'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <header className='comment-header'>
              <h2 id='modal-title'>리뷰</h2>
            </header>
            {props.children}
            <form className='modal-form'>
              <textarea
                type='text'
                placeholder='리뷰를 작성해주세요'
                rows={3}
                onChange={commentChangeHandler}
              />
              <Button
                variant='contained'
                color='primary'
                className='comment-submitBtn'
                onClick={() => {
                  props.onReviewSubmit(comment);
                }}
              >
                제출
              </Button>
            </form>
            <ul className='user-commentList'>
              {commentList.map((comment) => (
                <CommentItem
                  key={comment.id}
                  createdAt={comment.createdAt}
                  comment={comment.comment}
                  avatar={comment.avatar}
                  nickName={comment.nickName}
                  rate={comment.rateValue}
                />
              ))}
            </ul>
          </div>
        </Fade>
      </Modal>
    </section>
  );
}
