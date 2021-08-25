import React, { useEffect, useState, useRef, useCallback } from 'react';

import { Button, Fade, makeStyles, Modal } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';

import './CommentList.css';
import CommentItem from '../components/CommentItem';
import { dbService } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '1000px',
    height: '400px',
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
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const { open, handleClose } = props;

  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    console.log('useEffect triggered');
    setLoading(true);
    dbService
      .collection('rating')
      .where('productId', '==', props.id)
      .orderBy('createdAt')
      .limit(2)
      .get()
      .then((docs) => {
        let loadedComments = [];
        docs.forEach((doc) =>
          loadedComments.push({ ...doc.data(), id: doc.id })
        );
        setLastDoc(docs.docs[docs.docs.length - 1]);
        setCommentList(loadedComments);
        setLoading(false);
      });
  }, [props.id]);

  const fetchNextComments = useCallback(() => {
    setLoading(true);
    dbService
      .collection('rating')
      .where('productId', '==', props.id)
      .orderBy('createdAt')
      .startAfter(lastDoc)
      .limit(2)
      .get()
      .then((docs) => {
        let loadedComments = [];
        docs.forEach((doc) =>
          loadedComments.push({ ...doc.data(), id: doc.id })
        );
        setLastDoc(docs.docs[docs.docs.length - 1]);
        setCommentList((prev) => {
          return [...prev, ...loadedComments];
        });
        setHasMore(!docs.empty);
        setLoading(false);
      });
  }, [lastDoc, props.id]);

  const observer = useRef();

  const lastCommentElement = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      let options = {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
      };

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNextComments();
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [fetchNextComments, hasMore]
  );

  return (
    <section className='comment-modal'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={`${classes.modal} commentModal`}
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
              {commentList.map((comment, index) => {
                if (commentList.length === index + 1) {
                  return (
                    <div ref={lastCommentElement} id='lastComment'>
                      <CommentItem
                        key={comment.id}
                        createdAt={comment.createdAt}
                        comment={comment.comment}
                        avatar={comment.avatar}
                        nickName={comment.nickName}
                        rate={comment.rateValue}
                      />
                    </div>
                  );
                } else {
                  return (
                    <CommentItem
                      key={comment.id}
                      createdAt={comment.createdAt}
                      comment={comment.comment}
                      avatar={comment.avatar}
                      nickName={comment.nickName}
                      rate={comment.rateValue}
                    />
                  );
                }
              })}
              {loading && <CircularProgress />}
            </ul>
          </div>
        </Fade>
      </Modal>
    </section>
  );
}
