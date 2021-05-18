import React from "react";
import FacultyOperations from "../../Dispatcher_Modules/Selection_operations/FacultyOperations";
import SpetialityOperation from "../../Dispatcher_Modules/Selection_operations/SpetialityOperations";
import RoomOperation from "../../Dispatcher_Modules/Selection_operations/RoomOperations";
import ObjectOperations from "../../Dispatcher_Modules/Selection_operations/ObjectOperations";
import BuildingOperations from "../../Dispatcher_Modules/Selection_operations/BuildingOperations";

import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
const useStyle = makeStyles((theme) => ({
  paperWrapper: {
    padding: "1rem",
  },
}));
const Edit = ({ close, elem_id, option }) => {
  const classes = useStyle();
  const componentRender = (data) => {
    switch (data) {
      case "faculties_table":
        return <FacultyOperations id={elem_id} close={close} />;
      case "objects_table":
        return <ObjectOperations close={close} id={elem_id} />;
      case "specialties_table":
        return <SpetialityOperation close={close} id={elem_id} />;
      case "building_table":
        return <BuildingOperations id={elem_id} close={close} />;
      case "rooms_table":
        return <RoomOperation close={close} id={elem_id} />;
      default:
        break;
    }
  };
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
                  Редактирование
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
            {componentRender(option)}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Edit;
