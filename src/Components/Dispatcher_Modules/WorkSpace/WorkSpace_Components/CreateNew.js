import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {
  newTableToBD,
  loadDataForAdmin,
} from "../../../../Redux/admin-actions";
import Table from "./Table";

//Material-UI
import { Grid, makeStyles, Button, Box, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
const useStyle = makeStyles((theme) => ({
  autocomplete: {
    marginTop: "0",
  },
}));
const CreateNew = ({
  group_call,
  all_data,
  workWithTableStatus,
  workWithTable,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDataForAdmin());
  }, [dispatch]);

  const itemClass = useStyle();
  const [tableName, setTableName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [semester, setSemester] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [semestrError, setSemestrError] = useState(false);
  const data = new Map();
  const list = [];
  const changeWatcher = (e) => {
    switch (
      e.target.getAttribute("data-type") ||
      e.target.children[0].dataset.type
    ) {
      case "tableName":
        setTableName(e.target.value);
        setNameError(false);
        break;
      case "tableGroup":
        return data.set(
          Number(e.currentTarget.children[0].dataset.index),
          e.currentTarget.children[0].innerText.split(" - ")[1]
        );

      case "tableSemester":
        setSemestrError(false);
        e.target.value < 12
          ? setSemester(e.target.value)
          : setSemestrError(true);
        break;
      default:
        break;
    }
  };
  for (let i = 0; i < group_call; i++) {
    data.set(i, "");
    list.push(
      <Autocomplete
        options={all_data.groups.sort((a, b) => a.group_id - b.group_id)}
        size="small"
        getOptionLabel={(option) => option.group_number}
        onChange={changeWatcher}
        renderOption={(option) => {
          return (
            <Box data-type="tableGroup" data-index={i}>
              {option.group_id} - {option.group_number}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="ID - Учебная группа"
            margin="normal"
            helperText={`Обязательное поле № ${i + 1}*`}
            variant="outlined"
            className={itemClass.autocomplete}
            // inputProps={{ "data-type": "tableSemester" }}
          />
        )}
      />
    );
  }

  const validateTableData = () => {
    if (
      (tableName
        ? all_data.list_of_names.filter((item) => item.title_name === tableName)
        : false
      ).length
    ) {
      setNameError(true);
    }
    if (
      !(
        tableName
          ? all_data.list_of_names.filter(
              (item) => item.title_name === tableName
            )
          : false
      ).length &&
      data.size &&
      semester
    ) {
      dispatch(
        newTableToBD({
          title_name: tableName,
          title_semestr: semester,
        })
      );
      setGroupList(
        ...groupList,
        all_data.groups
          .filter((group) =>
            Array.from(data.values()).includes(group.group_number)
          )
          .map((item) => item.group_id)
      );
      workWithTableStatus(true);
    }
  };

  return (
    <Grid container spacing={2} justify="center">
      {workWithTable ? (
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                onClick={() => {
                  workWithTableStatus(false);
                }}
                value="Закрыть открытую таблицу"
              />
            </Grid>
            <Grid item xs>
              <Table
                group_mass={groupList}
                data={[]}
                table_name={tableName}
                semestr={semester}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label="Введите наименование"
                error={nameError ? true : false}
                onChange={changeWatcher}
                inputProps={{ "data-type": "tableName" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                label="Введите семестр"
                error={semestrError ? true : false}
                helperText={
                  semestrError
                    ? "Значение семестра не может быть больше 12*"
                    : false
                }
                onChange={changeWatcher}
                inputProps={{ "data-type": "tableSemester" }}
              />
            </Grid>

            <Grid item xs={12}>
              {group_call ? (
                <Grid container>
                  {list.map((item, index) => (
                    <Grid item xs={12} key={index + Math.random()}>
                      {item}
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button variant="outlined" onClick={validateTableData}>
                      Создать
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                false
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    all_data: state.admin.data,
  };
};

export default connect(mapStateToProps, null)(CreateNew);
