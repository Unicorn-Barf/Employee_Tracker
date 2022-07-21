/*
* Obselete reference file for inquirer questions
* For dynamically updated choices, question defintion
* Had to be moved to index.js
*/

// // These are choices functions for question object key 'choice'
// import { rolesChoices, managerChoices, employeeChoices, departmentChoices } from './choices.js';

// // Question Objects for inquirer prompts

// // First inquirer prompt question that asks what the user wants to do
// const initQ = [
//     {
//         message: 'What would you like to do?',
//         name: 'task',
//         type: 'list',
//         choices: ['Manage Employees', 'Manage Roles', 'Manage Departments', 'Quit'],
//     }
// ];

// // Inquirer prompt question for Department related input
// let departmentQ = [
//     {
//         message: 'What would you like to do?',
//         name: 'task',
//         type: 'list',
//         choices: ['View All Departments', 'View a Department Budget', 'Edit Departments'],
//     },
//     {
//         message: "Which Department's budget do you want to see?",
//         name: 'id',
//         type: 'list',
//         choices: await departmentChoices(),
//         when(answers) {
//             return answers.task === 'View a Department Budget';
//         },
//     },
//     {
//         message: 'What would you like to do?',
//         name: 'editTask',
//         type: 'list',
//         choices: ['Add Department', 'Delete Department'],
//         when(answers) {
//             return answers.task === 'Edit Departments';
//         },
//     },
//     {
//         message: 'What is the Department name?',
//         name: 'name',
//         type: 'input',
//         when(answers) {
//             return answers.editTask === 'Add Department';
//         },
//     },
//     {
//         message: 'Which Department do you want to delete?',
//         name: 'id',
//         type: 'list',
//         choices: await departmentChoices(),
//         when(answers) {
//             return answers.editTask === 'Delete Department';
//         },
//     },
// ];

// // Inquirer prompt question for Role related input
// let roleQ = [
//     {
//         message: 'What would you like to do?',
//         name: 'task',
//         type: 'list',
//         choices: ['View All Roles', 'Edit Roles'],
//     },
//     {
//         message: 'What would you like to do?',
//         name: 'editTask',
//         type: 'list',
//         choices: ['Add Role', 'Delete Role'],
//         when(answers) {
//             return answers.task === 'Edit Roles';
//         },
//     },
//     {
//         message: "What is the title for this Role?",
//         name: 'title',
//         type: 'input',
//         when(answers) {
//             return answers.editTask === 'Add Role';
//         },
//     },
//     {
//         message: "What is the Salary for this Role?",
//         name: 'salary',
//         type: 'input',
//         when(answers) {
//             return answers.editTask === 'Add Role';
//         },
//     },
//     {
//         message: "What is the Department for this Role?",
//         name: 'department',
//         type: 'list',
//         choices: await departmentChoices(),
//         when(answers) {
//             return answers.editTask === 'Add Role';
//         },
//     },
//     {
//         message: "Which Role do you want to delete?",
//         name: 'id',
//         type: 'list',
//         choices: await rolesChoices(),
//         when(answers) {
//             return answers.editTask === 'Delete Role';
//         },
//     },
// ];

// // Inquirer prompt question for employee related input


// export {
//     initQ,
//     roleQ,
//     employeeQ,
//     departmentQ
// }