--dp_s06_l02_try
--1
-- Write a query to return all those employees who have a salary greater than that of
-- Lorentz and are in the same department as Abel.
SELECT * 
FROM employees E 
WHERE E.salary > (SELECT salary FROM employees Z WHERE Z.last_name = 'Lorentz') AND E.department_id = (SELECT department_id FROM employees Z WHERE Z.last_name = 'Abel')

--2
-- Write a query to return all those employees who have the same job id as Rajs and
-- were hired after Davies.
SELECT *
FROM employees E
WHERE E.job_id = (SELECT Z.job_id FROM employees Z WHERE Z.last_name = 'Rajs') AND E.hire_date > (SELECT Z.hire_date FROM employees Z WHERE Z.last_name = 'Davies')

--5
-- Write a query to return a list of department id’s and average salaries where the
-- average salary is greater than Ernst’s salary.
SELECT D.department_id, D.department_name, (SELECT Avg(Z.salary) FROM employees Z WHERE Z.department_id = D.department_id)
FROM departments D
WHERE (SELECT Avg(Z.salary) FROM employees Z WHERE Z.department_id = D.department_id) > (SELECT Z.salary FROM employees Z WHERE Z.last_name = 'Ernst')

--6
-- Return the department ID and minimum salary of all employees, grouped by
-- department ID, having a minimum salary greater than the minimum salary of those
-- employees whose department ID is not equal to 50.
SELECT D.department_id, D.department_name, (SELECT Min(salary) FROM employees Z WHERE Z.department_id != 50 AND D.department_id = Z.department_id) AS Minimal
FROM departments D
WHERE D.department_id != 50
GROUP BY D.department_id, D.department_name

--dp_s06_l04_try
--2 asi by to slo udelat lepe
-- Write a query that lists the highest earners for each department. Include the last_name,
-- department_id, and the salary for each employee.
SELECT D.department_id, D.department_name, 

(SELECT E.last_name || ' $' || (SELECT Max(Z.salary) FROM employees Z WHERE D.department_id = Z.department_id) AS mzda
FROM employees E
WHERE E.salary = (SELECT Max(Z.salary) FROM employees Z WHERE D.department_id = Z.department_id) AND E.department_id = D.department_id) AS kdoViPovi

FROM departments D

--3
--it will return the last_name,
-- department_id, and salary of employees who have at least one person reporting to them.
-- So we are effectively looking for managers only.
SELECT E.last_name, E.department_id, E.salary, E.employee_id, E.manager_id
FROM employees E
WHERE E.employee_id IN (SELECT Z.manager_id FROM employees Z)