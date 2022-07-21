import inquirer from 'inquirer';
import cTable from 'console.table';
import { connection } from './db/connection.js';
import { initQ, roleQ, departmentQ } from './utils/inquirerQuestions.js';
import { rolesChoices, managerChoices, employeeChoices, departmentChoices } from './utils/choices.js';
import {
    getAllEmployees,
    getEmployeesByManager,
    getEmployeesByDepartment,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteEmployee,
    getAllRoles,
    addRole,
    deleteRole,
    getAllDepartments,
    addDepartment,
    deleteDepartment,
    viewBudget
}
    from './db/queries.js';





// init function
// Handles inquirer prompts and command line printing
//  calls on other functions to do the work
const init = async () => {
    const initQ = [
        {
            message: 'What would you like to do?',
            name: 'task',
            type: 'list',
            choices: ['Manage Employees', 'Manage Roles', 'Manage Departments', 'Quit'],
        }
    ];

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
    // Inquirer Question must be here to Update Choices that require
    // a database query function
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
            choices: ['Add Employee', 'Update Employee Role', 'Update Employee Manager', 'Delete Employee'],
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
            message: "Which Employee do you want to update?",
            name: 'id',
            type: 'list',
            choices: await employeeChoices(),
            when(answers) {
                return answers.editTask === 'Update Employee Manager';
            },
        },
        {
            message: "Who is the Employee's manager?",
            name: 'manager',
            type: 'list',
            choices: await managerChoices(),
            when(answers) {
                return answers.editTask === 'Update Employee Manager';
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
            // display all the employees grouped by department
            try {
                const employees = await connection.query(getEmployeesByDepartment);
                console.table('\n\n\n\n\nEmployees Grouped by Department', employees[0], '\n');
            } catch (error) {
                console.log(error);
            };
        };
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
            // Update an Employee's Role
            try {
                await connection.query(updateEmployeeRole, [answers.role, answers.id]);
                console.table('\n\n\n\n\nSuccess!!', '\n');
            } catch (error) {
                console.log(error);
            };
        }
        else if (answers.editTask === 'Update Employee Manager') {
            // Update an Employee's Manager
            try {
                await connection.query(updateEmployeeManager, [answers.manager, answers.id]);
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
    };
    // Call init() to see if user wants to quit or continue
    init();
};

const manageRole = async () => {
    // Inquirer Question must be here to Update Choices that require
    // a database query function
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
    const answers = await inquirer.prompt(roleQ);
    if (answers.task === 'View All Roles') {
        // handle displaying Roles to console
        try {
            const roles = await connection.query(getAllRoles);
            console.table('\n\n\n\n\nAll Roles\n', roles[0], '\n');
        } catch (error) {
            console.log(error);
        };
    }
    else {
        // handle Editing Roles in the data base
        if (answers.editTask === 'Add Role') {
            // Add Role to Database
            try {
                await connection.query(addRole, [answers.title, answers.salary, answers.department]);
                console.table('\n\n\n\n\nSuccess!!', '\n');
            } catch (error) {
                console.log(error);
            };
        }
        // Handle Deleting a Role from the database
        else {
            try {
                await connection.query(deleteRole, [answers.id]);
                console.table('\n\n\n\n\nSuccess!!', '\n');
            } catch (error) {
                console.log(error);
            };
        }
    }
    // Call init() to see if user wants to quit or continue
    init();
};

const manageDepartment = async () => {
    // Inquirer Question must be here to Update Choices that require
    // a database query function
    const departmentQ = [
        {
            message: 'What would you like to do?',
            name: 'task',
            type: 'list',
            choices: ['View All Departments', 'View a Department Budget', 'Edit Departments'],
        },
        {
            message: "Which Department's budget do you want to see?",
            name: 'id',
            type: 'list',
            choices: await departmentChoices(),
            when(answers) {
                return answers.task === 'View a Department Budget';
            },
        },
        {
            message: 'What would you like to do?',
            name: 'editTask',
            type: 'list',
            choices: ['Add Department', 'Delete Department'],
            when(answers) {
                return answers.task === 'Edit Departments';
            },
        },
        {
            message: 'What is the Department name?',
            name: 'name',
            type: 'input',
            when(answers) {
                return answers.editTask === 'Add Department';
            },
        },
        {
            message: 'Which Department do you want to delete?',
            name: 'id',
            type: 'list',
            choices: await departmentChoices(),
            when(answers) {
                return answers.editTask === 'Delete Department';
            },
        },
    ];
    const answers = await inquirer.prompt(departmentQ);
    if (answers.task === 'View All Departments') {
        // handle displaying Departments to console
        try {
            const departments = await connection.query(getAllDepartments);
            console.table('\n\n\n\n\nAll Departments\n', departments[0], '\n');
        } catch (error) {
            console.log(error);
        };
    }
    else if (answers.task === 'View a Department Budget') {
        // handle displaying a specific departments total budget
        try {
            const budget = await connection.query(viewBudget, [answers.id]);
            console.table('\n\n\n\n\nTotal Budget\n', budget[0], '\n');
        } catch(error) {
            console.log(error);
        };
    }
    else {
        // handle Editing Departments in the data base
        if (answers.editTask === 'Add Department') {
            // Add Department to Database
            try {
                await connection.query(addDepartment, [answers.name]);
                console.table('\n\n\n\n\nSuccess!!', '\n');
            } catch (error) {
                console.log(error);
            };
        }
        // Handle Deleting a Department from the database
        else {
            try {
                await connection.query(deleteDepartment, [answers.id]);
                console.table('\n\n\n\n\nSuccess!!', '\n');
            } catch (error) {
                console.log(error);
            };
        }
    }
    // Call init() to see if user wants to quit or continue
    init();
};

// Cute app title on start of application
console.log(` /$$$$$$$$                      /$$                                    
| $$_____/                     | $$                                    
| $$      /$$$$$$/$$$$  /$$$$$$| $$ /$$$$$$ /$$   /$$ /$$$$$$  /$$$$$$ 
| $$$$$  | $$_  $$_  $$/$$__  $| $$/$$__  $| $$  | $$/$$__  $$/$$__  $$
| $$__/  | $$ \\ $$ \\ $| $$  \\ $| $| $$  \\ $| $$  | $| $$$$$$$| $$$$$$$$
| $$     | $$ | $$ | $| $$  | $| $| $$  | $| $$  | $| $$_____| $$_____/
| $$$$$$$| $$ | $$ | $| $$$$$$$| $|  $$$$$$|  $$$$$$|  $$$$$$|  $$$$$$$
|________|__/ |__/ |__| $$____/|__/\\______/ \\____  $$\\_______/\\_______/
                      | $$                  /$$  | $$                  
 /$$      /$$         | $$                 |  $$$$$$/                  
| $$$    /$$$         |__/                  \\______/                   
| $$$$  /$$$$ /$$$$$$ /$$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$     
| $$ $$/$$ $$|____  $| $$__  $$|____  $$/$$__  $$/$$__  $$/$$__  $$    
| $$  $$$| $$ /$$$$$$| $$  \\ $$ /$$$$$$| $$  \\ $| $$$$$$$| $$  \\__/    
| $$\\  $ | $$/$$__  $| $$  | $$/$$__  $| $$  | $| $$_____| $$          
| $$ \\/  | $|  $$$$$$| $$  | $|  $$$$$$|  $$$$$$|  $$$$$$| $$          
|__/     |__/\\_______|__/  |__/\\_______/\\____  $$\\_______|__/          
                                        /$$  \\ $$                      
                                       |  $$$$$$/                      
                                        \\______/                       \n\n`);
// init function to start code
init();

