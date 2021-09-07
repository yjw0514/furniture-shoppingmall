import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';

export default function CircularLoading() {
  return (
    <>
      <Container maxWidth='lg' style={{ height: '100vh' }}>
        <CircularProgress style={{ margin: '30% 50%' }} />
      </Container>
    </>
  );
}
