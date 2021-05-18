import React from "react";
import "../../Assets/Styles/Avant-garde/footer.scss";
import "../../Assets/Styles/Common/common.scss";
import {
  Container,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Button,
  Paper,
  IconButton,
  Typography,
} from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  wrapper: {
    // background: "white",
    borderRadius: ".5rem .5rem 0 0",
    display: "flex",
    alignItems: "center",
    padding: "0.6rem 1rem",
    minHeight: "3rem",
    margin: "auto",
  },
}));
const Footer = () => {
  const classes = useStyle();
  return (
    <Paper elevation={3}>
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} sm={12}>
          <Typography>БНТУ &copy; 2021</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Footer;
