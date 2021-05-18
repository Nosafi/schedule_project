import React from "react";
import { connect } from "react-redux";
import "../../../../Assets/Styles/Common/common.scss";
import PageLoader from "../../../Shedule_Modules/PageLoader";
import EditIcon from "../../../../Assets/Media/edit-line.svg";
import DeleteIcon from "../../../../Assets/Media/delete-bin-2-line.svg";
const GroupsTable = ({ groups, specialties, faculties, modal }) => {
  return (
    <>
      {groups ? (
        <div className="vertical_container">
          <div className="vertical_item_horiz">
            <div className="page_item_disabled">
              <div className="page_item_descr _weight-600">
                <p>Номер группы</p>
              </div>
            </div>

            <div className="page_item_disabled">
              <div className="page_item_descr _weight-600">
                <p>Специальность</p>
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

          {groups.map((item, index) => (
            <div key={item + index} className="vertical_item_horiz">
              <div className="page_item_disabled">
                <div className="page_item_descr">
                  <p>{item.Group_Number}</p>
                </div>
              </div>

              <div className="page_item_disabled">
                <div className="page_item_descr">
                  <p>
                    {specialties.map((speciality) => {
                      if (speciality.Specialties_id === item.Spetiality) {
                        return speciality.Specialties_name;
                      }
                    })}
                  </p>
                </div>
              </div>

              <div
                className="vertical_item "
                data="edit"
                index={item.Group_id}
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
                index={item.Group_id}
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
    faculties: state.admin.data.faculties,
    groups: state.admin.data.groups,
    specialties: state.admin.data.specialties,
  };
};

export default connect(mapStateToProps, null)(GroupsTable);
