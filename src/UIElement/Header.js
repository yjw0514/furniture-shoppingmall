import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolBar: {
    paddingLeft: 60,
    paddingRight: 60,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  navLink: {
    color: 'black',
    textDecoration: 'none',
    paddingTop: 3,
    marginRight: 30,
  },
  active: {
    borderColor: 'black',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        style={{ backgroundColor: 'rgb(248, 249, 250)', color: 'black' }}
      >
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            LOGO
          </Typography>
          <NavLink
            to='/products'
            className={classes.navLink}
            activeStyle={{
              fontWeight: 'bold',
              color: 'dodgerblue',
            }}
          >
            <Button color='inherit' className={classes.myPage}>
              모든제품
            </Button>
          </NavLink>
          <NavLink
            to='/'
            exact
            className={classes.navLink}
            activeStyle={{
              fontWeight: 'bold',
              color: 'dodgerblue',
            }}
          >
            <Button color='inherit'>로그인</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
