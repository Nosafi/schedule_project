import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteFromApi } from "../../../Redux/admin-actions";

import {
  Grid,
  makeStyles,
  TextField,
  Paper,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
const useStyle = makeStyles((theme) => ({
  paperWrapper: {
    padding: "1rem",
  },
}));
const Delete = ({
  groups,
  rooms,
  building,
  department,
  faculties,
  specialties,
  disciplines,
  elem_id,
  close,
  option,
}) => {
  useEffect(() => {
    switch (option) {
      case "groups_table":
        return setItemData({
          ...itemData,
          table: "Учебные группы",
          data: groups
            .filter((group) => group.Group_id.toString() === elem_id)
            .map((group) => group),
        });
      case "objects_table":
        return setItemData({
          ...itemData,
          table: "Предметы",
          data: disciplines
            .filter((discipline) => discipline.Object_id.toString() === elem_id)
            .map((discipline) => discipline),
        });
      case "specialties_table":
        return setItemData({
          ...itemData,
          table: "Специальности",
          data: specialties
            .filter(
              (specialty) => specialty.Specialties_id.toString() === elem_id
            )
            .map((specialty) => specialty),
        });
      case "faculties_table":
        return setItemData({
          ...itemData,
          table: "Факультеты",
          data: faculties
            .filter((faculty) => faculty.Faculty_id.toString() === elem_id)
            .map((faculty) => faculty),
        });
      case "rooms_table":
        return setItemData({
          ...itemData,
          table: "Аудитории",
          data: rooms
            .filter((room) => room.Room_id.toString() === elem_id)
            .map((faculty) => faculty),
        });

      case "building_table":
        return setItemData({
          ...itemData,
          table: "Здания и адреса",
          data: building
            .filter((building) => building.build_id.toString() === elem_id)
            .map((building) => building),
        });
      default:
        break;
    }
  }, []);
  const [itemData, setItemData] = useState({
    table: "",
    data: {},
  });
  const dispatch = useDispatch();
  const modal_action = (e) => {
    let dataForAPI = {
      table: option,
      id: elem_id,
    };
    e.preventDefault();
    dispatch(deleteFromApi(dataForAPI));
    close();
  };
  const showElements = () => {
    return Object.entries(itemData.data).map((item, index) => {
      if (typeof item[1] === "object") {
        return Object.entries(item[1]).map((item, index) => {
          return (
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                key={item + index}
                placeholder={item[1].toString()}
                disabled
              />
            </Grid>
          );
        });
      }
    });
  };
  const classes = useStyle();
  return (
    <Box className="modal_body">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={5}>
            <Grid
              container
              xs={12}
              alignItems="center"
              spacing={2}
              justify="space-around"
            >
              <Grid item xs={7}>
                <Typography component="h5" variant="h5">
                  Удаление
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container xs={12} justify="flex-end">
                  <Tooltip
                    disableFocusListener
                    disableTouchListener
                    title="Закрыть модальное окно"
                  >
                    <IconButton onClick={close}>
                      <Cancel />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={5} className={classes.paperWrapper}>
            <form
              className="modalForm"
              onSubmit={(event) => {
                modal_action(event);
              }}
            >
              <Grid container spacing={2}>
                {showElements()}
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined">
                    Удалить
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.admin.data.groups,
    rooms: state.admin.data.rooms,
    building: state.admin.data.building,
    department: state.admin.data.department,
    faculties: state.admin.data.faculties,
    specialties: state.admin.data.specialties,
    disciplines: state.admin.data.disciplines,
  };
};

export default connect(mapStateToProps, null)(Delete);
