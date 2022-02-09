 DROP DATABASE IF EXISTS employee;
CREATE DATABASE employee;
USE employee;

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

INSERT INTO departments (id, name)
VALUES
  (1, 'admin&finance'),
  (2, "mark&com"),
  (3, 'R&D'),
  (4, 'KnowledgeTranslation');

INSERT INTO roles (id, title, salary, department_id)
VALUES
    (1, 'Director Fin&Admin', 100000, 1),
    (2, 'Director Mark&Com', 80000, 2),
    (3, 'Research Assistant', 40000, 3),
    (4, 'Research Scientist', 80000, 3),
    (5, 'Senior Research Scientist', 120000, 3),
    (6, 'KT specialist', 95000, 4),
    (7, 'President&CEO', 150000, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'James', 'Fraser', 1, 12),
    (2, 'Jack', 'London', 2, 12),
    (3, 'Robert', 'Bruce', 3, 5),
    (4, 'Peter', 'Greenaway', 3, 5),
    (5, 'Derek', 'Jarman', 4, 5),
    (6, 'Paolo', 'Pasolini', 4, 5),
    (7, 'Heathcote', 'Williams', 5, 12),
    (8, 'Sandy', 'Powell', 5, 12),
    (9, 'Emil', 'Zola', 6, 12),
    (10, 'Sissy', 'Coalpits', 6, 12),
    (11, 'Antoinette', 'Capet', 6, 12),
    (12,'Samuel', 'Delany', 7, NULL);
  