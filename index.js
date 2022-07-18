import inquirer from 'inquirer';
import cTable from 'console.table';


// Create questions for inquire
const initQ = [
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['Manage Employees', 'Manage Roles', 'Manage Departments', 'Quit'],
    }
];

const employeeQ = [
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['View Employees', 'Edit Employee(s)'],
    },
    {
        message: 'How would you like to view Employees?',
        name: 'task',
        type: 'list',
        choices: ['View All', 'By Manager', 'By Department'],
        when(answers) {
            return answers.task === 'View Employees';
        },
    },
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['Add Employee', 'Update Employee Role', 'Delete Employee'],
        when(answers) {
            return answers.task === 'View Employees';
        },
    }
];

const roleQ = [
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['View All Roles', 'Edit Role(s)'],
    },
    {
        message: 'How would you like to view Employees?',
        name: 'task',
        type: 'list',
        choices: ['View All', 'By Manager', 'By Department'],
        when(answers) {
            return answers.task === 'View Employees';
        },
    },
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['Add Employee', 'Update Employee Role', 'Delete Employee'],
        when(answers) {
            return answers.task === 'View Employees';
        },
    }
];

const departmentQ = [
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['View All Departments', 'Edit Department(s)'],
    },
    {
        message: 'How would you like to view Employees?',
        name: 'task',
        type: 'list',
        choices: ['View All', 'By Manager', 'By Department'],
        when(answers) {
            return answers.task === 'View Employees';
        },
    },
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['Add Employee', 'Update Employee Role', 'Delete Employee'],
        when(answers) {
            return answers.task === 'View Employees';
        },
    }
];



// init function
// Handles inquirer prompts and command line printing
//  calls on other functions to do the work
const init = async () => {
    // Run first inquire prompt to get what task user wants to do
    // 'Manage Employees', 'Manage Roles', 'Manage Departments', or 'Quit'
    // Call appropriate function
    const task = await inquirer.prompt(initQ);
    if (task.task === 'Manage Employees') {
        manageEmployee();
    }
    else if (task.task === 'Manage Roles') {
        manageRole();
    }
    else if (task.task === 'Manage Departments') {
        manageDepartment();
    }
    else {
        // Return and exit
        return;
    };
}

const manageEmployee = async () => {

};

const manageRole = async () => {

};

const manageDepartment = async () => {

};


// init function to start code
init();