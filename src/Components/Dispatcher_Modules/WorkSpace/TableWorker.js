import React, { useState } from "react";
import { connect } from "react-redux";
import "../../../Assets/Styles/tableworker.scss";
import ListOfTables from "./WorkSpace_Components/ListOfTables";
import CreateNew from "./WorkSpace_Components/CreateNew";
import Table from "./WorkSpace_Components/Table";
import addIcon from "../../../Assets/Media/add-line.svg";
import editIcon from "../../../Assets/Media/edit-line.svg";

//Material-UI
import { Grid, Button, TextField } from "@material-ui/core";
import { Edit, Add, Close } from "@material-ui/icons";

const TableWorker = ({ choice, all_data }) => {
  const [workWithTable, setWorkWithTable] = useState(false);

  const [isNew, setIsNew] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [listWatcher, setListWatcher] = useState(false);

  const [numberOfColl, setNumberOfColl] = useState();
  const [groupsCall, setGroupsCall] = useState(null);

  function generateTableData() {
    if (numberOfColl > 0) {
      setGroupsCall(numberOfColl);
      setIsOpen(true);
    } else {
      alert("Количество групп должно быть больше нуля!");
    }
  }

  return (
    <Grid container spacing={2} justify="center">
      {choice === "newSchedules" && !workWithTable && !isNew ? (
        <Grid item xs={6}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="Количество групп"
                  onChange={(e) => {
                    setNumberOfColl(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    generateTableData();
                    setIsNew(true);
                  }}
                >
                  Ok
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : (
        false
      )}
      {isNew && choice === "newSchedules" ? (
        <Button
          variant="outlined"
          onClick={() => {
            setIsNew(false);
            setWorkWithTable(false);
          }}
        >
          Вернуться
        </Button>
      ) : (
        false
      )}
      <Grid item xs={12}>
        {choice === "newSchedules" && isNew ? (
          <CreateNew
            group_call={groupsCall}
            workWithTableStatus={setWorkWithTable}
            workWithTable={workWithTable}
          />
        ) : null}
        {choice === "existingSchedules" ? (
          <ListOfTables
            group_list={all_data.list_of_names}
            shedule={all_data.schedule}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    all_data: state.admin.data,
  };
};

export default connect(mapStateToProps, null)(TableWorker);
