import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import { useDispatch } from "react-redux";
import { createNewData } from "../../../Redux/admin-actions";
import { editOperation } from "../../../Redux/admin-actions";
import { dataValidation } from "./InputValidator";
import { connect } from "react-redux";
import Alert from "../../Modal/Alerts/Alert";

//Material-UI
import { Grid, TextField, Button } from "@material-ui/core";

const FacultyOperations = ({ id = "", faculties, close }) => {
  const dispatch = useDispatch();
  const [noChange, setNoChange] = useState(false);
  const [name_Error, setNameError] = useState(false);
  const [facultyData, setFacultyData] = useState({
    id: "",
    check: false,
    wasData: "",
    facultyName: "",
  });
  useEffect(() => {
    if (id) {
      faculties.filter((item) => {
        if (item.Faculty_id.toString() === id) {
          setFacultyData({
            ...facultyData,
            id: id,
            wasData: item.Faculty_name,
          });
        }
      });
    }
  }, []);
  const facultyTableValidation = (e) => {
    e.preventDefault();
    Object.entries(facultyData).map((item) => {
      switch (item[0]) {
        case "facultyName":
          return id
            ? item[1]
              ? !dataValidation("limited string", item[1]) || item[1] === ""
                ? setNameError(true)
                : false
              : false
            : !dataValidation("limited string", item[1]) || item[1] === ""
            ? setNameError(true)
            : false;
        default:
          break;
      }
    });
    setFacultyData(
      update(facultyData, {
        check: { $set: true },
      })
    );
    let data = id
      ? {
          id: facultyData.id,
          faculty_name: facultyData.facultyName || facultyData.wasData,
        }
      : { faculty_name: facultyData.facultyName };

    if (facultyData.check && !name_Error) {
      id
        ? data.faculty_name === facultyData.wasData
          ? setNoChange(true)
          : dispatch(editOperation("faculties_table", data)) && close()
        : dispatch(createNewData("faculties_table", data)) && close();
    }
  };
  const dataChange = (e) => {
    setNoChange(false);
    setFacultyData(
      update(facultyData, {
        check: { $set: false },
        facultyName: { $set: e.target.value },
      })
    ) || setNameError(false);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <form onSubmit={(e) => facultyTableValidation(e)} className="modalForm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {noChange ? (
                <Alert error="noChange" noChange={noChange} />
              ) : (
                false
              )}
              <TextField
                fullWidth
                variant="outlined"
                error={!name_Error ? false : true}
                helperText={!name_Error ? "" : "Проверьте вводимые данные"}
                onChange={dataChange}
                label={
                  id
                    ? "Наименование факультета: " + facultyData.wasData
                    : "Введите наименование факультета..."
                }
                value={facultyData.facultyName}
              />
            </Grid>

            <Grid item xs={12}>
              {!facultyData.check ? (
                <Button variant="outlined" type="submit">
                  Проверить данные
                </Button>
              ) : (
                <Button variant="outlined" type="submit">
                  Добавить
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    faculties: state.admin.data.faculties,
  };
};

export default connect(mapStateToProps, null)(FacultyOperations);
