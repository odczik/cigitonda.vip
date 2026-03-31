--dp_s06_l02_try
--1
SELECT * 
FROM employees E 
WHERE E.salary > (SELECT salary FROM employees Z WHERE Z.last_name = 'Lorentz') AND E.department_id = (SELECT department_id FROM employees Z WHERE Z.last_name = 'Abel')

--2
SELECT *
FROM employees E
WHERE E.job_id = (SELECT Z.job_id FROM employees Z WHERE Z.last_name = 'Rajs') AND E.hire_date > (SELECT Z.hire_date FROM employees Z WHERE Z.last_name = 'Davies')

--3
SELECT D.department_id, D.department_name, (SELECT Avg(Z.salary) FROM employees Z WHERE Z.department_id = D.department_id)
FROM departments D
WHERE (SELECT Avg(Z.salary) FROM employees Z WHERE Z.department_id = D.department_id) > (SELECT Z.salary FROM employees Z WHERE Z.last_name = 'Ernst')

--6
SELECT D.department_id, D.department_name, (SELECT Min(salary) FROM employees Z WHERE Z.department_id != 50 AND D.department_id = Z.department_id) AS Minimal
FROM departments D
WHERE D.department_id != 50
GROUP BY D.department_id, D.department_name

--dp_s06_l04_try
--2 asi by to slo udelat lepe
SELECT D.department_id, D.department_name, 

(SELECT E.last_name || ' $' || (SELECT Max(Z.salary) FROM employees Z WHERE D.department_id = Z.department_id) AS mzda
FROM employees E
WHERE E.salary = (SELECT Max(Z.salary) FROM employees Z WHERE D.department_id = Z.department_id) AND E.department_id = D.department_id) AS kdoViPovi

FROM departments D

--3
SELECT E.last_name, E.department_id, E.salary, E.employee_id, E.manager_id
FROM employees E
WHERE E.employee_id IN (SELECT Z.manager_id FROM employees Z)