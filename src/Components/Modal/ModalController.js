import React from "react";
import Modal from "./Modal";
import Add from "./ModalTypes/Add";
import Edit from "./ModalTypes/Edit";
import Delete from "./ModalTypes/Delete";
import Dataflow from "./ModalTypes/DataFlow";

const ModalController = (props) => {
  // console.log(props.data);
  const Controller = (opt, index) => {
    switch (props.data) {
      case "add":
        return (
          <Modal
            modalType={<Add option={opt} close={props.close} />}
            close={props.close}
          />
        );
      case "edit":
        return (
          <Modal
            modalType={
              <Edit option={opt} elem_id={index} close={props.close} />
            }
            close={props.close}
          />
        );
      case "delete":
        return (
          <Modal
            modalType={
              <Delete option={opt} elem_id={index} close={props.close} />
            }
            close={props.close}
          />
        );
      case "workflow_add":
        return (
          <Modal
            modalType={<Dataflow option={opt} close={props.close} />}
            close={props.close}
          />
        );
      default:
        break;
    }
  };
  return <>{Controller(props.option, props.index)}</>;
};

export default ModalController;
