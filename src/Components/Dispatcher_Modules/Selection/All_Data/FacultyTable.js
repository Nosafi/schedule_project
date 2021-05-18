import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PageLoader from "../../../Shedule_Modules/PageLoader";
//Material-UI
import {
  IconButton,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";

import { Edit, Delete } from "@material-ui/icons";

const FacultyTable = ({ faculties, modal }) => {
  return (
    <Box>
      {faculties ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Наименование</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Редактирование</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Удаление</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faculties.map((faculty, index) => (
                <TableRow>
                  <TableCell>{faculty.Faculty_name}</TableCell>
                  <TableCell>
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title="Открытие модального окна редактирования"
                    >
                      <IconButton
                        data="edit"
                        index={faculty.Faculty_id}
                        onClick={modal}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title="Открытие модального окна удаления"
                    >
                      <IconButton
                        data="delete"
                        index={faculty.Faculty_id}
                        onClick={modal}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <PageLoader />
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    faculties: state.admin.data.faculties,
  };
};

export default connect(mapStateToProps, null)(FacultyTable);
