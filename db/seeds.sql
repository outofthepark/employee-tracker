INSERT INTO departments (name)
VALUES
  ('Tech'),
  ('HR'),
  ('Finance'),
  ('Marking');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('CEO', 100000.00, 1),
  ('CTO', 90000.00, 1),
  ('Senior Developer', 80000.00, 1),
  ('Developer', 70000.00, 1),
  ('Intern', 35000.00, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 2),
  ('Piers', 'Gaveston', 2, 3),
  ('Charles', 'LeRoi', 2, 3),
  ('Katherine', 'Mansfield', 2, 3),
  ('Dora', 'Carrington', 2, 3),
  ('Edward', 'Bellamy', 3, 4),
  ('Montague', 'Summers', 4, 4),
  ('Octavia', 'Butler', 4, 4),
  ('Unica', 'Zurn', 5, 5);