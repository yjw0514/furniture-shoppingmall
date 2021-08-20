import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import AdminDrawer from './AdminDrawer';
import DropdownMenu from './DropdownMenu';

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
    marginLeft: 30,
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
  const [userRole, setUserRole] = useState();
  const classes = useStyles();
  const { currentUser } = useAuth();

  if (currentUser) {
    dbService
      .collection('users')
      .where('userId', '==', currentUser.uid)
      .get()
      .then((data) => {
        return setUserRole(data.docs[0].id);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        style={{
          backgroundColor: 'rgb(248, 249, 250)',
          color: 'black',
        }}
        elevation={2}
      >
        <Toolbar className={classes.toolBar}>
          <Typography variant='h6' className={classes.title}>
            <NavLink
              to='/'
              exact
              className={classes.navLink}
              style={{
                fontWeight: 'bold',
                color: 'rgb(150, 183, 108)',
                fontSize: '28px',
              }}
            >
              FUTURELIFE
            </NavLink>
          </Typography>
          <NavLink
            to='/category'
            exact
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

          {!currentUser && (
            <NavLink
              to='/auth'
              className={classes.navLink}
              activeStyle={{
                fontWeight: 'bold',
                color: 'dodgerblue',
              }}
            >
              <Button color='inherit'>로그인</Button>
            </NavLink>
          )}

          {currentUser && (
            <NavLink
              to='/users/cart'
              className={classes.navLink}
              activeStyle={{
                fontWeight: 'bold',
                color: 'dodgerblue',
              }}
            >
              <Button color='inherit'>Cart</Button>
            </NavLink>
          )}
          {currentUser && <DropdownMenu />}
          {currentUser && userRole === 'admin' ? <AdminDrawer /> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
