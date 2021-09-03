import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  bar: {
    position: 'fixed',
    bottom: '50%',
    // transform: "translate(-50%, -50%)",
    left: '50%',
    '@media (max-width: 500px)': {
      width: '60px',
    },
  },
}));

export default function SnackBar(props) {
  const classes = useStyles();

  let content = (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.close}
      className={classes.bar}
    >
      <Alert onClose={props.close} severity='success'>
        {props.children}
      </Alert>
    </Snackbar>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('snackbar-hook')
  );
}
