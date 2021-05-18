import React from "react";
import { connect } from "react-redux";
import PageLoader from "../../../Shedule_Modules/PageLoader";

//Material-UI
import {
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  ButtonGroup,
  Button,
  Paper,
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

const ObjectsTable = ({
  disciplines,
  disciplines_types,
  department,
  modal,
}) => {
  return (
    <Box>
      {disciplines ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Наименование</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Кафедра</Typography>
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
              {disciplines.map((discipline, index) => (
                <TableRow>
                  <TableCell>{discipline.Object_name}</TableCell>
                  <TableCell>
                    {department.map((depart) => {
                      return depart.Department_id === discipline.Object_depart
                        ? depart.Department_name
                        : false;
                    })}
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title="Открытие модального окна редактирования"
                    >
                      <IconButton
                        data="edit"
                        index={discipline.Object_id}
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
                        index={discipline.Object_id}
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
    disciplines_types: state.admin.data.disciplines_types,
    disciplines: state.admin.data.disciplines,
    department: state.admin.data.department,
  };
};

export default connect(mapStateToProps, null)(ObjectsTable);
