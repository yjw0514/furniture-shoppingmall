import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

export default function DropdownMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const { logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    logout();
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        onClick={handleClick}
        style={
          location.pathname === '/users/profile' ? { color: 'dodgerblue' } : {}
        }
      >
        마이페이지
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          to='/users/profile'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
}
