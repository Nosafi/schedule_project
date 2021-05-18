import React from "react";
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

const SpecialtiesTable = ({ specialties, department, modal }) => {
  return (
    <Box>
      {specialties ? (
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
              {specialties.map((specialty) => (
                <TableRow>
                  <TableCell>{specialty.Specialties_name}</TableCell>
                  <TableCell>
                    {department.map((department) => {
                      return department.Department_id === specialty.Department
                        ? department.Department_name
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
                        index={specialty.Specialties_id}
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
                        index={specialty.Specialties_id}
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
    department: state.admin.data.department,
    specialties: state.admin.data.specialties,
    faculties: state.admin.data.faculties,
  };
};

export default connect(mapStateToProps, null)(SpecialtiesTable);
