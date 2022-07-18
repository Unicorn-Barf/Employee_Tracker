// Sequel query commands for export


const getAllEmployees = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS Title, d.name AS Department, r.salary AS Salary, CONCAT(m.first_name, ', ', m.last_name) AS Manager FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id LEFT JOIN employee AS m ON e.manager_id = m.id INNER JOIN department AS d ON  r.department_id = d.id;`;

export {
    getAllEmployees,
}