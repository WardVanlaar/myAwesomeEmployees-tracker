INSERT INTO managers (employee_id, manager_first_n, manager_last_n)
VALUES
  (5, 'Derek', 'Jarman'),
  (12,'Samuel', 'Delany');

INSERT INTO departments (dep_name)
VALUES
  ('admin&finance'),
  ('mark&com'),
  ('R&D'),
  ('Knowledge Translation'),
  ('executive');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Director Fin&Admin', 100000, 1),
    ('Director Mark&Com', 80000, 2),
    ('Research Assistant', 40000, 3),
    ('Research Scientist', 80000, 3),
    ('Senior Research Scientist', 120000, 3),
    ('KT specialist', 95000, 4),
    ('President&CEO', 150000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Fraser', 1, 2),
    ('Jack', 'London', 2, 2),
    ('Robert', 'Bruce', 3, 1),
    ('Peter', 'Greenaway', 3, 1),
    ('Derek', 'Jarman', 4, 2),
    ('Paolo', 'Pasolini', 4, 2),
    ('Heathcote', 'Williams', 5, 2),
    ('Sandy', 'Powell', 5, 2),
    ('Emil', 'Zola', 6, 2),
    ('Sissy', 'Coalpits', 6, 2),
    ('Antoinette', 'Capet', 6, 2),
    ('Samuel', 'Delany', 7, 2);
