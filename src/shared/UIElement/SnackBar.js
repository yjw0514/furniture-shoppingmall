import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
export default function SnackBar(props) {
  let content = (
    <Snackbar
      open={props.sccessModalOpen}
      autoHideDuration={6000}
      onClose={props.closeSuccessModal}
      style={{ position: 'absolute', bottom: '0' }}
    >
      <Alert onClose={props.closeSuccessModal} severity='success'>
        This is a success message!
      </Alert>
    </Snackbar>
  );
  return content;
  // ReactDOM.createPortal(
  //   content,
  //   document.getElementById('snackbar-hook')
  // );
}
