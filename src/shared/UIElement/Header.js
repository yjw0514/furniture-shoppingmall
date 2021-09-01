import React, { useState, useEffect, useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import AdminDrawer from './AdminDrawer';
import DropdownMenu from './DropdownMenu';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useRef } from 'react';
import { Container } from '@material-ui/core';

import './Header.css';
import NavigationDrawer from './NavigationDrawer';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function Header() {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState();
  const [cartNum, setCartNum] = useState(0);
  const [navbarActive, setNavbarActive] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  const navbarRef = useRef();

  const headerScrollEvent = useCallback(() => {
    if (navToggle) return;
    const navbarHeight = navbarRef.current.getBoundingClientRect().height;
    if (window.scrollY > navbarHeight) {
      setNavbarActive(true);
    } else {
      setNavbarActive(false);
    }
  }, [navToggle]);

  useEffect(() => {
    if (!navbarRef.current) return;
    window.addEventListener('scroll', headerScrollEvent);
    return () => {
      window.removeEventListener('scroll', headerScrollEvent);
    };
  }, [headerScrollEvent]);

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

  useEffect(() => {
    console.log('useeffect header');
    if (currentUser) {
      const cartRef = dbService.collection('cart').doc(currentUser.uid);

      cartRef.onSnapshot((doc) => {
        if (doc.exists) {
          let cartNum = doc.data().products.length;
          setCartNum(cartNum);
        } else {
          return;
        }
      });
    }
  }, [currentUser]);

  return (
    <div className='root'>
      <AppBar
        className={navbarActive ? 'appbar activeAppbar' : 'appbar'}
        position='fixed'
        elevation={navbarActive || navToggle ? 3 : 0}
      >
        <Container maxWidth='lg'>
          <Toolbar className='toolbar' ref={navbarRef}>
            <Button
              href='/'
              className={
                navbarActive ? ' header-title activeHeader' : ' header-title'
              }
            >
              FUTURELIFE
            </Button>
            <div
              className={
                navToggle ? `navMenuList navListActive` : 'navMenuList'
              }
            >
              <Button href='/category' className='navLink'>
                모든제품
              </Button>
              {!currentUser && (
                <Button href='/auth' className='navLink'>
                  로그인
                </Button>
              )}

              {currentUser && (
                <Button href='/users/purchaselist' className='navLink'>
                  구매내역
                </Button>
              )}
              {currentUser && <DropdownMenu className='navLink' />}
              {currentUser && (
                <IconButton
                  aria-label='cart'
                  href='/users/cart'
                  className='cart'
                >
                  <StyledBadge badgeContent={cartNum} color='secondary'>
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              )}
              {currentUser && userRole === 'admin' ? (
                <AdminDrawer navToggle={navToggle} />
              ) : null}
            </div>
          </Toolbar>
        </Container>
        <div
          className='menuIcon'
          onClick={() => {
            setNavToggle((prev) => !prev);
          }}
        >
          <NavigationDrawer />
        </div>
      </AppBar>
    </div>
  );
}
