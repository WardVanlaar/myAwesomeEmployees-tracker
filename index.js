const db = require("./db/connection.js");

// profiles
const Department = require("./lib/department");
const Employee = require("./lib/employee");
const Role = require("./lib/role");

// node modules
const fs = require("fs");
const inquirer = require("inquirer");
const res = require("express/lib/response");

// // options array
// const optionsArray = [];

// start of prompt
const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "Please select what you would like to do.",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then(({ options }) => {
      if (options === "view all departments") {
        const sql = `SELECT * FROM departments`;

        db.query(sql, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: rows
            });
          });

        // console.log(res.json);
        // console.table("departments", {sql});
      }
    });
};

promptUser();
