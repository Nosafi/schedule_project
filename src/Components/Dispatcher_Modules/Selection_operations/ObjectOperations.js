import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import { useDispatch } from "react-redux";
import { createNewData } from "../../../Redux/admin-actions";
import { editOperation } from "../../../Redux/admin-actions";
import { dataValidation, stringLimit } from "./InputValidator";
import { connect } from "react-redux";
import Alert from "../../Modal/Alerts/Alert";
const ObjectOperations = ({
  id = "",
  disciplines,
  faculties,
  department,
  close,
}) => {
  const [noChange, setNoChange] = useState(false);
  const [name_Error, setNameError] = useState(false);
  const [faculty_error, setFacultyError] = useState(false);
  const [depart_error, setDepartError] = useState(false);

  const dispatch = useDispatch();
  const [objectData, setObjectData] = useState({
    id: "",
    check: false,
    wasData: {
      Object_name: "",
      Object_faculty: "",
      Object_depart: "",
    },
    Object_name: "",
    Object_faculty: "",
    Object_depart: "",
  });
  useEffect(() => {
    console.log(typeof id);
    if (id) {
      disciplines.filter((item) => {
        if (item.Object_id.toString() === id) {
          setObjectData({
            ...objectData,
            id: id,
            wasData: {
              Object_name: item.Object_name,
              Object_faculty: department
                .filter(
                  (department) =>
                    department.Department_id === item.Object_depart
                )
                .map((item) => item.Faculty),
              Object_depart: item.Object_depart,
            },
          });
        }
      });
    }
  }, []);
  const objectTableValidation = (e) => {
    e.preventDefault();
    Object.entries(objectData).map((item) => {
      switch (item[0]) {
        case "Object_name":
          return id
            ? objectData.Object_name
              ? !dataValidation("notLimited string", objectData.Object_name) ||
                item[1] === ""
                ? setNameError(true)
                : false
              : false
            : !dataValidation("notLimited string", objectData.Object_name) ||
              item[1] === ""
            ? setNameError(true)
            : false;
        case "Object_faculty":
          return id
            ? objectData.Object_faculty
              ? item[1] === ""
                ? setFacultyError(true)
                : false
              : false
            : item[1] === ""
            ? setFacultyError(true)
            : false;
        case "Object_depart":
          return id
            ? objectData.Object_depart
              ? item[1] === ""
                ? setDepartError(true)
                : false
              : false
            : item[1] === ""
            ? setDepartError(true)
            : false;
        default:
          break;
      }
    });
    setObjectData(
      update(objectData, {
        check: { $set: true },
      })
    );
    let data = id
      ? {
          id: objectData.id,
          Object_name: objectData.Object_name
            ? objectData.Object_name
            : objectData.wasData.Object_name,
          Object_depart: objectData.Object_depart
            ? objectData.Object_depart.split(" ")[1]
            : objectData.wasData.Object_depart,
        }
      : {
          Object_name: objectData.Object_name,
          Object_depart: objectData.Object_depart.split(" ")[1],
        };
    if (objectData.check && !name_Error) {
      id
        ? data.Object_name === objectData.wasData.Object_name &&
          data.Object_depart === objectData.wasData.Object_depart
          ? setNoChange(true)
          : dispatch(editOperation("objects_table", data)) && close()
        : dispatch(createNewData("objects_table", data)) && close();
    } else {
      console.log("no");
    }
    console.log(objectData);
  };
  const dataChange = (e) => {
    setNoChange(false);
    switch (e.target.getAttribute("data-input-type")) {
      case "object-name":
        return (
          setObjectData(
            update(objectData, {
              check: { $set: false },
              Object_name: {
                $set: e.target.value,
              },
            })
          ) || setNameError(false)
        );
      case "object-faculty":
        return (
          setObjectData(
            update(objectData, {
              Object_faculty: { $set: e.target.value },
              Object_depart: { $set: "" },
            })
          ) || setFacultyError(false)
        );
      case "object-depart":
        return (
          setObjectData(
            update(objectData, {
              Object_depart: { $set: e.target.value },
            })
          ) || setDepartError(false)
        );
      default:
        break;
    }
  };
  return (
    <>
      <form onSubmit={(e) => objectTableValidation(e)} className="modalForm">
        {noChange ? <Alert error="noChange" noChange={noChange} /> : false}
        <input
          className={!name_Error ? "modalInput" : "modalInput error"}
          onChange={dataChange}
          data-input-type="object-name"
          placeholder={
            id
              ? "Наименование предмета: " +
                stringLimit(objectData.wasData.Object_name)
              : "Введите наименование предмета..."
          }
          value={objectData.Object_name}
        />
        <select
          className={!faculty_error ? "modalInput" : "modalInput error"}
          placeholder="Select option"
          value={
            id
              ? objectData.Object_faculty
                ? objectData.Object_faculty
                : "For edit"
              : objectData.Object_faculty
              ? objectData.Object_faculty
              : "For adding"
          }
          data-input-type="object-faculty"
          onChange={dataChange}
        >
          {id ? (
            <option value="For edit" disabled>
              {faculties
                .filter(
                  (faculty) =>
                    faculty.Faculty_id === objectData.wasData.Object_faculty[0]
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
        {objectData.Object_faculty || objectData.wasData.Object_faculty ? (
          <select
            className={!depart_error ? "modalInput" : "modalInput error"}
            value={
              id
                ? objectData.Object_depart
                  ? objectData.Object_depart
                  : "For edit"
                : objectData.Object_depart
                ? objectData.Object_depart
                : "For adding"
            }
            data-input-type="object-depart"
            onChange={dataChange}
          >
            {id ? (
              <option value="For edit" disabled>
                {department
                  .filter(
                    (department) =>
                      department.Department_id ===
                      objectData.wasData.Object_depart
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
                objectData.Object_faculty
                  ? department.Faculty.toString() ===
                    objectData.Object_faculty.split(" ")[1]
                  : department.Faculty.toString() ===
                    objectData.wasData.Object_faculty[0].toString()
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
        {objectData.Object_depart || id ? (
          !objectData.check ? (
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
    disciplines: state.admin.data.disciplines,
    department: state.admin.data.department,
  };
};

export default connect(mapStateToProps, null)(ObjectOperations);
