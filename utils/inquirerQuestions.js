// These are choices functions for question object key 'choice'
import { rolesChoices, managerChoices, employeeChoices } from './choices.js';

// Question Objects for inquirer prompts

// First inquirer prompt question that asks what the user wants to do
const initQ = [
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['Manage Employees', 'Manage Roles', 'Manage Departments', 'Quit'],
    }
];

// Inquirer prompt question for Role related input
const roleQ = [
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['View All Roles', 'Edit Roles'],
    },
    {
        message: 'What would you like to do?',
        name: 'editTask',
        type: 'list',
        choices: ['Add Role', 'Delete Role'],
        when(answers) {
            return answers.task === 'Edit Roles';
        },
    },
    {
        message: "What is the title for this Role?",
        name: 'title',
        type: 'input',
        when(answers) {
            return answers.editTask === 'Add Role';
        },
    },
    {
        message: "What is the Salary for this Role?",
        name: 'salary',
        type: 'input',
        when(answers) {
            return answers.editTask === 'Add Role';
        },
    },
    {
        message: "What is the Department for this Role?",
        name: 'department',
        type: 'list',
        choices: await departmentChoices(),
        when(answers) {
            return answers.editTask === 'Add Role';
        },
    },
    {
        message: "Which Role do you want to delete?",
        name: 'id',
        type: 'list',
        choices: await rolesChoices(),
        when(answers) {
            return answers.editTask === 'Delete Role';
        },
    },
];

// Inquirer prompt question for employee related input
const employeeQ = [
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['View Employees', 'Edit Employees'],
    },
    {
        message: 'How would you like to view Employees?',
        name: 'view',
        type: 'list',
        choices: ['View All', 'By Manager', 'By Department'],
        when(answers) {
            return answers.task === 'View Employees';
        },
    },
    {
        message: 'What would you like to do?',
        name: 'editTask',
        type: 'list',
        choices: ['Add Employee', 'Update Employee Role', 'Delete Employee'],
        when(answers) {
            return answers.task === 'Edit Employees';
        },
    },
    {
        message: "What is the Employee's first name?",
        name: 'first',
        type: 'input',
        when(answers) {
            return answers.editTask === 'Add Employee';
        },
    },
    {
        message: "What is the Employee's last name?",
        name: 'last',
        type: 'input',
        when(answers) {
            return answers.editTask === 'Add Employee';
        },
    },
    {
        message: "What is the Employee's role?",
        name: 'role',
        type: 'list',
        choices: await rolesChoices(),
        when(answers) {
            return answers.editTask === 'Add Employee';
        },
    },
    {
        message: "Who is the Employee's manager?",
        name: 'manager',
        type: 'list',
        choices: await managerChoices(),
        when(answers) {
            return answers.editTask === 'Add Employee';
        },
    },
    {
        message: "Which Employee do you want to update?",
        name: 'id',
        type: 'list',
        choices: await employeeChoices(),
        when(answers) {
            return answers.editTask === 'Update Employee Role';
        },
    },
    {
        message: "What is the Employee's role?",
        name: 'role',
        type: 'list',
        choices: await rolesChoices(),
        when(answers) {
            return answers.editTask === 'Update Employee Role';
        },
    },
    {
        message: "Which Employee do you want to delete?",
        name: 'id',
        type: 'list',
        choices: await employeeChoices(),
        when(answers) {
            return answers.editTask === 'Delete Employee';
        },
    },
    
];

export {
    initQ,
    roleQ,
    employeeQ,
}