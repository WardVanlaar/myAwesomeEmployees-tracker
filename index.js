const db = require("./db/connection.js");

// profiles
const Department = require("./lib/department");
const Employee = require("./lib/employee");
const Role = require("./lib/role");

// node modules
const fs = require("fs");
const inquirer = require("inquirer");
const res = require("express/lib/response");

// console.table
const cTable = require("console.table");

// start of prompt

console.log(`
 -----------------------------------------------
|  __         __         __        __   __      |
| |_   |\/|  |__|  |    |  |  \/  |_   |_       |
| |__  |  |  |     |__  |__|  /   |__  |__      |
|                                 __   __  __   |
 -----------------------------------------------
`);

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
        db.query(`SELECT * FROM departments`, function (err, results) {
          console.table("Departments", results);
          promptUser();
        });
      } else if (options === "view all roles") {
        db.query(`SELECT * FROM roles`, function (err, results) {
          console.table("Roles", results);
          promptUser();
        });
      } else if (options === "view all employees") {
        db.query(`SELECT * FROM employees`, function (err, results) {
          console.table("Employees", results);
          promptUser();
        });
      } else if (options === "add a department") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "What is the title of the department? (Required)",
              validate: (titleInput) => {
                if (titleInput) {
                  return true;
                } else {
                  console.log("Please enter a title!");
                  return false;
                }
              },
            },
          ])
          .then(({ title }) => {
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            db.query(sql, title, function (err, results) {
              console.log(`Department added`);
              promptUser();
            });
          });
      } else if (options === "add a role") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message:
                "What is the title of the role would you like to add? (Required)",
              validate: (titleInput) => {
                if (titleInput) {
                  return true;
                } else {
                  console.log("Please enter a role!");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "salary",
              message: "What salary does this role make?",
              validate: (salaryInput) => {
                if (isNaN(salaryInput)) {
                  console.log("Please enter a salary using numbers only");
                  return false;
                } else {
                  return true;
                }
              },
            },
            {
              type: "input",
              name: "department",
              message:
                "What department does this role belong to? Use the corresponding number ID from the departments table.",
              validate: (departmentInput) => {
                if (isNaN(departmentInput)) {
                  console.log(
                    "Please enter a department using its corresponding number"
                  );
                  return false;
                } else {
                  return true;
                }
              },
            },
          ])
          .then((responseObj) => {
            const [title, salary, department] = Object.values(responseObj);
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
            db.query(sql, [title, salary, department], function (err, results) {
              console.log("Role added");
              promptUser();
            });
          });
      } else if (options === "add an employee") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is the first name of the emplyee? (Required)",
              validate: (firstNameInput) => {
                if (firstNameInput) {
                  return true;
                } else {
                  console.log("Please enter a first name!");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the last name of the employee? (Required)",
              validate: (lastNameInput) => {
                if (lastNameInput) {
                  return true;
                } else {
                  console.log("Please enter a first name!");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "role_ID",
              message:
                "What is the role of this employee? Use the corresponding role ID from the roles table.",
              validate: (salaryInput) => {
                if (isNaN(salaryInput)) {
                  console.log("Please enter a role using numbers only");
                  return false;
                } else {
                  return true;
                }
              },
            },
            {
              type: "input",
              name: "manager_ID",
              message:
                "Who is this employee's manager? Use the corresponding number ID from the employee table.",
              validate: (departmentInput) => {
                if (isNaN(departmentInput)) {
                  console.log(
                    "Please enter a number representing the manager's employee ID"
                  );
                  return false;
                } else {
                  return true;
                }
              },
            },
          ])
          .then((responseObj) => {
            const [firstName, lastName, role_ID, manager_ID] =
              Object.values(responseObj);
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            db.query(
              sql,
              [firstName, lastName, role_ID, manager_ID],
              function (err, results) {
                console.log("Employee added");
                promptUser();
              }
            );
          });
      }
    });
};

promptUser();
