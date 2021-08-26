import React, { useState, useEffect } from "react";
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
  const [userRole, setUserRole] = useState();
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [cartNum, setCartNum] = useState(0);

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
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "rgb(248, 249, 250)",
          color: "black",
        }}
        elevation={2}
      >
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title}>
            <NavLink
              to="/"
              exact
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
          <NavLink
            to="/category"
            exact
            className={classes.navLink}
            activeStyle={{
              fontWeight: "bold",
              color: "dodgerblue",
            }}
          >
            <Button color="inherit" className={classes.myPage}>
              모든제품
            </Button>
          </NavLink>

          {!currentUser && (
            <NavLink
              to="/auth"
              className={classes.navLink}
              activeStyle={{
                fontWeight: "bold",
                color: "dodgerblue",
              }}
            >
              <Button color="inherit">로그인</Button>
            </NavLink>
          )}

          {currentUser && (
            <NavLink
              to="/users/purchaselist"
              className={classes.navLink}
              activeStyle={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              <Button color="inherit">구매내역</Button>
            </NavLink>
          )}

          {currentUser && (
            <NavLink
              to="/users/cart"
              className={classes.navLink}
              activeStyle={{
                fontWeight: "bold",
                color: "dodgerblue",
              }}
            >
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartNum} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </NavLink>
          )}
          {currentUser && <DropdownMenu />}
          {currentUser && userRole === "admin" ? <AdminDrawer /> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
