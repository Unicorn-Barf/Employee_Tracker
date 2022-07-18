USE employees_db;

INSERT INTO department(name)
VALUES ('Hair and Makeup'),
    ('Finance'),
    ('Set Design'),
    ('Wardrobe');

INSERT INTO role(title, salary, department_id)
VALUES ('Makeup Artist', 20000, 1),
    ('Makeup Director', 50000, 1),
    ('Analyst', 100000, 2),
    ('CPA', 90000, 2),
    ('Finance Director', 500000, 2),
    ('Set Builder', 30000, 3),
    ('Set Designer', 70000, 3),
    ('Fashion Expert', 200000, 4),
    ('Accessories Specialist', 150000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Chris', 'Yu', 1, 2),
    ('Christina', 'Yu', 2, null),
    ('John', 'Yang', 3, 5),
    ('Wendy', 'Yang', 4, 5),
    ('Steven', 'Yang', 5, null),
    ('Twiddle', 'Dee', 6, 7),
    ('Twiddle', 'Dum', 7, null),
    ('Joan', 'Rivers', 8, null),
    ('Ugly', 'Betty', 9, 8);