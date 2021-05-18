import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { putFlow } from "../../../Redux/actions";
import Alert from "../Alerts/Alert";
const DataFlow = (props) => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState("");
  const [firstPartEnded, setFirstPartEnded] = useState(false);
  //переменные
  const operationType = ["objects", "teachers", "groups", "rooms", "other"];
  const [operationIndex, setOperationIndex] = useState(0);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [semester, setSemester] = useState(0);
  const [year, setYear] = useState(0);
  const [disciplineName, setDisciplineName] = useState("");
  const [finalDisciplineName, setFinalDisciplineName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [finalteacher, setFinalTeacher] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [groups, setGroups] = useState([]);
  const [finalGroups, setFinalGroups] = useState([]);
  const [roomSearch, setRoomSearh] = useState("");
  //типы аудиторий
  const [roomType, setRoomType] = useState("");
  const [leactinRoom, setLectionRoom] = useState("");
  const [pracRoom, setPracRoom] = useState("");
  const [labsRoom, setlabsRoom] = useState("");
  //обьект
  const [mainFlow, setMainFlow] = useState({
    faculty: "",
    department: "",
    specialty: "",
    semester: 0,
    year: 0,
    groupFlow: [],
    csheduleFlow: [],
  });
  const firstFormSubmit = (e) => {
    e.preventDefault();
    setMainFlow({
      ...mainFlow,
      faculty: faculty.split(" ")[0],
      department: department.split(" ")[0],
      specialty: specialty,
      semester,
      year,
      groupFlow: groups,
    });
    setFirstPartEnded(true);
  };
  const secondFormSubmit = (e) => {
    e.preventDefault();
    dispatch(putFlow(mainFlow));
    props.close();
  };
  const restartFlow = () => {
    setMainFlow({
      ...mainFlow,
      csheduleFlow: [
        ...mainFlow.csheduleFlow,
        {
          discipline: finalDisciplineName,
          teacher: finalteacher,
          scheduleGroups: finalGroups,
          room: {
            forLec: leactinRoom,
            forPrac: pracRoom,
            forLabs: labsRoom,
          },
        },
      ],
    });
    setDisciplineName("");
    setTeacher("");
    setGroupNumber("");
    setOperationIndex(0);
  };
  //first
  const facultyValidation = (e) => setFaculty(e.target.value);
  const departmentValidation = (e) => setDepartment(e.target.value);
  const specialtyValidation = (e) => setSpecialty(e.target.value);
  const semesterValidation = (e) => setSemester(e.target.value);
  const yearValidation = (e) => setYear(e.target.value);
  const disciplineNameValidation = (e) => setDisciplineName(e.target.value);
  const groupNumberValidation = (e) => setGroupNumber(e.target.value);
  const groupsValidation = (e) => {
    if (groups.includes(e.target.getAttribute("data-element").split(" ")[0])) {
      setAlert("Группы");
    } else {
      setGroups([
        ...groups,
        e.target.getAttribute("data-element").split(" ")[0],
      ]);
      setGroupNumber("");
    }
  };
  const finalGroupsValidation = (e) => {
    setFinalGroups([...finalGroups, e.target.getAttribute("data-element")]);
    setGroupNumber("");
  };
  const teacherValidation = (e) => setTeacher(e.target.value);
  const teacherFinalValidation = (e) =>
    setFinalTeacher(e.target.getAttribute("data-element"));
  const disciplineFinalValidation = (e) => {
    setFinalDisciplineName(e.target.getAttribute("data-element"));
    setDisciplineName("");
  };
  const roomSearchValidation = (e) => setRoomSearh(e.target.value);
  const roomTypeValidation = (e) => {
    setRoomType(e.target.getAttribute("data-roomtype"));
  };
  const roomValidation = (e) => {
    switch (roomType) {
      case "lec":
        setLectionRoom(e.target.getAttribute("data-value"));
        setRoomSearh("");
        setRoomType("");
        break;
      case "prac":
        setPracRoom(e.target.getAttribute("data-value"));
        setRoomSearh("");
        setRoomType("");
        break;
      case "lab":
        setlabsRoom(e.target.getAttribute("data-value"));
        setRoomSearh("");
        setRoomType("");
        break;
      default:
        break;
    }
  };
  const operationIndexChange = (e) => {
    switch (e.target.getAttribute("data-operation")) {
      case "back":
        if (operationIndex > 0) {
          setOperationIndex(operationIndex - 1);
        }
        break;
      case "next":
        if (operationIndex < operationType.length - 1) {
          setOperationIndex(operationIndex + 1);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="modal_body">
      {alert ? <Alert type={alert} /> : false}
      <span className="modalTitle">Создание нового расписания</span>
      {!firstPartEnded ? (
        <form className="modalForm" onSubmit={firstFormSubmit}>
          <select
            onChange={facultyValidation}
            data-type="faculty"
            className="modalInput"
            value={faculty ? faculty : "Выберите факультет..."}
          >
            <option disabled>Выберите факультет...</option>
            {props.all_data.faculties.map((element) => {
              return (
                <option
                  key={element.Faculty_id}
                  value={element.Faculty_name + " " + element.Faculty_id}
                >
                  {element.Faculty_name}
                </option>
              );
            })}
          </select>
          {faculty ? (
            <select
              onChange={departmentValidation}
              data-type="department"
              className="modalInput"
              value={department ? department : "Выберите кафедру..."}
            >
              <option disabled>Выберите кафедру...</option>
              {props.all_data.department
                .filter((item) => item.Faculty == faculty.split(" ")[1])
                .map((element) => {
                  return (
                    <option
                      key={element.Department_id}
                      value={
                        element.Department_name + " " + element.Department_id
                      }
                    >
                      {element.Department_name}
                    </option>
                  );
                })}
            </select>
          ) : (
            false
          )}
          {department ? (
            <select
              onChange={specialtyValidation}
              data-type="specialty"
              value={specialty ? specialty : "Выберите специальность..."}
              className="modalInput"
            >
              <option disabled>Выберите специальность...</option>
              {props.all_data.specialties
                .filter((item) => item.Department == department.split(" ")[1])
                .map((element) => {
                  return (
                    <option
                      key={element.Specialties_id}
                      value={
                        element.Specialties_name +
                        " " +
                        element.Department +
                        " " +
                        element.Specialties_id
                      }
                    >
                      {element.Specialties_name}
                    </option>
                  );
                })}
            </select>
          ) : (
            false
          )}
          {specialty ? (
            <>
              <input
                className="modalInput"
                onChange={semesterValidation}
                data-type="semester"
                placeholder="Введите семестр"
              />
              <input
                className="modalInput"
                onChange={yearValidation}
                data-type="year"
                placeholder="Введите год обучения"
              />
            </>
          ) : (
            false
          )}
          {year ? (
            <>
              <input
                className="modalInput"
                onChange={groupNumberValidation}
                data-type="groupNumber"
                placeholder="Введите номер группы..."
                value={groupNumber}
              />
              <div className="pickResult">
                {groups.map((group, index) => (
                  <div key={index} className="pickItem">
                    {group}
                  </div>
                ))}
              </div>
              <div className={groupNumber ? "searchItems" : ""}>
                {props.all_data.groups
                  .filter((item) =>
                    groupNumber
                      ? item.Group_Number.toString().includes(
                          groupNumber.toString()
                        ) &&
                        item.Spetiality == specialty.split(" ")[2] &&
                        item.yearOfEducation == year
                      : false
                  )
                  .map((element) => {
                    return (
                      <div
                        className="one_element_block"
                        key={element.Group_id}
                        data-element={
                          element.Group_Number + " " + element.Group_id
                        }
                        onClick={groupsValidation}
                      >
                        {element.Group_Number}
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            false
          )}
          <input type="submit" value="Submit" className="modalButton" />
        </form>
      ) : (
        <>
          <div className="switchWrapper">
            <div className="switchItem">
              {!operationIndex == 0 ? (
                <button
                  onClick={operationIndexChange}
                  data-operation="back"
                  className="modalButton"
                >
                  Шаг назад
                </button>
              ) : (
                false
              )}
            </div>
            <div className="switchItem">
              {operationIndex != operationType.length - 1 ? (
                <button
                  onClick={operationIndexChange}
                  data-operation="next"
                  className="modalButton"
                >
                  Шаг вперед
                </button>
              ) : (
                false
              )}
            </div>
          </div>
          <form className="modalForm" onSubmit={secondFormSubmit}>
            {operationIndex == 0 ? (
              <>
                <input
                  className="modalInput"
                  onChange={disciplineNameValidation}
                  data-type="disciplineName"
                  placeholder="Введите наименование дисциплины..."
                />
                {props.all_data.disciplines
                  .filter((item) =>
                    disciplineName
                      ? item.Object_name.toLowerCase().includes(
                          disciplineName.toLowerCase()
                        )
                      : false
                  )
                  .map((element) => {
                    return (
                      <div
                        className="one_element_block"
                        key={element.Object_id}
                        data-element={element.Object_name}
                        onClick={disciplineFinalValidation}
                      >
                        {element.Object_name}
                      </div>
                    );
                  })}
              </>
            ) : (
              false
            )}

            {operationIndex == 1 ? (
              <>
                <input
                  className="modalInput"
                  onChange={teacherValidation}
                  placeholder="Введите фамилию преподавателя..."
                />
                {props.all_data.teachers
                  .filter((item) =>
                    teacher
                      ? item.Teacher_lastName.includes(teacher)
                      : //item.Department_number.toString() == department &&
                        false
                  )
                  .map((element) => {
                    return (
                      <div
                        className="one_element_block"
                        key={element.Teacher_id}
                        data-element={
                          element.Teacher_lastName +
                          " " +
                          element.Teacher_firstName +
                          " " +
                          element.Teacher_patronymic
                        }
                        onClick={teacherFinalValidation}
                      >
                        {element.Teacher_lastName +
                          " " +
                          element.Teacher_firstName +
                          " " +
                          element.Teacher_patronymic}
                      </div>
                    );
                  })}
              </>
            ) : (
              false
            )}
            {operationIndex == 2 ? (
              <>
                <input
                  className="modalInput"
                  onChange={groupNumberValidation}
                  data-type="groupNumber"
                  placeholder="Введите номер группы..."
                />
                {groups
                  .filter((item) =>
                    groupNumber
                      ? item.toString().includes(groupNumber.toString())
                      : false
                  )
                  .map((element) => {
                    return (
                      <div
                        className="one_element_block"
                        key={element++}
                        data-element={element}
                        onClick={finalGroupsValidation}
                      >
                        {element}
                      </div>
                    );
                  })}
              </>
            ) : (
              false
            )}
            {operationIndex == 3 ? (
              <>
                <div className="operationSelect">
                  <div className="operationSelectBody">
                    <div
                      className="icon"
                      data-roomtype={"lec"}
                      onClick={roomTypeValidation}
                    >
                      {roomType == "lec" ? ">" : "^"}
                    </div>
                    <div className="description">
                      {!leactinRoom
                        ? "Лекционные занятия"
                        : "Для лекционных занятий выбрана " +
                          leactinRoom +
                          " аудитория"}
                    </div>
                  </div>
                  {roomType === "lec" ? (
                    <>
                      <input
                        className="modalInput"
                        onChange={roomSearchValidation}
                        value={roomSearch}
                        placeholder="Введите номер аудитории..."
                      />
                    </>
                  ) : (
                    false
                  )}
                </div>
                <div className="operationSelect">
                  <div className="operationSelectBody">
                    <div
                      className="icon"
                      data-roomtype={"prac"}
                      onClick={roomTypeValidation}
                    >
                      f
                    </div>
                    <div className="description">Практические занятия</div>
                  </div>
                  {roomType === "prac" ? (
                    <>
                      <input
                        className="modalInput"
                        onChange={roomSearchValidation}
                        value={roomSearch}
                        placeholder="Введите номер аудитории..."
                      />
                    </>
                  ) : (
                    false
                  )}
                </div>
                <div className="operationSelect">
                  <div className="operationSelectBody">
                    <div
                      className="icon"
                      data-roomtype={"lab"}
                      onClick={roomTypeValidation}
                    >
                      f
                    </div>
                    <div className="description">Лабораторные работы</div>
                  </div>
                  {roomType === "lab" ? (
                    <>
                      <input
                        className="modalInput"
                        onChange={roomSearchValidation}
                        value={roomSearch}
                        placeholder="Введите номер аудитории..."
                      />
                    </>
                  ) : (
                    false
                  )}
                </div>
                {props.all_data.rooms
                  .filter((item) =>
                    roomSearch
                      ? item.Room_number.toString().includes(roomSearch)
                      : false
                  )
                  .map((element) => {
                    return (
                      <div
                        className="one_element_block"
                        key={element.Room_id}
                        data-value={element.Room_number}
                        onClick={roomValidation}
                      >
                        {element.Room_number}
                      </div>
                    );
                  })}
              </>
            ) : (
              false
            )}
            {operationIndex == 4 ? (
              <>
                <button type="button" onClick={restartFlow}>
                  Добавить еще
                </button>
                <input
                  type="submit"
                  value="Закончить"
                  className="modalButton"
                />
              </>
            ) : (
              false
            )}
          </form>
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    all_data: state.admin.data,
  };
};
export default connect(mapStateToProps, null)(DataFlow);
