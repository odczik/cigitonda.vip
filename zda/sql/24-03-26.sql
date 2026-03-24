--1
SELECT J.job_title
FROM jobs J, employees E
WHERE J.job_id = E.job_id
GROUP BY J.job_title
HAVING Count(e.employee_id) = (SELECT Count(E.employee_id) FROM employees E WHERE E.job_id = :vlozte_pozici) 

--2
SELECT E.first_name, E.last_name, E.hire_date
FROM employees E
WHERE Extract(YEAR FROM E.hire_date) = (SELECT Extract(YEAR FROM Z.hire_date) FROM employees Z WHERE Z.last_name = 'King')

--3
SELECT E.first_name, E.last_name, E.hire_date
FROM employees E
WHERE Extract(YEAR FROM E.hire_date) = (SELECT Min(Extract(YEAR FROM Z.hire_date)) FROM employees Z)

--4
SELECT * FROM employees E
WHERE E.department_id = (SELECT Z.department_id FROM employees Z WHERE Z.last_name = 'Abel')

SELECT * FROM employees E
WHERE E.salary > (SELECT Z.department_id FROM employees Z WHERE Z.last_name = 'Lorentz')

--5
SELECT E.job_id, E.last_name
FROM employees E
WHERE E.job_id = (SELECT Z.job_id FROM employees Z WHERE Z.last_name = 'Rajs')

SELECT E.job_id, E.last_name, E.hire_date
FROM employees E
WHERE E.hire_date >= (SELECT Z.hire_date FROM employees Z WHERE Z.last_name = 'Davies')

--6
SELECT D.department_name, (SELECT Avg(E.salary) FROM employees E WHERE E.department_id = D.department_id) AS prumerny_plat FROM departments D
WHERE (SELECT Avg(E.salary) FROM employees E WHERE E.department_id = D.department_id) > (SELECT Z.salary FROM employees Z WHERE Z.last_name = 'Ernst')

--7
SELECT E.job_id, E.last_name
FROM employees E
WHERE E.job_id = (SELECT Z.job_id FROM employees Z WHERE Z.last_name = 'Vargas')

--8
SELECT E.first_name, E.last_name, E.salary
FROM employees E
WHERE E.salary > (SELECT Avg(Z.salary) FROM employees Z WHERE Z.department_id = :vlozte_oddeleni)