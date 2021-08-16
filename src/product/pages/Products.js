import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase';

import Container from '@material-ui/core/Container';
import { Grid, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 340,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(
      dbService.collection('products').onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
      })
    );
  }, []);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth='lg'>
        <h1>Product</h1>
        <Grid item xs={12}>
          <Grid container justifyContent='center' spacing={8}>
            {products &&
              [0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
                <Grid key={value} item>
                  <Paper className={classes.paper} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
