import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = (props) => {
  const classes = useStyles();
  const nextPath = (path) => {
    props.history.push(path);
  };
  const logout = () => {
    localStorage.removeItem("token");
    props.setIsLoggedIn(false);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => nextPath("/")}
        >
          Nabeela's Art
        </Typography>
        {props.isLoggedIn ? (
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => nextPath("/admin")}>
            Admin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default withRouter(Header);
