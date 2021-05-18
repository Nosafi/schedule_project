import React, { useState } from "react";
import SingleSchedule from "./SingleSchedule";
import CONFIG from "../../CONFIG.json";
import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  wrapper: {
    borderRadius: ".5rem",
    display: "flex",
    alignItems: "center",
    padding: "0.6rem 1rem",
    minHeight: "3rem",
    margin: "1rem 0",
  },
  header: {
    borderBottom: ".15rem solid black",
  },
}));
const SchedulesWrapper = ({ data }) => {
  const classes = useStyle();
  const [filtrationType, setFiltrationType] = useState("all");
  const filtration = (e) => {
    switch (e.target.value) {
      case "all":
        return setFiltrationType("all");
      case "odd":
        return setFiltrationType("odd");
      case "even":
        return setFiltrationType("even");
      default:
        break;
    }
  };
  return (
    <div>
      <Paper elevation={3}>
        <Grid container className={classes.wrapper}>
          <Grid item xs={11}>
            <FormControl>
              <FormLabel>
                <Typography variant="body2">
                  Выберите тип фильтрации:
                </Typography>
              </FormLabel>
              <RadioGroup
                row
                name="typeOfSearch"
                onChange={filtration}
                defaultValue="all"
              >
                <FormControlLabel
                  value="all"
                  labelPlacement="end"
                  label="Все"
                  control={<Radio color="default" />}
                />
                <FormControlLabel
                  value="even"
                  labelPlacement="end"
                  control={<Radio color="default" />}
                  label="Четная неделя"
                />
                <FormControlLabel
                  value="odd"
                  labelPlacement="end"
                  control={<Radio color="default" />}
                  label="Нечетная неделя"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      {data.map((item, index) => (
        <Paper elevation={3} key={item + index}>
          <Grid container className={classes.wrapper}>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h5"
                component="h5"
                className={classes.header}
              >
                {CONFIG.days[index]}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <SingleSchedule single={item} filter={filtrationType} />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default SchedulesWrapper;
