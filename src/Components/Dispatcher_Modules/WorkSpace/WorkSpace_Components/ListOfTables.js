import React, { useState } from "react";
import { connect } from "react-redux";
import Table from "./Table";

const ListOfTables = (props) => {
  const [isInTable, setIsInTable] = useState(false);

  const [Data, setData] = useState([]);
  const [Groups, setGroups] = useState([]);
  const [TableName, setTableName] = useState("");
  const [Semestr, setSemestr] = useState("");

  let group_mass = [],
    filtered_data = [];

  function open_table(id, name) {
    function unique(arr) {
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        let str = arr[i].sch_group;
        if (!result.includes(str)) {
          result.push(str);
        }
      }
      return result;
    }

    filtered_data = props.all_data.schedule.filter((item) => {
      if (item.sch_table_title == id) return item;
    });

    group_mass = unique(filtered_data);
    setTableName(name);

    let semestr_found = props.all_data.list_of_names.filter((item) => {
      if (item.title_id == id) {
        return item;
      }
    });

    setSemestr(semestr_found.title_semestr);
    setGroups(group_mass);
    setData(filtered_data);
    setIsInTable(true);
  }

  return (
    <div>
      {isInTable ? (
        <div>
          <button
            onClick={() => {
              setIsInTable(false);
            }}
          >
            Закрыть открытую таблицу
          </button>
          <Table
            group_mass={Groups}
            data={Data}
            table_name={TableName}
            semestr={Semestr}
          />
        </div>
      ) : (
        <div>
          {props.all_data.list_of_names.map((item) => {
            return (
              <div
                key={"name_id_" + item.title_id}
                onClick={() => {
                  open_table(item.title_id, item.title_name);
                }}
              >
                {item.title_name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    all_data: state.admin.data,
  };
};

export default connect(mapStateToProps, null)(ListOfTables);
