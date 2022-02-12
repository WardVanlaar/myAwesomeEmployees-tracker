const db = require("./db/connection.js");

// node modules
const fs = require("fs");
const inquirer = require("inquirer");
const res = require("express/lib/response");

// console.table
const cTable = require("console.table");

// start of prompt

console.log(`
 -------------------------------
|                               |
|     EMPLOYEE                  |
|                 MANAGER       |
|                               |
 -------------------------------
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
          "view employees by manager",
          "view employees by department",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "update an employee's manager",
          "delete a department",
          "delete a role",
          "delete an employee",
          "view department budget",
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
      } else if (options === "view employees by manager") {
        const sql = `SELECT * FROM employees LEFT JOIN managers ON employees.manager_id = managers.id `;
        db.query(sql, function (err, results) {
          console.table("Employees by manager", results);
          promptUser();
        });
      } else if (options === "view employees by department") {
        const sql = ` SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id 
                        LEFT JOIN departments ON roles.department_id = departments.id`;
        db.query(sql, function (err, results) {
          console.table("Employees by department", results);
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
          .then((responseObj) => {
            const [title] = Object.values(responseObj);
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            db.query(sql, [title], function (err, results) {
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
              message: "What is the first name of the employee? (Required)",
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
      } else if (options === "update an employee role") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "role_id",
              message:
                "What is the new role you want to assign to this employee? Use the corresponding ID from the roles table.",
              validate: (role_idInput) => {
                if (isNaN(role_idInput)) {
                  console.log(
                    "Please enter a number representing the new role's ID"
                  );
                  return false;
                } else {
                  return true;
                }
              },
            },
            {
              type: "input",
              name: "employee_id",
              message:
                "What is the ID of the employee whose role you want to update? Use the corresponding role ID from the employee table.",
              validate: (employee_idInput) => {
                if (isNaN(employee_idInput)) {
                  console.log("Please enter an employee ID using numbers only");
                  return false;
                } else {
                  return true;
                }
              },
            },
          ])
          .then((responseObj) => {
            const [role_id, employee_id] = Object.values(responseObj);
            const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
            db.query(sql, [role_id, employee_id], function (err, results) {
              console.log("Employee role updated");
              promptUser();
            });
          });
      } else if (options === "update an employee's manager") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "manager_id",
              message:
                "What is the ID of the employee's new manager? Use the corresponding ID from the employee table.",
              validate: (role_idInput) => {
                if (isNaN(role_idInput)) {
                  console.log(
                    "Please enter a number representing the new manager's employee ID"
                  );
                  return false;
                } else {
                  return true;
                }
              },
            },
            {
              type: "input",
              name: "employee_id",
              message:
                "What is the ID of the employee whose manager you want to update? Use the corresponding role ID from the employee table.",
              validate: (employee_idInput) => {
                if (isNaN(employee_idInput)) {
                  console.log("Please enter an employee ID using numbers only");
                  return false;
                } else {
                  return true;
                }
              },
            },
          ])
          .then((responseObj) => {
            const [manager_id, employee_id] = Object.values(responseObj);
            const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
            db.query(sql, [manager_id, employee_id], function (err, results) {
              console.log("Employee's manager updated");
              promptUser();
            });
          });
      } else if (options === "delete a department") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "delete_dep",
              message:
                "What is the ID of the department you want to delete? Use the corresponding ID from the department table.",
              validate: (delete_depInput) => {
                if (isNaN(delete_depInput)) {
                  console.log(
                    "Please enter a number representing the department's ID"
                  );
                  return false;
                } else {
                  return true;
                }
              },
            },
          ])
          .then((responseObj) => {
            const [delete_dep] = Object.values(responseObj);
            const sql = `DELETE FROM departments WHERE id = ?`;
            db.query(sql, [delete_dep], function (err, results) {
              console.log("Department deleted");
              promptUser();
            });
          });
      } else if (options === "delete a role") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "delete_role",
              message:
                "What is the ID of the role you want to delete? Use the corresponding ID from the roles table.",
              validate: (delete_roleInput) => {
                if (isNaN(delete_roleInput)) {
                  console.log(
                    "Please enter a number representing the role's ID"
                  );
                  return false;
                } else {
                  return true;
                }
              },
            },
          ])
          .then((responseObj) => {
            const [delete_role] = Object.values(responseObj);
            const sql = `DELETE FROM roles WHERE id = ?`;
            db.query(sql, [delete_role], function (err, results) {
              console.log("Role deleted");
              promptUser();
            });
          });
      } else if (options === "delete an employee") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "delete_emp",
              message:
                "What is the ID of the employee you want to delete? Use the corresponding ID from the employees table.",
              validate: (delete_empInput) => {
                if (isNaN(delete_empInput)) {
                  console.log(
                    "Please enter a number representing the employee's ID"
                  );
                  return false;
                } else {
                  return true;
                }
              },
            },
          ])
          .then((responseObj) => {
            const [delete_emp] = Object.values(responseObj);
            const sql = `DELETE FROM employees WHERE id = ?`;
            db.query(sql, [delete_emp], function (err, results) {
              console.log("Employee deleted");
              promptUser();
            });
          });
      } else if (options === "view department budget") {
        const sql = `SELECT employees.id, sum(salary) AS budget FROM employees
                          LEFT JOIN roles ON roles.id=employees.role_id 
                          LEFT JOIN departments on departments.id=roles.department_id 
                          GROUP BY roles.department_id`;
        db.query(sql, function (err, results) {
          console.table("Employees by manager", results);
          promptUser();
        });
      }
    });
};

promptUser();
