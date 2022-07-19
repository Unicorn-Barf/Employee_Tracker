// SQL query commands for export

// Employee Queries
const getAllEmployees = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS Title, d.name AS Department, r.salary AS Salary, CONCAT(m.first_name, ', ', m.last_name) AS Manager
FROM employee AS e
INNER JOIN role AS r ON e.role_id = r.id
LEFT JOIN employee AS m ON e.manager_id = m.id
INNER JOIN department AS d ON  r.department_id = d.id;`;

const getEmployeesByManager = `SELECT CONCAT(m.first_name, ', ', m.last_name) AS Manager, e.id AS 'Employee ID', e.first_name AS 'First Name', e.last_name AS 'Last Name'
FROM employee AS e
INNER JOIN employee AS m ON e.manager_id = m.id
GROUP BY Manager;`

const getEmployeesByDepartment = `SELECT  d.name AS department, e.id AS 'Employee ID', e.first_name AS 'First Name', e.last_name AS 'Last Name'
FROM employee AS e
INNER JOIN role AS r ON e.role_id = r.id
INNER JOIN department AS d ON r.department_id = d.id;`;

const addEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);`;

const updateEmployeeRole = `UPDATE employee
SET role_id = ?
WHERE id = ?;`;

const deleteEmployee = `DELETE FROM employee
WHERE id = ?;`;


// Role queries
const getAllRoles = `SELECT r.title AS Title, r.id AS 'Role ID', d.name AS Department, CONCAT('$', r.salary) AS Salary
FROM role AS r
LEFT JOIN department AS d ON r.department_id = d.id;`;

const addRole = `INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);`;

const deleteRole = `DELETE FROM role
WHERE id = ?;`;


// Department Queries
const getAllDepartments = `SELECT d.id AS ID, d.name AS Department
FROM department AS d;`;

const addDepartment = `INSERT INTO department (name)
VALUES (?)`;

const deleteDepartment = `DELETE FROM department
WHERE id = ?`;

export {
    getAllEmployees,
    getEmployeesByManager,
    getEmployeesByDepartment,
    addEmployee,
    updateEmployeeRole,
    deleteEmployee,
    getAllRoles,
    addRole,
    deleteRole,
    getAllDepartments,
    addDepartment,
    deleteDepartment
}