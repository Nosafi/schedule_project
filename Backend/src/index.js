import express from "express";
import props from "../settings/props.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import users from "./Models/users.js";

//orm imports
import faculties from "../src/Models/faculties.js";
import departments from "../src/Models/departments.js";
import specialties from "../src/Models/specialties.js";
import disciplines from "../src/Models/disciplines.js";
import types from "../src/Models/types.js";
import audiences from "../src/Models/audiences.js";
import addresses from "../src/Models/addresses.js";
import groups from "../src/Models/groups.js";
import teachers from "../src/Models/teachers.js";
import view from "../src/Models/view.js";
import time from "../src/Models/time.js";
import days from "../src/Models/days.js";
import repeatability from "../src/Models/repeatability.js";

//auth user
import schedules from "../src/Models/schedules.js";
import titles from "./Models/titles.js";
import auth from "./Models/auth.js";
import roles from "./Models/roles.js";

//jwt
const secret = "yyyyyy3341ddddnnnqqqqr";

const app = express();

app.use(cors({ origin: true }), express.json());

const seq = props.sequelize;

//const check = props.seqAuth(seq); -- sequelize connection status

// --- часть пользователя

//факультеты
app.get("/api/faculties", (req, res) => {
  faculties
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//кафедры
app.get("/api/departments", (req, res) => {
  departments
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//время занятий
app.get("/api/time", (req, res) => {
  time
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//дни
app.get("/api/days", (req, res) => {
  days
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//повторяемость
app.get("/api/repeatability", (req, res) => {
  repeatability
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//преподаватели
app.get("/api/teachers/", (req, res) => {
  teachers
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//дисциплины
app.get("/api/disciplines/", (req, res) => {
  disciplines
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//типы дисциплин
app.get("/api/disciplines/types", (req, res) => {
  types
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//учебные группы
app.get("/api/groups", (req, res) => {
  groups
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//аудитории
app.get("/api/audiences/", (req, res) => {
  audiences
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//специальности
app.get("/api/specialties", (req, res) => {
  specialties
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//адреса
app.get("/api/addresses", (req, res) => {
  addresses
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//расписание
app.get("/api/schedules/view", (req, res) => {
  view
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//поиск по группе
app.get("/api/schedules/view/group/:number", (req, res) => {
  view
    .findAll({ where: { group: req.params.number } })
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//поиск по преподавателю

app.get("/api/schedules/view/teacher/:FIO", (req, res) => {
  view
    .findAll({ where: { teacher: req.params.FIO } })
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});
// --- часть авторизованного пользователя

const tableValidate = (name) => {
  switch (name) {
    case "addresses":
      return addresses;
    case "faculties":
      return faculties;
    case "departments":
      return departments;
    case "specialties":
      return specialties;
    case "disciplines":
      return disciplines;
    case "types":
      return types;
    case "audiences":
      return audiences;
    case "groups":
      return groups;
    case "teachers":
      return teachers;
    case "schedules":
      return schedules;
    case "titles":
      return titles;
    default:
      break;
  }
};

//список названий расписаний

app.get("/api/schedules/titles", (req, res) => {
  titles
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//расписание

app.get("/api/schedules", (req, res) => {
  schedules
    .findAll()
    .then((results) => {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//авторизация

app.post("/api/user/auth/", (req, res) => {
  const request = req.body;
  const user = {};
  auth
    .findOne({
      where: [{ auth_login: request.login }, { auth_pass: request.password }],
    })
    .then((results) =>
      users
        .findOne({
          where: { user_id: results.auth_user },
        })
        .then((results) => {
          Object.assign(user, results.dataValues);
        })
    )
    .then(() =>
      roles.findOne({
        where: { role_id: user.user_role },
      })
    )
    .then((results) => {
      Object.assign(user, { role: results.dataValues.role_name });
    })
    .then(() => {
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: jwt.sign(
            {
              firstName: user.user_fname,
              lastName: user.user_lname,
              patronymic: user.user_patr,
              role: user.role,
            },
            secret,
            { expiresIn: "12hr" }
          ),
        })
      );
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: 500, error, response: null }));
    });
});

//работа с расписанием

app.post("/api/schedules/flow/", (req, res) => {
  // {"id": {"sch_id": 5}, "data": {
  //   "sch_table_title": 1,
  //   "sch_repeatability": 3,
  //   "sch_time": 1,
  //   "sch_subject": 1,
  //   "sch_subject_type": 1,
  //   "sch_teacher": 1,
  //   "sch_group": 2,
  //   "sch_day": 1,
  //   "sch_audience": 2
  // }}
  const id = req.body.id;
  const detail = req.body.data;
  schedules
    .findOne({ where: id })
    .then((results) => {
      return results
        ? schedules
            .destroy({
              where: id,
            })
            .then(schedules.create(detail))
        : schedules.create(detail);
    })
    .then(() => {
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: "Operation was successful",
        })
      );
    })
    .catch((error) => {
      res.send(
        JSON.stringify({
          status: 200,
          error: error,
          response: "Operation was ended with error",
        })
      );
    });
});

//добавление данных

app.post("/api/new/", (req, res) => {
  //пример с адресами {"table": "addresses", "data": {"adress_detail": "f"}}

  const name = req.body.table;
  const detail = req.body.data;
  tableValidate(name)
    .create(detail)
    .then(() => {
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: "Operation was successful",
        })
      );
    })
    .catch((error) => {
      res.send(
        JSON.stringify({
          status: 200,
          error: error,
          response: "Operation was ended with error",
        })
      );
    });
});

//редактирование данных

app.post("/api/exist/", (req, res) => {
  //пример с адресами {"table": "addresses","id":{"address_id":16}, "data": {"adress_detail": "f"}}
  const name = req.body.table;
  const id = req.body.id;
  const detail = req.body.data;

  tableValidate(name)
    .update(detail, {
      where: id,
    })
    .then((results) => {
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: "Operation was successful",
        })
      );
    })
    .catch((error) => {
      res.send(
        JSON.stringify({
          status: 200,
          error: error,
          response: "Operation was ended with error",
        })
      );
    });
});

//удаление данных

app.post("/api/delete/", (req, res) => {
  //пример с адресами {"table": "addresses","id":{"address_id":16}}
  const name = req.body.table;
  const id = req.body.id;

  tableValidate(name)
    .destroy({
      where: id,
    })
    .then((results) => {
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: "Operation was successful",
        })
      );
    })
    .catch((error) => {
      res.send(
        JSON.stringify({
          status: 200,
          error: error,
          response: "Operation was ended with error",
        })
      );
    });
});

app.listen(props.server.port, () => {
  console.log("Server start on port: " + props.server.port);
});
