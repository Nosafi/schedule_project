import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  wrapper: {
    padding: "1rem 0",
    display: "flex",
    alignItems: "center",
    margin: "0",
  },
  item_wrapper: {
    padding: "1rem",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));
const SingleSchedule = ({ single, filter }) => {
  const typeViewer = (data) => {
    switch (data) {
      case "lection":
        return "Лекция";
      case "pr_gr1":
        return "Практика 1 подгр.";
      case "pr_gr2":
        return "Практика 2 подгр.";
      default:
        break;
    }
  };
  const filterLogic = (data) => {
    switch (filter) {
      case "all":
        return data.filter((item) => item);
      case "odd":
        return data.filter((item) => item && item.repeat === "Четные");
      case "even":
        return data.filter((item) => item && item.repeat === "Нечетные");

      default:
        break;
    }
  };
  const classes = useStyle();
  return (
    <Grid
      container
      xs={12}
      className={classes.wrapper}
      spacing={4}
      elevation={3}
    >
      {filterLogic(single).map((single, index) => (
        <Grid item key={single + index} xs={12} sm={4}>
          <Paper elevation={8}>
            <Grid container className={classes.item_wrapper} spacing={2}>
              <Grid item xs={12} className={classes.item}>
                <Typography variant="h6" component="h6">
                  {single.subject}
                </Typography>
                <Typography variant="body1" component="body1">
                  {single.time}
                </Typography>
                <Typography variant="body1" component="body1">
                  {single.types}
                </Typography>
                <Typography variant="body2" component="body2">
                  {single.address} аудитория {single.audience}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  {single.teacher.split(" ")[1]} {single.teacher.split("")[0]}.
                  {single.teacher.split(" ")[2].split("")[0]}.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SingleSchedule;
