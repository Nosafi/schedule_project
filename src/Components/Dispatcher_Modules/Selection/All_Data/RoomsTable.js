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

const RoomsTable = ({ rooms, rooms_types, department, building, modal }) => {
  return (
    <Box>
      {rooms ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Номер</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Тип</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Кафедра</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Адрес</Typography>
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
              {rooms.map((room, index) => (
                <TableRow>
                  <TableCell>{room.Room_number}</TableCell>
                  <TableCell>
                    {rooms_types.map((type) => {
                      return type.Type_id === room.Type_number
                        ? type.Type_name
                        : false;
                    })}
                  </TableCell>
                  <TableCell>
                    {department.map((depart) => {
                      return depart.Department_id === room.Room_depart
                        ? depart.Department_name
                        : false;
                    })}
                  </TableCell>
                  <TableCell>
                    {building.map((building) => {
                      return building.build_id === room.Room_Building
                        ? building.build_number + "к. " + building.build_adress
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
                        index={room.Room_id}
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
                        index={room.Room_id}
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
    rooms_types: state.admin.data.rooms_types,
    department: state.admin.data.department,
    rooms: state.admin.data.rooms,
    building: state.admin.data.building,
  };
};

export default connect(mapStateToProps, null)(RoomsTable);
