import React, { useState, useEffect } from "react";
import ModalController from "../Modal/ModalController";
import TableWorker from "./WorkSpace/TableWorker";
import { loadDataForAdmin } from "../../Redux/admin-actions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { exiteFromAdminPage } from "../../Redux/admin-actions";
import SelectController from "../Main_Modules/ItemSelectController/SelectController";

//Material-UI
import {
  Grid,
  makeStyles,
  ButtonGroup,
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Edit, Add, Close } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    padding: "0.6rem 1rem",
  },
}));

const Workspace = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [choice, setChoice] = useState(null);
  const [onBDWork, setOnBDWork] = useState(true);
  const [modalSelect, setModalSelect] = useState("");
  const [modalSelectIndex, setModalSelectIndex] = useState("");
  const [userSelect, setUserSelect] = useState("");

  const userExit = () => {
    localStorage.removeItem("token");
    dispatch(exiteFromAdminPage());
  };
  const choiceValidation = (e) => {
    console.log(e.currentTarget.getAttribute("data-choice"));
    setChoice(e.currentTarget.getAttribute("data-choice"));
  };
  const userClick = (e) => {
    return e.target.getAttribute("data-item-value")
      ? setUserSelect(e.target.getAttribute("data-item-value"))
      : e.target.parentElement.getAttribute("data-item-value")
      ? setUserSelect(e.target.parentElement.getAttribute("data-item-value"))
      : e.target.parentElement.parentElement.getAttribute("data-item-value")
      ? setUserSelect(
          e.target.parentElement.parentElement.getAttribute("data-item-value")
        )
      : setUserSelect(
          e.target.parentElement.parentElement.parentElement.getAttribute(
            "data-item-value"
          )
        );
  };
  const userSelectReset = (e) => {
    setUserSelect("");
  };
  const modalChange = (e) => {
    e.target.getAttribute("data")
      ? setModalSelect(e.target.getAttribute("data"))
      : e.target.parentElement.getAttribute("data")
      ? setModalSelect(e.target.parentElement.getAttribute("data"))
      : e.target.parentElement.parentElement.getAttribute("data")
      ? setModalSelect(
          e.target.parentElement.parentElement.getAttribute("data")
        )
      : setModalSelect(
          e.target.parentElement.parentElement.parentElement.getAttribute(
            "data"
          )
        );

    e.target.getAttribute("index")
      ? setModalSelectIndex(e.target.getAttribute("index"))
      : e.target.parentElement.getAttribute("index")
      ? setModalSelectIndex(e.target.parentElement.getAttribute("index"))
      : e.target.parentElement.parentElement.getAttribute("index")
      ? setModalSelectIndex(
          e.target.parentElement.parentElement.getAttribute("index")
        )
      : setModalSelectIndex(
          e.target.parentElement.parentElement.parentElement.getAttribute(
            "index"
          )
        );
  };

  const modalClose = (e) => {
    setModalSelect("");
  };
  useEffect(() => {
    dispatch(loadDataForAdmin());
  }, [dispatch]);
  return (
    <Grid container xs={12} spacing={1} className={classes.wrapper}>
      <Grid item xs={12} sm={12}>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={12} sm={9}>
            <Box>
              {onBDWork ? (
                <ButtonGroup variant="outlined">
                  <Button onClick={userExit}>
                    <Typography>Выйти</Typography>
                  </Button>
                  <Button
                    onClick={() => {
                      setOnBDWork(false);
                    }}
                  >
                    <Typography>Создание расписания</Typography>
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup variant="outlined">
                  <Button
                    onClick={() => {
                      setOnBDWork(true);
                    }}
                  >
                    <Typography>Назад</Typography>
                  </Button>
                </ButtonGroup>
              )}
            </Box>
          </Grid>
          {onBDWork ? (
            <Grid item xs={12} sm={3}>
              <ButtonGroup variant="outlined" fullWidth={true}>
                <Button
                  disabled={!userSelect ? true : false}
                  onClick={userSelectReset}
                >
                  <Typography>Очистить</Typography>
                </Button>
                <Button
                  disabled={!userSelect ? true : false}
                  data="add"
                  onClick={modalChange}
                >
                  <Typography>Добавить</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          ) : (
            <Grid item xs={12} sm={3}>
              <Grid container justify="flex-end">
                <Grid item xs={12} sm={5}>
                  <ButtonGroup variant="outlined" fullWidth>
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title="Создания нового"
                    >
                      <IconButton
                        onClick={choiceValidation}
                        data-choice="newSchedules"
                      >
                        <Add />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title="Открытие существующего"
                    >
                      <IconButton
                        onClick={choiceValidation}
                        data-choice="existingSchedules"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title={choice ? "Закрыть" : ""}
                      disabled
                    >
                      <IconButton
                        onClick={choiceValidation}
                        data-choice=""
                        disabled={choice ? false : true}
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grid container xs={12} spacing={2}>
          {onBDWork ? (
            <Grid item xs={12} sm={2}>
              <ButtonGroup variant="outlined" orientation="vertical">
                <Button data-item-value="faculties_table" onClick={userClick}>
                  <Typography>Факультеты</Typography>
                </Button>
                <Button data-item-value="rooms_table" onClick={userClick}>
                  <Typography>Адитории</Typography>
                </Button>
                <Button data-item-value="specialties_table" onClick={userClick}>
                  <Typography>Специальности</Typography>
                </Button>
                <Button data-item-value="objects_table" onClick={userClick}>
                  <Typography>Предметы</Typography>
                </Button>
                <Button data-item-value="building_table" onClick={userClick}>
                  <Typography>Адреса</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          ) : (
            false
          )}
          {!onBDWork ? (
            <Grid item xs={12} sm={12}>
              <TableWorker choice={choice} />
            </Grid>
          ) : userSelect ? (
            <Grid item xs={12} sm={10}>
              <SelectController select={userSelect} setIndex={modalChange} />
            </Grid>
          ) : (
            false
          )}
          {modalSelect ? (
            <Grid item xs={12} sm={12}>
              <ModalController
                data={modalSelect}
                index={modalSelectIndex}
                close={modalClose}
                option={userSelect}
              />
            </Grid>
          ) : (
            false
          )}
        </Grid>
      </Grid>
    </Grid>

    // <div className="container">
    //   <div className="content_holder">
    //     <div className="vertical_items_holder">
    //       {onBDWork ? (
    //         <div className="container">
    //           <div className="content_holder">
    //             <div className="horizontal_item" onClick={userExit}>
    //               <div className="page_item">
    //                 <div className="page_item_img">
    //                   <img src={logOut} alt="#" />
    //                 </div>
    //                 <div className="page_item_descr">
    //                   <p>Выйти</p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               className="horizontal_item"
    //               data="workflow_add"
    //               onClick={() => {
    //                 setOnBDWork(false);
    //               }}
    //             >
    //               <div className="page_item">
    //                 <div className="page_item_img">
    //                   <img src={ScheduleFlow} alt="#" />
    //                 </div>
    //                 <div className="page_item_descr">
    //                   <p>Расписание</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="container">
    //           <div className="content_holder">
    //             <div
    //               className="horizontal_item"
    //               onClick={() => {
    //                 setOnBDWork(true);
    //               }}
    //             >
    //               <div className="page_item">
    //                 <div className="page_item_img">
    //                   <img src={backIcon} alt="#" />
    //                 </div>
    //                 <div className="page_item_descr">
    //                   <p>Назад</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {userSelect && onBDWork ? (
    //         <div className="container">
    //           <div className="content_holder">
    //             <div className="vertical_item_disabled">
    //               <div
    //                 className="horizontal_item"
    // data="add"
    // onClick={modalChange}
    //               >
    //                 <div className="page_item">
    //                   <div className="page_item_img">
    //                     <img src={addIcon} alt="#" />
    //                   </div>
    //                   <div className="page_item_descr">
    //                     <p>Добавить</p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div
    //                 className="horizontal_item"
    //                 data="add"
    //                 onClick={userSelectReset}
    //               >
    //                 <div className="page_item">
    //                   <div className="page_item_img">
    //                     <img src={ResetIcon} alt="#" />
    //                   </div>
    //                   <div className="page_item_descr">
    //                     <p>Очистить</p>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         false
    //       )}
    //       {onBDWork ? (
    //         <div className="vertical_item_disabled">
    //           <div
    //             className="horizontal_item"
    // data-item-value="faculties_table"
    // onClick={userClick}
    //           >
    //             <div className="page_item_disabled">
    //               <div className="page_item_img">
    //                 <img src={common} alt="#" />
    //               </div>
    //               <div className="page_item_descr">
    //                 <p>Факультеты</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div
    //             className="horizontal_item"
    //             data-item-value="rooms_table"
    //             onClick={userClick}
    //           >
    //             <div className="page_item_disabled">
    //               <div className="page_item_img">
    //                 <img src={common} alt="#" />
    //               </div>
    //               <div className="page_item_descr">
    //                 <p>Адитории</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div
    //             className="horizontal_item"
    //             data-item-value="groups_table"
    //             onClick={userClick}
    //           >
    //             <div className="page_item_disabled">
    //               <div className="page_item_img">
    //                 <img src={common} alt="#" />
    //               </div>
    //               <div className="page_item_descr">
    //                 <p>Учебные группы</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div
    //             className="horizontal_item"
    // data-item-value="specialties_table"
    // onClick={userClick}
    //           >
    //             <div className="page_item_disabled">
    //               <div className="page_item_img">
    //                 <img src={common} alt="#" />
    //               </div>
    //               <div className="page_item_descr">
    //                 <p>Специальности</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div
    //             className="horizontal_item"
    // data-item-value="objects_table"
    // onClick={userClick}
    //           >
    //             <div className="page_item_disabled">
    //               <div className="page_item_img">
    //                 <img src={common} alt="#" />
    //               </div>
    //               <div className="page_item_descr">
    //                 <p>Предметы</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div
    //             className="horizontal_item"
    // data-item-value="building_table"
    // onClick={userClick}
    //           >
    //             <div className="page_item_disabled">
    //               <div className="page_item_img">
    //                 <img src={common} alt="#" />
    //               </div>
    //               <div className="page_item_descr">
    //                 <p>Адреса</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         false
    //       )}
    // {modalSelect ? (
    //   <ModalController
    //     data={modalSelect}
    //     index={modalSelectIndex}
    //     close={modalClose}
    //     option={userSelect}
    //   />
    // ) : (
    //   false
    // )}
    // {!onBDWork ? (
    //   <>
    //     <TableWorker />
    //   </>
    // ) : userSelect ? (
    //   <SelectController select={userSelect} setIndex={modalChange} />
    // ) : (
    //   false
    // )}
    //     </div>
    //   </div>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    all_data: state.admin.data,
    dataFlow: state.admin.flow,
    permission: state.admin.access,
    data_is_loaded: state.admin.data_is_loaded,
  };
};

export default connect(mapStateToProps, null)(Workspace);
