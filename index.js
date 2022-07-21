import inquirer from 'inquirer';
import cTable from 'console.table';
import { connection } from './db/connection.js';
import { initQ, roleQ, employeeQ, departmentQ } from './utils/inquirerQuestions.js';
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

