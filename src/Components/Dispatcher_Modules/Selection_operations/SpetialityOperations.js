import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import { useDispatch } from "react-redux";
import { createNewData } from "../../../Redux/admin-actions";
import { editOperation } from "../../../Redux/admin-actions";
import { dataValidation, stringLimit } from "./InputValidator";
import { connect } from "react-redux";
import Alert from "../../Modal/Alerts/Alert";
const SpetialityOperation = ({
  id = "",
  specialties,
  faculties,
  department,
  close,
}) => {
  const [noChange, setNoChange] = useState(false);
  const [name_Error, setNameError] = useState(false);
  const [faculty_error, setFacultyError] = useState(false);
  const [depart_error, setDepartError] = useState(false);

  const dispatch = useDispatch();
  const [spetialityData, setSpetialityData] = useState({
    id: "",
    check: false,
    wasData: {
      Specialties_name: "",
      Speciality_faculty: "",
      Speciality_depart: "",
    },
    Specialties_name: "",
    Specialties_faculty: "",
    Specialties_depart: "",
  });
  useEffect(() => {
    if (id) {
      specialties.filter((item) => {
        if (item.Specialties_id.toString() === id) {
          setSpetialityData({
            ...spetialityData,
            id: id,
            wasData: {
              Specialties_name: item.Specialties_name,
              Speciality_faculty: department
                .filter(
                  (department) => department.Department_id === item.Department
                )
                .map((item) => item.Faculty),
              Speciality_depart: item.Department.toString(),
            },
          });
        }
      });
    }
  }, []);
  const spetialityTableValidation = (e) => {
    e.preventDefault();
    Object.entries(spetialityData).map((item) => {
      switch (item[0]) {
        case "Specialties_name":
          return id
            ? spetialityData.Specialties_name
              ? !dataValidation(
                  "notLimited string",
                  spetialityData.Specialties_name
                ) || item[1] === ""
                ? setNameError(true)
                : false
              : false
            : !dataValidation(
                "notLimited string",
                spetialityData.Specialties_name
              ) || item[1] === ""
            ? setNameError(true)
            : false;
        case "Speciality_faculty":
          return id
            ? spetialityData.Specialties_faculty
              ? item[1] === ""
                ? setFacultyError(true)
                : false
              : false
            : item[1] === ""
            ? setFacultyError(true)
            : false;
        case "Speciality_depart":
          return id
            ? spetialityData.Specialties_depart
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
    setSpetialityData(
      update(spetialityData, {
        check: { $set: true },
      })
    );
    let data = id
      ? {
          id: spetialityData.id,
          Specialties_name: spetialityData.Specialties_name
            ? spetialityData.Specialties_name
            : spetialityData.wasData.Specialties_name,
          Speciality_depart: spetialityData.Speciality_depart
            ? spetialityData.Speciality_depart.split(" ")[1]
            : spetialityData.wasData.Speciality_depart,
        }
      : {
          Specialties_name: spetialityData.Specialties_name,
          Speciality_depart: spetialityData.Speciality_depart.split(" ")[1],
        };
    if (spetialityData.check && !name_Error) {
      id
        ? data.Specialties_name === spetialityData.wasData.Specialties_name &&
          data.Speciality_depart === spetialityData.wasData.Speciality_depart
          ? setNoChange(true)
          : dispatch(editOperation("specialties_table", data)) && close()
        : dispatch(createNewData("specialties_table", data)) && close();
    } else {
      console.log("no");
    }
  };
  const dataChange = (e) => {
    setNoChange(false);
    switch (e.target.getAttribute("data-input-type")) {
      case "spetiality-name":
        return (
          setSpetialityData(
            update(spetialityData, {
              check: { $set: false },
              Specialties_name: {
                $set: e.target.value,
              },
            })
          ) || setNameError(false)
        );
      case "spetiality-faculty":
        return (
          setSpetialityData(
            update(spetialityData, {
              Speciality_faculty: { $set: e.target.value },
              Speciality_depart: { $set: "" },
            })
          ) || setFacultyError(false)
        );
      case "spetiality-depart":
        return (
          setSpetialityData(
            update(spetialityData, {
              Speciality_depart: { $set: e.target.value },
            })
          ) || setDepartError(false)
        );
      default:
        break;
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => spetialityTableValidation(e)}
        className="modalForm"
      >
        {noChange ? <Alert error="noChange" noChange={noChange} /> : false}
        <input
          className={!name_Error ? "modalInput" : "modalInput error"}
          onChange={dataChange}
          data-input-type="spetiality-name"
          placeholder={
            id
              ? "Наименование специальности: " +
                stringLimit(spetialityData.wasData.Specialties_name)
              : "Введите наименование специальности..."
          }
          value={spetialityData.Specialties_name}
        />
        <select
          className={!faculty_error ? "modalInput" : "modalInput error"}
          placeholder="Select option"
          value={
            id
              ? spetialityData.Speciality_faculty
                ? spetialityData.Speciality_faculty
                : "For edit"
              : spetialityData.Speciality_faculty
              ? spetialityData.Speciality_faculty
              : "For adding"
          }
          data-input-type="spetiality-faculty"
          onChange={dataChange}
        >
          {id ? (
            <option value="For edit" disabled>
              {faculties
                .filter(
                  (faculty) =>
                    faculty.Faculty_id ===
                    spetialityData.wasData.Speciality_faculty[0]
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
        {spetialityData.Speciality_faculty ||
        spetialityData.wasData.Speciality_faculty ? (
          <select
            className={!depart_error ? "modalInput" : "modalInput error"}
            value={
              id
                ? spetialityData.Speciality_depart
                  ? spetialityData.Speciality_depart
                  : "For edit"
                : spetialityData.Speciality_depart
                ? spetialityData.Speciality_depart
                : "For adding"
            }
            data-input-type="spetiality-depart"
            onChange={dataChange}
          >
            {id ? (
              <option value="For edit" disabled>
                {department
                  .filter(
                    (department) =>
                      department.Department_id.toString() ===
                      spetialityData.wasData.Speciality_depart
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
                spetialityData.Speciality_faculty
                  ? department.Faculty.toString() ===
                    spetialityData.Speciality_faculty.split(" ")[1]
                  : department.Faculty.toString() ===
                    spetialityData.wasData.Speciality_faculty[0].toString()
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
        {spetialityData.Speciality_depart || id ? (
          !spetialityData.check ? (
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
    specialties: state.admin.data.specialties,
    department: state.admin.data.department,
  };
};

export default connect(mapStateToProps, null)(SpetialityOperation);
