import React, { useState } from "react";
import "../../Assets/Styles/Common/common.scss";
import "../../Assets/Styles/Avant-garde/navigation.scss";
import logo from "../../Assets/Media/brend.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  IconButton,
  ListItemIcon,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { MoreVert, Language, Brightness4 } from "@material-ui/icons";
//icons
import searchIcon from "../../Assets/Media/search-line.svg";
import userAuth from "../../Assets/Media/login-box-line.svg";
import aboutIcon from "../../Assets/Media/question-icon.png";

const useStyle = makeStyles((theme) => ({
  wrapper: {
    borderRadius: "0 0 .5rem .5rem",
    display: "flex",
    alignItems: "center",
    padding: "0.6rem 1rem",
    minHeight: "20%",
  },

  logo: {
    maxWidth: "4rem",
  },
  link: {
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
  },
  menuItem: {
    borderRadius: ".4rem",
  },
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuList: {
    left: "calc(100% - 50px)",
  },
}));
const Navigation = ({ check, setThemeStatus, themeStatus }) => {
  const classes = useStyle();
  const [anchorElement, setAnchorElement] = useState(null);
  const themeChange = () => {
    setThemeStatus(!themeStatus);
  };
  const handleClick = (e) => {
    setAnchorElement(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorElement(null);
  };

  return (
    <Paper elevation={3}>
      <Grid container className={classes.wrapper}>
        <Grid item xs={7} sm={10}>
          <Link to="/">
            <img src={logo} alt="#" className={classes.logo} />
          </Link>
        </Grid>
        <Grid item xs={5} sm={2} className={classes.flexEnd}>
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Выбор языка"
          >
            <IconButton>
              <Language />
            </IconButton>
          </Tooltip>
          <Tooltip disableFocusListener disableTouchListener title="Смена темы">
            <IconButton onClick={themeChange}>
              <Brightness4 />
            </IconButton>
          </Tooltip>
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Меню навигации"
          >
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={handleClose}
            className={classes.menuList}
          >
            <MenuItem className={classes.menuItem} to="/" component={Link}>
              <ListItemIcon>
                <img src={searchIcon} alt="#" className="link_icon" />
              </ListItemIcon>

              <Typography color="inherit">Поиск расписания</Typography>
            </MenuItem>

            <MenuItem
              className={classes.menuItem}
              to="/documentation"
              component={Link}
            >
              <ListItemIcon>
                <img src={aboutIcon} alt="#" className="link_icon" />
              </ListItemIcon>
              <Typography color="inherit">Документация</Typography>
            </MenuItem>

            {check ? (
              <MenuItem
                className={classes.menuItem}
                to="/workspace"
                component={Link}
              >
                <ListItemIcon>
                  <img src={userAuth} alt="#" className="link_icon" />
                </ListItemIcon>

                <Typography color="inherit">Рабочее пространство</Typography>
              </MenuItem>
            ) : (
              <MenuItem
                className={classes.menuItem}
                to="/auth"
                component={Link}
              >
                <ListItemIcon>
                  <img src={userAuth} alt="#" className="link_icon" />
                </ListItemIcon>

                <Typography color="inherit">Авторизация</Typography>
              </MenuItem>
            )}
          </Menu>
        </Grid>
      </Grid>
    </Paper>
  );
};
const mapStateToProps = (state) => {
  return {
    check: state.admin.login_check,
  };
};
export default connect(mapStateToProps, null)(Navigation);
