import inquirer from 'inquirer';
import cTable from 'console.table';
import { connection } from './db/connection.js';
import { rolesChoices, managerChoices, employeeChoices } from './utils/choices.js';
import { 
    getAllEmployees,
    getEmployeesByManager,
    getEmployeesByDepartment,
    addEmployee,
    updateEmployeeRole,
    deleteEmployee
}
from './db/queries.js';


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

const roleQ = [
    {
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['View All Roles', 'Edit Role(s)'],
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
        name: 'task',
        type: 'editTask',
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
    const answers = await inquirer.prompt(employeeQ);
    if (answers.task === 'View Employees') {
        // handle displaying Employees to console
        // 'View All', 'By Manager', 'By Department'
        if (answers.view === 'View All') {
            // display all the employees
            try {
                const employees = await connection.query(getAllEmployees);
                console.table('\n\n\n\n\nAll Employees', employees[0], '\n');
            } catch (error) {
                console.log(error);
            };
        }
        else if (answers.view === 'By Manager') {
            // display all the employees grouped by manager
            try {
                const employees = await connection.query(getEmployeesByManager);
                console.table('\n\n\n\n\nEmployees Grouped by Manager', employees[0], '\n');
            } catch (error) {
                console.log(error);
            };
        }
        else {
            // display all the employees joined by department
            try {
                const employees = await connection.query(getEmployeesByDepartment);
                console.table('\n\n\n\n\nEmployees Grouped by Department', employees[0], '\n');
            } catch (error) {
                console.log(error);
            };
        };
        // Call init() to see if user wants to quit or continue
        init();
    }
    else {
        // handle Editing Employees in the data base
        // answers.editTask
        // 'Add Employee', 'Update Employee Role', 'Delete Employee'
        if (answers.editTask === 'Add Employee') {
            // Add Employee to Database
            try {
                await connection.query(addEmployee, [answers.first, answers.last, answers.role, answers.manager]);
                console.table('\n\n\n\n\nSuccess!!', '\n');
            } catch (error) {
                console.log(error);
            };
        }
        else if (answers.editTask === 'Update Employee Role') {
            // Update an Employees Role
            try {
                await connection.query(updateEmployeeRole, [answers.role, answers.id]);
                console.table('\n\n\n\n\nSuccess!!', '\n');
            } catch (error) {
                console.log(error);
            };
        }
        else {
            // Delete an Employee
            try {
                await connection.query(deleteEmployee, [answers.id]);
                console.table('\n\n\n\n\nSuccess!!', '\n');
            } catch (error) {
                console.log(error);
            };
        };
        // Call init() to see if user wants to quit or continue
        init();
    }
};

const manageRole = async () => {
    const answers = await inquirer.prompt(roleQ);
    if (answers.task === 'View All Roles') {
        // handle displaying Employees to console
    }
    else {
        // handle Editing Emplyees in the data base
    }
};

const manageDepartment = async () => {
    const answers = await inquirer.prompt(departmentQ);
    if (answers.task === 'View All Departments') {
        // handle displaying Employees to console
    }
    else {
        // handle Editing Emplyees in the data base
    }
};


// init function to start code
init();

