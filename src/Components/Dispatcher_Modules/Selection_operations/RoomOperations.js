import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { dataValidation, stringLimit } from "./InputValidator";
import { createNewData } from "../../../Redux/admin-actions";
import { editOperation } from "../../../Redux/admin-actions";
import update from "immutability-helper";
import Alert from "../../Modal/Alerts/Alert";

//Material-UI
import { Grid, TextField, Button } from "@material-ui/core";

const RoomOperation = ({
  id = "",
  rooms,
  rooms_types,
  faculties,
  department,
  building,
  close,
}) => {
  const [noChange, setNoChange] = useState(false);
  const [number_Error, setNameError] = useState(false);
  const [type_Error, setTypeError] = useState(false);
  const [faculty_error, setFacultyError] = useState(false);
  const [depart_error, setDepartError] = useState(false);
  const [building_error, setBuildingError] = useState(false);

  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState({
    id: "",
    check: false,
    wasData: {
      Room_number: "",
      Room_faculty: "",
      Room_depart: "",
      Room_type: "",
      Room_building: "",
    },
    Room_number: "",
    Room_faculty: "",
    Room_depart: "",
    Room_type: "",
    Room_building: "",
  });

  useEffect(() => {
    if (id) {
      rooms.filter((item) => {
        if (item.Room_id.toString() === id) {
          setRoomData({
            ...roomData,
            id: id,
            wasData: {
              Room_number: item.Room_number,
              Room_faculty: department
                .filter(
                  (department) => department.Department_id === item.Room_depart
                )
                .map((item) => item.Faculty),
              Room_depart: item.Room_depart.toString(),
              Room_type: item.Type_number,
              Room_building: item.Room_Building.toString(),
            },
          });
        }
      });
    }
  }, []);

  const roomTableValidation = (e) => {
    e.preventDefault();
    Object.entries(roomData).map((item) => {
      switch (item[0]) {
        case "Room_number":
          return id
            ? roomData.Room_number
              ? !dataValidation("only numbers", roomData.Room_number) ||
                !item[1]
                ? setNameError(true)
                : false
              : false
            : !dataValidation("only numbers", roomData.Room_number) || !item[1]
            ? setNameError(true)
            : false;
        case "Room_faculty":
          return id
            ? roomData.Room_faculty
              ? !item[1]
                ? setFacultyError(true)
                : false
              : false
            : !item[1]
            ? setFacultyError(true)
            : false;
        case "Room_depart":
          return id
            ? roomData.Room_depart
              ? !item[1]
                ? setDepartError(true)
                : false
              : false
            : !item[1]
            ? setDepartError(true)
            : false;
        case "Room_type":
          return id
            ? roomData.Room_type
              ? item[1]
                ? setTypeError(true)
                : false
              : false
            : !item[1]
            ? setTypeError(true)
            : false;
        case "Room_building":
          return id
            ? roomData.Room_building
              ? item[1] === ""
                ? setBuildingError(true)
                : false
              : false
            : !item[1] === ""
            ? setBuildingError(true)
            : false;
        default:
          break;
      }
    });
    setRoomData(
      update(roomData, {
        check: { $set: true },
      })
    );
    let data = id
      ? {
          id: roomData.id,
          Room_number: roomData.Room_number
            ? roomData.Room_number
            : roomData.wasData.Room_number,
          Room_type: roomData.Room_type
            ? roomData.Room_type.split(" ")[1]
            : roomData.wasData.Room_type,
          Room_depart: roomData.Room_depart
            ? roomData.Room_depart.split(" ")[1]
            : roomData.wasData.Room_depart,
          Room_building: roomData.Room_building
            ? roomData.Room_building.split(" ")[1]
            : roomData.wasData.Room_building,
        }
      : {
          Room_number: roomData.Room_number,
          Room_type: roomData.Room_type.split(" ")[1],
          Room_depart: roomData.Room_depart.split(" ")[1],
          Room_building: roomData.Room_building.split(" ")[1],
        };
    if (roomData.check && !number_Error) {
      id
        ? data.Room_number === roomData.wasData.Room_number &&
          data.Room_depart === roomData.wasData.Room_depart &&
          data.Room_building === roomData.wasData.Room_building &&
          data.Room_type === roomData.wasData.Room_type
          ? setNoChange(true)
          : dispatch(editOperation("rooms_table", data)) && close()
        : dispatch(createNewData("rooms_table", data)) && close();
    }
  };

  const dataChange = (e, type) => {
    setNoChange(false);
    switch (type) {
      case "room-number":
        return (
          setRoomData(
            update(roomData, {
              check: { $set: false },
              Room_number: {
                $set: e.target.value,
              },
            })
          ) || setNameError(false)
        );
      case "room-faculty":
        return (
          setRoomData(
            update(roomData, {
              Room_faculty: { $set: e.target.value },
              Room_depart: { $set: "" },
            })
          ) || setFacultyError(false)
        );
      case "room-depart":
        return (
          setRoomData(
            update(roomData, {
              Room_depart: { $set: e.target.value },
            })
          ) || setDepartError(false)
        );
      case "room-type":
        return (
          setRoomData(
            update(roomData, {
              Room_type: { $set: e.target.value },
            })
          ) || setTypeError(false)
        );
      case "room-building":
        return (
          setRoomData(
            update(roomData, {
              Room_building: { $set: e.target.value },
            })
          ) || setTypeError(false)
        );
      default:
        break;
    }
  };
  return (
    <>
      <form onSubmit={(e) => roomTableValidation(e)} className="modalForm">
        {noChange ? <Alert error="noChange" noChange={noChange} /> : false}
        <TextField
          fullWidth
          variant="outlined"
          color="primary"
          error={!number_Error ? false : true}
          helperText={!number_Error ? "" : "Проверьте вводимые данные"}
          onChange={dataChange}
          data-input-type="room-number"
          label={
            id
              ? "Номер аудитории: " + stringLimit(roomData.wasData.Room_number)
              : "Введите номер аудитории..."
          }
          value={roomData.Room_number}
        />

        <select
          className={!type_Error ? "modalInput" : "modalInput error"}
          placeholder="Select option"
          value={
            id
              ? roomData.Room_type
                ? roomData.Room_type
                : "For edit"
              : roomData.Room_type
              ? roomData.Room_type
              : "For adding"
          }
          data-input-type="room-type"
          onChange={dataChange}
        >
          {id ? (
            <option value="For edit" disabled>
              {rooms_types
                .filter((type) => type.Type_id === roomData.wasData.Room_type)
                .map((item) => "Наименование типа: " + item.Type_name) ||
                "none"}
            </option>
          ) : (
            false
          )}
          <option value="For adding" disabled hidden>
            Выберите тип...
          </option>
          {rooms_types
            .sort((a, b) => a.Type_id - b.Type_id)
            .map((type, index) => (
              <option key={type.Type_id + index}>
                {"Номер: " + type.Type_id + " - " + type.Type_name}
              </option>
            ))}
        </select>
        <select
          className={!faculty_error ? "modalInput" : "modalInput error"}
          placeholder="Select option"
          value={
            id
              ? roomData.Room_faculty
                ? roomData.Room_faculty
                : "For edit"
              : roomData.Room_faculty
              ? roomData.Room_faculty
              : "For adding"
          }
          data-input-type="room-faculty"
          onChange={dataChange}
        >
          {id ? (
            <option value="For edit" disabled>
              {faculties
                .filter(
                  (faculty) =>
                    faculty.Faculty_id === roomData.wasData.Room_faculty[0]
                )
                .map(
                  (item) =>
                    "Наименование факультета: " + stringLimit(item.Faculty_name)
                ) || "none"}
            </option>
          ) : (
            false
          )}
          <option value="For adding" disabled hidden>
            Выберите факультет...
          </option>
          {faculties
            .sort((a, b) => a.Faculty_id - b.Faculty_id)
            .map((faculty, index) => (
              <option key={faculty.Faculty_id + index}>
                {"Номер: " + faculty.Faculty_id + " - " + faculty.Faculty_name}
              </option>
            ))}
        </select>
        {roomData.Room_faculty || roomData.wasData.Room_faculty ? (
          <select
            className={!depart_error ? "modalInput" : "modalInput error"}
            value={
              id
                ? roomData.Room_depart
                  ? roomData.Room_depart
                  : "For edit"
                : roomData.Room_depart
                ? roomData.Room_depart
                : "For adding"
            }
            data-input-type="room-depart"
            onChange={dataChange}
          >
            {id ? (
              <option value="For edit" disabled>
                {department
                  .filter(
                    (department) =>
                      department.Department_id.toString() ===
                      roomData.wasData.Room_depart
                  )
                  .map(
                    (item) =>
                      "Наименование кафедры: " +
                      stringLimit(item.Department_name)
                  )}
              </option>
            ) : (
              false
            )}
            <option value="For adding" disabled hidden>
              Выберите кафедру...
            </option>
            {department
              .filter((department) =>
                roomData.Room_faculty
                  ? department.Faculty.toString() ===
                    roomData.Room_faculty.split(" ")[1]
                  : department.Faculty.toString() ===
                    roomData.wasData.Room_faculty[0].toString()
              )
              .map((department, index) => (
                <option key={department.Department_id + index}>
                  {"Номер: " +
                    department.Department_id +
                    " - " +
                    department.Department_name}
                </option>
              ))}
          </select>
        ) : (
          false
        )}
        {roomData.Room_depart || roomData.wasData.Room_depart ? (
          <select
            className={!building_error ? "modalInput" : "modalInput error"}
            value={
              id
                ? roomData.Room_building
                  ? roomData.Room_building
                  : "For edit"
                : roomData.Room_building
                ? roomData.Room_building
                : "For adding"
            }
            data-input-type="room-building"
            onChange={dataChange}
          >
            {id ? (
              <option value="For edit" disabled>
                {building
                  .filter(
                    (building) =>
                      building.build_id.toString() ===
                      roomData.wasData.Room_building
                  )
                  .map((item) => "Адрес: " + stringLimit(item.build_adress))}
              </option>
            ) : (
              false
            )}
            <option value="For adding" disabled hidden>
              Выберите адрес...
            </option>
            {building.map((building, index) => (
              <option key={building.build_id + index}>
                {"Корпус: " +
                  building.build_number +
                  " - " +
                  building.build_adress}
              </option>
            ))}
          </select>
        ) : (
          false
        )}
        {roomData.Room_building || id ? (
          !roomData.check ? (
            <button className="modalButton">Проверить данные</button>
          ) : (
            <button className="modalButton">Добавить</button>
          )
        ) : (
          false
        )}
      </form>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    faculties: state.admin.data.faculties,
    rooms: state.admin.data.rooms,
    rooms_types: state.admin.data.rooms_types,
    department: state.admin.data.department,
    building: state.admin.data.building,
  };
};

export default connect(mapStateToProps, null)(RoomOperation);
