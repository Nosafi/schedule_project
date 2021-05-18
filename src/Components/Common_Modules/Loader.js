import React from "react";
import { Grid, makeStyles, FormControl, TextField } from "@material-ui/core";
import loader from "../../Assets/Media/page_loader.gif";
const materialStyle = makeStyles((theme) => ({
  loaderWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  loader: {
    maxWidth: "20rem",
  },
}));
const Loader = () => {
  const itemClass = materialStyle();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={itemClass.loaderWrapper}>
        <img src={loader} alt="Page loader" className={itemClass.loader} />
      </Grid>
    </Grid>
  );
};
export default Loader;
