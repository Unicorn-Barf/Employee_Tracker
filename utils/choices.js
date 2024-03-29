// File of functions to use for inquirer question choices
// Will check the database for appropriate choices for 'choice:' key in question object

import { connection } from '../db/connection.js';

const departmentChoices = async () => {
    const departmentQuery = `SELECT id AS value, name FROM department;`;
    const departments = await connection.query(departmentQuery);
    return departments[0];
}

 const rolesChoices = async () => {
    const rolesQuery = `SELECT id AS value, title AS name FROM role;`;
    const roles = await connection.query(rolesQuery);
    return roles[0];
 };

 const managerChoices = async () => {
    const managerQuery = `SELECT id AS value, CONCAT(first_name, ', ', last_name) AS name FROM employee WHERE manager_id IS NULL;`;
    const roles = await connection.query(managerQuery);
    return roles[0];
 };

 const employeeChoices = async () => {
    const managerQuery = `SELECT id AS value, CONCAT(first_name, ', ', last_name) AS name FROM employee;`;
    const roles = await connection.query(managerQuery);
    return roles[0];
 };

 export {
    rolesChoices,
    managerChoices,
    employeeChoices,
    departmentChoices
 };



