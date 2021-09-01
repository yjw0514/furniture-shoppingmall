import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { NavLink } from 'react-router-dom';

import './AdminDrawer.css';
import { useAuth } from '../../context/auth-context';

const useStyles = makeStyles({
  list: {
    width: 250,
    marginTop: 20,
    textDecoration: 'none',
  },
  fullList: {
    width: 'auto',
  },
});

export default function NavigationDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const { currentUser } = useAuth();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className='nav__list'>
        <NavLink to='/users/cart'>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary='장바구니' />
          </ListItem>
        </NavLink>
        {!currentUser && (
          <NavLink to='/auth'>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <VpnKeyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='로그인' />
            </ListItem>
          </NavLink>
        )}
        <NavLink to='/category'>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <StorefrontOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='모든제품' />
          </ListItem>
        </NavLink>
        <NavLink to='/admin/products'>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <AccountBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='마이페이지' />
          </ListItem>
        </NavLink>
        <NavLink to='/admin/products'>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <ListAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='구매목록' />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  return (
    <>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
