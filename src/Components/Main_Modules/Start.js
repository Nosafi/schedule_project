import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import { Redirect } from "react-router-dom";
import Loader from "../Common_Modules/Loader";

import { connect, useDispatch } from "react-redux";
import { loadDataFromApi } from "../../Redux/actions.js";

import {
  showSheduleOfGroup,
  showSheduleOfTeacher,
  loadShedule,
} from "../../Redux/actions";

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
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem 0",
  },
  brand: {
    "&:hover": {
      backgroundColor: "#008054",
      color: "white",
    },
  },
  textarea: {
    "& label.Mui-focused": {
      color: "#008054",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#008054",
      },
    },
  },
}));

const InitialPage = ({ response }) => {
  const itemClass = useStyle();
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({
    faculty: null,
    searchType: null,
    searchItem: {
      groups: null,
      teachers: null,
      final: null,
    },
    redirect: false,
  });
  useEffect(() => {
    dispatch(loadDataFromApi());
    dispatch(loadShedule());
  }, [dispatch]);
  const finalResolve = (e) => {
    e.preventDefault();
    return searchData.faculty
      ? searchData.searchType === "group"
        ? (() => {
            dispatch(showSheduleOfGroup(searchData.searchItem.final));
            setSearchData({ ...searchData, redirect: true });
          })()
        : (() => {
            dispatch(
              showSheduleOfTeacher(searchData.searchItem.final.split(" ")[0])
            );
            setSearchData({ ...searchData, redirect: true });
          })()
      : false;
  };
  const changeWatcher = (e, type) => {
    switch (type) {
      case "faculty":
        return setSearchData(
          update(searchData, {
            faculty: { $set: e.currentTarget.innerText.split("-")[0] },
            searchType: { $set: null },
          })
        );
      case "searchType":
        return e.currentTarget.value === "group"
          ? setSearchData(
              update(searchData, {
                searchType: { $set: e.currentTarget.value },
                searchItem: {
                  groups: {
                    $set: response.groups
                      .filter((group) =>
                        response.specialties
                          .filter((specialty) =>
                            response.department
                              .filter(
                                (department) =>
                                  department.facult_id ==
                                  response.faculties
                                    .filter(
                                      (faculty) =>
                                        faculty.facult_id ===
                                        Number(searchData.faculty)
                                    )
                                    .map((faculty) => Number(faculty.facult_id))
                              )
                              .map((department) => department.depart_id)
                              .includes(specialty.depart_id)
                          )
                          .map((spetiality) => spetiality.spec_id)
                          .includes(group.group_specialization)
                      )
                      .map((group) => group),
                  },
                },
              })
            )
          : setSearchData(
              update(searchData, {
                searchType: { $set: e.currentTarget.value },
                searchItem: {
                  teachers: {
                    $set: response.teachers
                      .filter((teacher) =>
                        response.department
                          .filter(
                            (department) =>
                              department.facult_id ===
                              Number(
                                response.faculties
                                  .filter(
                                    (faculty) =>
                                      faculty.facult_id ===
                                      Number(searchData.faculty)
                                  )
                                  .map((faculty) => faculty.facult_id)
                              )
                          )
                          .map((department) => department.depart_id)
                          .includes(teacher.teach_depart)
                      )
                      .map((teacher) => teacher),
                  },
                },
              })
            );
      case "groups":
        return setSearchData(
          update(searchData, {
            searchItem: {
              final: { $set: e.currentTarget.innerText.split(" - ")[1] },
            },
          })
        );
      default:
        break;
    }
  };
  return (
    <Grid container className={itemClass.container}>
      {!searchData.redirect ? (
        response.length !== 0 ? (
          <Grid item xs={9}>
            <form onSubmit={finalResolve.bind(this)}>
              <Paper>
                <Grid container className={itemClass.wrapper}>
                  <Grid item xs={11}>
                    <Autocomplete
                      options={response.faculties.sort(
                        (a, b) => a.facult_id - b.facult_id
                      )}
                      onInputChange={(e) => changeWatcher(e, "faculty")}
                      size="small"
                      getOptionLabel={(option) => option.facult_name}
                      renderOption={(option) => {
                        return (
                          <Box>
                            {option.facult_id} - {option.facult_name}
                          </Box>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ID - Факультет"
                          margin="normal"
                          helperText="Обязательное поле*"
                          className={itemClass.textarea}
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  {searchData.faculty ? (
                    <Grid item xs={11}>
                      <FormControl>
                        <FormLabel>
                          <Typography variant="body2">
                            Выберите тип поиска:
                          </Typography>
                        </FormLabel>
                        <RadioGroup
                          row
                          name="typeOfSearch"
                          value={searchData.searchType || ""}
                          onChange={(e) => changeWatcher(e, "searchType")}
                        >
                          <FormControlLabel
                            value="group"
                            labelPlacement="end"
                            label="По учебной группе"
                            control={<Radio color="default" />}
                          />
                          <FormControlLabel
                            value="teacher"
                            labelPlacement="end"
                            control={<Radio color="default" />}
                            label="По преподавателю"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  ) : (
                    false
                  )}
                  {searchData.searchType ? (
                    <Grid item xs={11}>
                      <Autocomplete
                        options={
                          searchData.searchType === "group"
                            ? searchData.searchItem.groups.sort(
                                (a, b) => a.group_id - b.group_id
                              )
                            : searchData.searchItem.teachers.sort(
                                (a, b) => a.teach_id - b.teach_id
                              )
                        }
                        getOptionLabel={(option) =>
                          searchData.searchType === "group"
                            ? option.group_number || ""
                            : option.teach_lastName || ""
                        }
                        onInputChange={(e) => changeWatcher(e, "groups")}
                        size="small"
                        renderOption={(option) => {
                          return searchData.searchType === "group" ? (
                            <Box>
                              {option.group_id} - {option.group_number}
                            </Box>
                          ) : (
                            <Box>
                              {option.teach_id} - {option.teach_lastName + " "}
                              {option.teach_firstName.split("")[0] + "."}
                              {option.teach_patronymic.split("")[0] + "."}
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={
                              searchData.searchType === "group"
                                ? "ID - Номер"
                                : "ID - ФИО"
                            }
                            margin="normal"
                            helperText="Обязательное поле*"
                            className={itemClass.textarea}
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                  ) : (
                    false
                  )}
                  {searchData.searchItem.final && searchData.searchType ? (
                    <Grid item xs={11}>
                      <Button
                        variant="outlined"
                        size="large"
                        className={itemClass.brand}
                        type="submit"
                        color="default"
                      >
                        Поиск
                      </Button>
                    </Grid>
                  ) : (
                    false
                  )}
                </Grid>
              </Paper>
            </form>
          </Grid>
        ) : (
          <Loader />
        )
      ) : (
        <Redirect to="/schedules" />
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    response: state.schedulesSearch.response,
  };
};
export default connect(mapStateToProps, null)(InitialPage);
