import React from "react";
import { Paper, Grid, Box } from "@material-ui/core";

const Modal = ({ modalType }) => {
  return (
    <Box className="modal">
      <Box className="modalContent">
        <Grid container xs={12} justify="center">
          <Grid item className="modalPaper">
            <Paper>{modalType}</Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Modal;
