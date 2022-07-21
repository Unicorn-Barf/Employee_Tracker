# Employee Tracker

## Table of contents
​
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
​
​
## Overview
​
### The challenge
​
The Employee Tracker command line application allows business owners to easily access and modify a database of their business deparments, roles, and employees.  It is a Nodejs application utilizing a SQL database that runs in the command line and displays requested data to the console.  The app is a creative solution for non-developers with no coding experience to quickly access a SQL database and create, read, update, and delete entries.
​
### User Story
​
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
​
### Acceptance Criteria
​
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

​
​
### Links

- Deployed Application: [https://nolans-note-taker.herokuapp.com/](https://nolans-note-taker.herokuapp.com/)

<br>

## My process
​
### Built with
​
- JavaScript
- NodeJS
- NPM Inquirer
- NPM console.table
- MySQL2
- SQL
​
### What I learned
​
The Employee Tracker application challenged me to better understand writing queries to access a SQL database. One challenge was how to utilize user input to get custom database requests.  By using inquirer, the user was able to decide what data they wanted to see and how they wanted it to be formatted.  Here is an example of one of the queries strings I wrote to access a specific department's total budget:

```js
const viewBudget = `SELECT d.name AS Department, CONCAT('$', SUM(r.salary)) AS Budget
FROM employee AS e
INNER JOIN role AS r ON e.role_id = r.id
INNER JOIN department AS d ON r.department_id = d.id
WHERE d.id = ?;`;
```
As seen above, I learned how to use a `?` placehold to accept a user input value for the database request.  The challenge here was that inquire would have to query the database to get possible departments to choose from and so the user could select the desired department.  In addition, the department id is needed, not the name so that I could query the unique department id for the budget data.  Inquirer allows for the `choices:` key in the question object to utilize a function to dynamically generate choices for the user.  Below is the function I used for getting all current departments:

```js
const departmentChoices = async () => {
    const departmentQuery = `SELECT id AS value, name FROM department;`;
    const departments = await connection.query(departmentQuery);
    return departments[0];
}
```
I learned to used aliases in my queries to store the information under the desired key.  Here, I need a `name` key for inquirer to use as the displayed choice for the user and a corresponding `value` key to store the actual value for that choice.  Luckily, the array of objects that the database query returns at index 0 is already in the correct format for Inquirer's `choices:` key to accept and use.  With this code, the user is always presented with the most current choices of departments that exist in the database.

Lastly, an intriguing issue I struggled with was having my Inquirer question objects dynamcially update choices after adding a new row to the database.  For example, I was puzzled when I added a new employee to the database and could immediately view the result, but when I wanted to modify or delete that employee in the same session, they wouldn't show up as an option.  However, when I restarted the app, the new employee was now an option.  After reviewing the code, I realized that with dynamically updating inquirer question `choices:` key, I could no longer have a separate file to define them.  Once I moved the question object declarations into the functions where they were being used, it could be redefined with the latest data from the database every time that function was called.  Unfortunately, this made my code slighty less separated and more messy, but the application could function how I intended it to.
​
### Continued development
​
By working through this project, I realized the possibilities for how to access SQL database data is endless.  I look forward to working with databases more in the future to hone my skills.  I have realized through this challenge that my understanding of SQL commands is still at a very basic level and I can't wait to be able to leverage the available tools more effectively on future projects.
​
### Useful resources
​
- [ON DELETE SET NULL](https://www.techonthenet.com/sql_server/foreign_keys/foreign_delete_null.php#:~:text=What%20is%20a%20foreign%20key,be%20deleted%20in%20SQL%20Server.) - This techonthenet.com post explains how to use `ON DELETE SET NULL` for SQL which was helpful when adding a delete feature to my application.
- [MDN Docs on import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) - I decided to set my application as a module for the first time and to teach myself the import syntax.  MDN was a great resource for this.
- [ASCII font Generator for console](https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20) - This a a fun and effective font generator to use in the console when you want big custom letters.
​
## Author
​
Nolan Spence
- Website - [Nolan Spence](https://unicorn-barf.github.io/Portfolio_Website_HTML_CSS/)
- LinkedIn - [https://www.linkedin.com/in/aerospence/](https://www.linkedin.com/in/aerospence/)
​
## Acknowledgments

Thank you to my tutor Jacob Nordan for helping me figure out why my inquire question objects weren't updating with current choices!