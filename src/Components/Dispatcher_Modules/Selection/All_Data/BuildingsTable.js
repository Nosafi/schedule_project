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

const BuildingTable = ({ building, modal }) => {
  return (
    <Box>
      {building ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Номер корпуса</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Адрес корпуса</Typography>
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
              {building.map((building, index) => (
                <TableRow>
                  <TableCell>{building.build_number}</TableCell>
                  <TableCell>{building.build_adress}</TableCell>
                  <TableCell>
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title="Открытие модального окна редактирования"
                    >
                      <IconButton
                        data="edit"
                        index={building.build_id}
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
                        index={building.build_id}
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
    building: state.admin.data.building,
  };
};

export default connect(mapStateToProps, null)(BuildingTable);
