import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../context/auth-context";
import { dbService } from "../../firebase";
import AdminDrawer from "./AdminDrawer";
import DropdownMenu from "./DropdownMenu";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useRef } from "react";
import MenuIcon from "@material-ui/icons/Menu";

import "./Header.css";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  toolBar: {
    transition: "all 200ms ease",
    backgroundColor: "white",
    paddingLeft: 60,
    paddingRight: 60,
  },

  toolBarOnToggle: {
    padding: 0,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 30,
  },

  navLink: {
    color: "black",
    textDecoration: "none",
    paddingTop: 3,
    marginRight: 30,
  },
  active: {
    borderColor: "black",
  },
}));

export default function Header() {
  const classes = useStyles();
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
    window.addEventListener("scroll", headerScrollEvent);
    return () => {
      window.removeEventListener("scroll", headerScrollEvent);
    };
  }, [headerScrollEvent]);

  if (currentUser) {
    dbService
      .collection("users")
      .where("userId", "==", currentUser.uid)
      .get()
      .then((data) => {
        return setUserRole(data.docs[0].id);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log("useeffect header");
    if (currentUser) {
      const cartRef = dbService.collection("cart").doc(currentUser.uid);

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
    <div className={classes.root}>
      <AppBar
        className="appbar"
        position="fixed"
        style={{
          color: "black",
          backgroundColor: "white",
        }}
        elevation={navbarActive ? 3 : 0}
      >
        <Toolbar
          className={
            navToggle
              ? `toolBarOnToggle navbar ${classes.toolBar}`
              : `${classes.toolBar} navbar`
          }
          ref={navbarRef}
          style={
            navbarActive
              ? {
                  padding: "10px 40px 10px",
                }
              : null
          }
        >
          <Typography variant="h6" className={classes.title}>
            <NavLink
              to="/"
              className={classes.navLink}
              style={{
                fontWeight: "bold",
                color: "rgb(150, 183, 108)",
                fontSize: "28px",
              }}
            >
              FUTURELIFE
            </NavLink>
          </Typography>
          <div
            className={navToggle ? `navMenuList navListActive` : "navMenuList"}
          >
            <Button href="/category" className={`${classes.navLink}`}>
              모든제품
            </Button>

            {!currentUser && (
              <Button href="/auth" className={classes.navLink}>
                로그인
              </Button>
            )}

            {currentUser && (
              <Button href="/users/purchaselist" className={classes.navLink}>
                구매내역
              </Button>
            )}

            {currentUser && (
              <IconButton
                aria-label="cart"
                href="/users/cart"
                className="cart"
                style={
                  navToggle
                    ? { borderRadius: "0px", marginRight: "10px" }
                    : { borderRadius: "0px", marginRight: "30px" }
                }
              >
                <StyledBadge badgeContent={cartNum} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            )}
            {currentUser && <DropdownMenu />}
            {currentUser && userRole === "admin" ? (
              <AdminDrawer navToggle={navToggle} />
            ) : null}
          </div>
        </Toolbar>
        <div
          className="menuIcon"
          onClick={() => {
            setNavToggle((prev) => !prev);
          }}
        >
          <MenuIcon />
        </div>
      </AppBar>
    </div>
  );
}
