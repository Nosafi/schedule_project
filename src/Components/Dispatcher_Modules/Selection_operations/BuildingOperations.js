import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import { useDispatch } from "react-redux";
import { createNewData } from "../../../Redux/admin-actions";
import { editOperation } from "../../../Redux/admin-actions";
import { dataValidation } from "./InputValidator";
import { connect } from "react-redux";
import Alert from "../../Modal/Alerts/Alert";
import { Grid, TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
const BuildingOperations = ({ id = "", building, close }) => {
  const dispatch = useDispatch();
  const [noChange, setNoChange] = useState(false);
  const [number_Error, setNumberError] = useState(false);
  const [adress_Error, setAdressError] = useState(false);
  const [buildingData, setBuildingData] = useState({
    id: "",
    check: false,
    wasData: {
      Building_number: "",
      Building_adress: "",
    },
    Building_number: "",
    Building_adress: "",
  });
  useEffect(() => {
    if (id) {
      building.filter((item) => {
        if (item.build_id.toString() === id) {
          setBuildingData({
            ...buildingData,
            id: id,
            wasData: {
              Building_number: item.build_number,
              Building_adress: item.build_adress,
            },
          });
        }
      });
    }
  }, []);
  const facultyTableValidation = (e) => {
    e.preventDefault();
    Object.entries(buildingData).map((item) => {
      switch (item[0]) {
        case "Building_number":
          return id
            ? item[1]
              ? !dataValidation("only numbers", item[1]) || item[1] === ""
                ? setNumberError(true)
                : false
              : false
            : !dataValidation("only numbers", item[1]) || item[1] === ""
            ? setNumberError(true)
            : false;
        case "Building_adress":
          return id
            ? item[1]
              ? !dataValidation("notLimited string", item[1]) || item[1] === ""
                ? setAdressError(true)
                : false
              : false
            : !dataValidation("notLimited string", item[1]) || item[1] === ""
            ? setAdressError(true)
            : false;
        default:
          break;
      }
    });
    setBuildingData(
      update(buildingData, {
        check: { $set: true },
      })
    );
    let data = id
      ? {
          id: buildingData.id,
          Building_number:
            buildingData.Building_number ||
            buildingData.wasData.Building_number,
          Building_adress:
            buildingData.Building_adress ||
            buildingData.wasData.Building_adress,
        }
      : {
          Building_number: buildingData.Building_number,
          Building_adress: buildingData.Building_adress,
        };

    if (buildingData.check && !number_Error && !adress_Error) {
      console.log(data);
      id
        ? data.Building_number === buildingData.wasData.Building_number &&
          data.Building_adress === buildingData.wasData.Building_adress
          ? setNoChange(true)
          : dispatch(editOperation("building_table", data)) && close()
        : dispatch(createNewData("building_table", data)) && close();
    }
  };
  const dataChange = (e) => {
    setNoChange(false);
    switch (e.target.getAttribute("data-input-type")) {
      case "building-number":
        return (
          setBuildingData(
            update(buildingData, {
              check: { $set: false },
              Building_number: {
                $set: e.target.value,
              },
            })
          ) || setNumberError(false)
        );
      case "building-adress":
        return (
          setBuildingData(
            update(buildingData, {
              check: { $set: false },
              Building_adress: {
                $set: e.target.value,
              },
            })
          ) || setAdressError(false)
        );
      default:
        break;
    }
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <form onSubmit={(e) => facultyTableValidation(e)} className="modalForm">
          <Grid container spacing={2}>
            {noChange ? <Alert error="noChange" noChange={noChange} /> : false}

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                error={!number_Error ? false : true}
                helperText={!number_Error ? "" : "Проверьте вводимые данные"}
                onChange={dataChange}
                placeholder={
                  id
                    ? "Номер корпуса: " + buildingData.wasData.Building_number
                    : "Введите номер корпуса..."
                }
                value={buildingData.Building_number}
                inputProps={{ "data-input-type": "building-number" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                error={!adress_Error ? false : true}
                helperText={!adress_Error ? "" : "Проверьте вводимые данные"}
                onChange={dataChange}
                placeholder={
                  id
                    ? "Адрес: " + buildingData.wasData.Building_adress
                    : "Введите адрес корпуса..."
                }
                value={buildingData.Building_adress}
                inputProps={{ "data-input-type": "building-adress" }}
              />
            </Grid>

            <Grid item xs={12}>
              {!buildingData.check ? (
                <Button type="submit" variant="outlined">
                  Проверить данные
                </Button>
              ) : (
                <Button type="submit" variant="outlined">
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
    building: state.admin.data.building,
  };
};

export default connect(mapStateToProps, null)(BuildingOperations);
