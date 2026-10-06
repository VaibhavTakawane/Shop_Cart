import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";

import {
  ShoppingCart,
  AccountCircle,
} from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import SearchBox from "./SearchBox";
import logo from "../logo.png";

import { logout } from "../redux/slices/userSlice";

const useStyles = makeStyles(() => ({
  appBar: {
    background:
      "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
    boxShadow: "0 4px 18px rgba(0, 0, 0, 0.18)",
  },

  toolbar: {
    minHeight: 70,
    display: "flex",
    alignItems: "center",
    padding: "8px 20px",
    gap: 8,

    "@media (max-width: 700px)": {
      minHeight: 112,
      padding: "8px 12px",
      flexWrap: "wrap",
      alignContent: "center",
    },
  },

  logoLink: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },

  logo: {
    height: 56,
    width: "auto",
    display: "block",
    transition: "transform 0.2s ease",

    "&:hover": {
      transform: "scale(1.04)",
    },

    "@media (max-width: 700px)": {
      height: 46,
    },

    "@media (max-width: 380px)": {
      height: 42,
    },
  },

  searchContainer: {
    width: "min(500px, 45vw)",
    marginLeft: 25,

    "@media (max-width: 900px)": {
      width: "42vw",
      marginLeft: 12,
    },

    "@media (max-width: 700px)": {
      order: 3,
      width: "100%",
      marginLeft: 0,
      marginTop: 4,
      flexBasis: "100%",
    },
  },

  spacer: {
    flexGrow: 1,

    "@media (max-width: 700px)": {
      display: "block",
    },
  },

  iconButton: {
    color: "#ffffff !important",
    width: 44,
    height: 44,
    borderRadius: 10,
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
      transform: "translateY(-2px)",
    },

    "@media (max-width: 700px)": {
      width: 40,
      height: 40,
    },
  },

  menuItem: {
    minWidth: 180,
  },
}));

const Header = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    history.push("/");
  };

  return (
    <AppBar
      position="static"
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>

        {/* =========================
            LOGO
        ========================== */}
        <Link
          to="/"
          className={classes.logoLink}
        >
          <img
            src={logo}
            alt="ShopCart"
            className={classes.logo}
          />
        </Link>

        {/* =========================
            SEARCH
        ========================== */}
        <div className={classes.searchContainer}>
          <SearchBox />
        </div>

        {/* =========================
            SPACER
        ========================== */}
        <div className={classes.spacer} />

        {/* =========================
            CART
        ========================== */}
        <IconButton
          aria-label="show cart items"
          component={Link}
          to="/cart"
          className={classes.iconButton}
        >
          <ShoppingCart />
        </IconButton>

        {/* =========================
            ACCOUNT
        ========================== */}

        {userDetails ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              className={classes.iconButton}
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleMenuClose}
            >

              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/profile"
                onClick={handleMenuClose}
              >
                Profile
              </MenuItem>

              <MenuItem
                className={classes.menuItem}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>

            </Menu>
          </>
        ) : (
          <IconButton
            aria-label="login"
            component={Link}
            to="/login"
            className={classes.iconButton}
          >
            <AccountCircle />
          </IconButton>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Header;