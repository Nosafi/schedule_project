import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { dataValidation, stringLimit } from "./InputValidator";
import { createNewData } from "../../../Redux/admin-actions";
import { editOperation } from "../../../Redux/admin-actions";
import update from "immutability-helper";
import Alert from "../../Modal/Alerts/Alert";
const GroupOperations = ({
  id = "",
  groups,
  faculties,
  department,
  specialties,
  close,
}) => {
  const [noChange, setNoChange] = useState(false);
  const [number_Error, setNameError] = useState(false);
  const [faculty_error, setFacultyError] = useState(false);
  const [depart_error, setDepartError] = useState(false);
  const [specialty_error, setSpecialtyError] = useState(false);

  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState({
    id: "",
    check: false,
    wasData: {
      Group_number: "",
      Group_faculty: "",
      Group_depart: "",
      Group_specialty: "",
    },
    Group_number: "",
    Group_faculty: "",
    Group_depart: "",
    Group_specialty: "",
  });

  useEffect(() => {
    if (id) {
      groups.filter((item) => {
        if (item.Group_id.toString() === id) {
          setGroupData({
            ...groupData,
            id: id,
            wasData: {
              Group_number: item.Group_Number,
              Group_specialty: item.Spetiality,
              Group_faculty: faculties
                .filter(
                  (faculty) =>
                    faculty.Faculty_id ===
                    Number(
                      department
                        .filter(
                          (depart) =>
                            depart.Department_id ===
                            Number(
                              specialties
                                .filter(
                                  (spetiality) =>
                                    spetiality.Specialties_id ===
                                    item.Spetiality
                                )
                                .map((specialty) => specialty.Department)
                            )
                        )
                        .map((depart) => depart.Faculty)
                    )
                )
                .map((faculty) => faculty.Faculty_id),
              Group_depart: specialties
                .filter(
                  (spetiality) => spetiality.Specialties_id === item.Spetiality
                )
                .map((specialty) => specialty.Department),
            },
          });
        }
      });
    }
  }, []);

  const groupsTableValidation = (e) => {
    e.preventDefault();
    Object.entries(groupData).map((item) => {
      switch (item[0]) {
        case "Group_number":
          return id
            ? groupData.Group_number
              ? !dataValidation("only numbers", groupData.Group_number) ||
                !item[1]
                ? setNameError(true)
                : false
              : false
            : !dataValidation("only numbers", groupData.Group_number) ||
              !item[1]
            ? setNameError(true)
            : false;
        case "Group_faculty":
          return id
            ? groupData.Group_faculty
              ? !item[1]
                ? setFacultyError(true)
                : false
              : false
            : !item[1]
            ? setFacultyError(true)
            : false;
        case "Group_depart":
          return id
            ? groupData.Group_depart
              ? !item[1]
                ? setDepartError(true)
                : false
              : false
            : !item[1]
            ? setDepartError(true)
            : false;
        case "Group_specialty":
          return id
            ? groupData.Group_specialty
              ? !item[1]
                ? setSpecialtyError(true)
                : false
              : false
            : !item[1]
            ? setSpecialtyError(true)
            : false;
        default:
          break;
      }
    });
    setGroupData(
      update(groupData, {
        check: { $set: true },
      })
    );
    let data = id
      ? {
          id: groupData.id,
          Group_number: groupData.Group_number
            ? groupData.Group_number
            : groupData.wasData.Group_number,
          Group_specialty: groupData.Group_specialty
            ? groupData.Group_specialty.split(" ")[1]
            : groupData.wasData.Group_specialty,
        }
      : {
          Group_number: groupData.Group_number,
          Group_specialty: groupData.Group_specialty.split(" ")[1],
        };
    if (groupData.check && !number_Error) {
      console.log("dispatch");
      id
        ? data.Group_number === groupData.wasData.Group_number &&
          data.Group_specialty === groupData.wasData.Group_specialty
          ? setNoChange(true)
          : dispatch(editOperation("groups_table", data)) && close()
        : dispatch(createNewData("groups_table", data)) && close();
    } else {
      console.log("no dispatch");
    }
  };

  const dataChange = (e) => {
    setNoChange(false);
    switch (e.target.getAttribute("data-input-type")) {
      case "group-number":
        return (
          setGroupData(
            update(groupData, {
              check: { $set: false },
              Group_number: {
                $set: e.target.value,
              },
            })
          ) || setNameError(false)
        );
      case "group-faculty":
        return (
          setGroupData(
            update(groupData, {
              Group_faculty: { $set: e.target.value },
              Group_depart: { $set: "" },
              Group_specialty: { $set: "" },
            })
          ) || setFacultyError(false)
        );
      case "group-depart":
        return (
          setGroupData(
            update(groupData, {
              Group_depart: { $set: e.target.value },
            })
          ) || setDepartError(false)
        );
      case "group-specialty":
        return (
          setGroupData(
            update(groupData, {
              Group_specialty: { $set: e.target.value },
            })
          ) || setSpecialtyError(false)
        );
      default:
        break;
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          groupsTableValidation(e);
        }}
        className="modalForm"
      >
        {noChange ? <Alert error="noChange" noChange={noChange} /> : false}
        <input
          className={!number_Error ? "modalInput" : "modalInput error"}
          onChange={dataChange}
          data-input-type="group-number"
          placeholder={
            id
              ? "Номер учебной группы: " +
                stringLimit(groupData.wasData.Group_number)
              : "Введите номер учебной группы..."
          }
          value={groupData.Group_number}
        />

        <select
          className={!faculty_error ? "modalInput" : "modalInput error"}
          placeholder="Select option"
          value={
            id
              ? groupData.Group_faculty
                ? groupData.Group_faculty
                : "For edit"
              : groupData.Group_faculty
              ? groupData.Group_faculty
              : "For adding"
          }
          data-input-type="group-faculty"
          onChange={dataChange}
        >
          {id ? (
            <option value="For edit" disabled>
              {faculties
                .filter(
                  (faculty) =>
                    faculty.Faculty_id === groupData.wasData.Group_faculty[0]
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
        {groupData.Group_faculty || groupData.wasData.Group_faculty ? (
          <select
            className={!depart_error ? "modalInput" : "modalInput error"}
            value={
              id
                ? groupData.Group_depart
                  ? groupData.Group_depart
                  : "For edit"
                : groupData.Group_depart
                ? groupData.Group_depart
                : "For adding"
            }
            data-input-type="group-depart"
            onChange={dataChange}
          >
            {id ? (
              <option value="For edit" disabled>
                {department
                  .filter(
                    (department) =>
                      department.Department_id ===
                      groupData.wasData.Group_depart[0]
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
                groupData.Group_faculty
                  ? department.Faculty.toString() ===
                    groupData.Group_faculty.split(" ")[1]
                  : department.Faculty.toString() ===
                    groupData.wasData.Group_faculty[0].toString()
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
        {groupData.Group_depart || groupData.wasData.Group_depart ? (
          <select
            className={!specialty_error ? "modalInput" : "modalInput error"}
            value={
              id
                ? groupData.Group_specialty
                  ? groupData.Group_specialty
                  : "For edit"
                : groupData.Group_specialty
                ? groupData.Group_specialty
                : "For adding"
            }
            data-input-type="group-specialty"
            onChange={dataChange}
          >
            {id ? (
              <option value="For edit" disabled>
                {specialties
                  .filter(
                    (specialty) =>
                      specialty.Specialties_id ===
                      groupData.wasData.Group_specialty
                  )
                  .map(
                    (item) =>
                      "Cпециальность: " + stringLimit(item.Specialties_name)
                  )}
              </option>
            ) : (
              false
            )}
            <option value="For adding" disabled hidden>
              Выберите специальность...
            </option>
            {specialties
              .filter((specialty) =>
                groupData.Group_depart
                  ? specialty.Department.toString() ===
                    groupData.Group_depart.split(" ")[1]
                  : specialty.Department.toString() ===
                    groupData.wasData.Group_depart[0].toString()
              )
              .map((specialty, index) => (
                <option key={specialty.Specialties_id + index}>
                  {"Номер: " +
                    specialty.Specialties_id +
                    " - " +
                    specialty.Specialties_name}
                </option>
              ))}
          </select>
        ) : (
          false
        )}
        {groupData.Group_specialty || id ? (
          !groupData.check ? (
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
    groups: state.admin.data.groups,
    department: state.admin.data.department,
    specialties: state.admin.data.specialties,
  };
};

export default connect(mapStateToProps, null)(GroupOperations);
