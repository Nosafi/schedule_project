import React from "react";
import { connect } from "react-redux";
import "../../../../Assets/Styles/Common/common.scss";
import PageLoader from "../../../Shedule_Modules/PageLoader";
import EditIcon from "../../../../Assets/Media/edit-line.svg";
import DeleteIcon from "../../../../Assets/Media/delete-bin-2-line.svg";
const TeachersTable = ({ teachers, department, modal }) => {
  return (
    <>
      {teachers ? (
        <div className="vertical_container">
          <div className="vertical_item_horiz">
            <div className="page_item_disabled">
              <div className="page_item_descr _weight-600">
                <p>Ф.И.О</p>
              </div>
            </div>

            <div className="page_item_disabled">
              <div className="page_item_descr _weight-600">
                <p>Табельный</p>
              </div>
            </div>

            <div className="page_item_disabled">
              <div className="page_item_descr _weight-600">
                <p>Кафедра</p>
              </div>
            </div>

            <div className="page_item_disabled">
              <div className="page_item_descr _weight-600">
                <p>Редактировать</p>
              </div>
            </div>

            <div className="page_item_disabled">
              <div className="page_item_descr _weight-600">
                <p>Удалить</p>
              </div>
            </div>
          </div>

          {teachers.map((item, index) => (
            <div key={item + index} className="vertical_item_horiz">
              <div className="page_item_disabled">
                <div className="page_item_descr">
                  <p>
                    {item.Teacher_lastName +
                      " " +
                      item.Teacher_firstName.split("")[0] +
                      "." +
                      item.Teacher_patronymic.split("")[0] +
                      "."}
                  </p>
                </div>
              </div>

              <div className="page_item_disabled">
                <div className="page_item_descr">
                  <p>{item.Personal_number}</p>
                </div>
              </div>

              <div className="page_item_disabled">
                <div className="page_item_descr">
                  <p>
                    {department.map((department) => {
                      if (department.Department_id === item.Department_number) {
                        return department.Department_name;
                      }
                    })}
                  </p>
                </div>
              </div>

              <div
                className="vertical_item "
                data="edit"
                index={item.Teacher_id}
                onClick={modal}
              >
                <div className="page_item_disabled">
                  <div className="page_item_img">
                    <img src={EditIcon} alt="#" />
                  </div>
                  <div className="page_item_descr">
                    <p>Редактировать</p>
                  </div>
                </div>
              </div>
              <div
                className="vertical_item"
                data="delete"
                index={item.Teacher_id}
                onClick={modal}
              >
                <div className="page_item_disabled">
                  <div className="page_item_img">
                    <img src={DeleteIcon} alt="#" />
                  </div>
                  <div className="page_item_descr">
                    <p>Удалить</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    department: state.admin.data.department,
    teachers: state.admin.data.teachers,
  };
};

export default connect(mapStateToProps, null)(TeachersTable);
