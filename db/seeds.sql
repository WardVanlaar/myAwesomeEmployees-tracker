INSERT INTO managers (id, employee_id, first_name, last_name)
VALUES
  (1, 5, 'Derek', 'Jarman'),
  (2, 12,'Samuel', 'Delany');

INSERT INTO departments (id, name)
VALUES
  (1, 'admin&finance'),
  (2, "mark&com"),
  (3, 'R&D'),
  (4, 'Knowledge Translation');

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
    (1, 'James', 'Fraser', 1, 2),
    (2, 'Jack', 'London', 2, 2),
    (3, 'Robert', 'Bruce', 3, 1),
    (4, 'Peter', 'Greenaway', 3, 1),
    (5, 'Derek', 'Jarman', 4, 2),
    (6, 'Paolo', 'Pasolini', 4, 2),
    (7, 'Heathcote', 'Williams', 5, 2),
    (8, 'Sandy', 'Powell', 5, 2),
    (9, 'Emil', 'Zola', 6, 2),
    (10, 'Sissy', 'Coalpits', 6, 2),
    (11, 'Antoinette', 'Capet', 6, 2),
    (12,'Samuel', 'Delany', 7, 2);


  