--1
SELECT E.employee_id, E.last_name
FROM employees E
INTERSECT
SELECT d.manager_id, E.last_name
FROM departments D, employees E

--2 bez MINUS
SELECT last_name, job_id, phone_number
FROM employees E, departments D
WHERE E.job_id != 'AD_VP' AND (D.department_name = 'Sales' OR D.department_name = 'Executive') 
--2 s MINUS
SELECT E.last_name, E.job_id, E.phone_number
FROM employees E INNER JOIN departments D USING(department_id)
WHERE D.department_name = 'Sales' OR D.department_name = 'Executive'
MINUS
SELECT E.last_name, E.job_id, E.phone_number
FROM employees E INNER JOIN departments D USING(department_id)
WHERE E.job_id = 'AD_VP' 

--3
SELECT E.first_name, length(E.first_name) AS delka
FROM employees E
UNION 
SELECT E.last_name, length(E.last_name) AS delka
FROM employees E
ORDER BY delka DESC

--4
SELECT Concat('max > ', max(E.salary)) AS salary, D.department_name
FROM employees E INNER JOIN departments D USING(department_id) 
GROUP BY D.department_name
UNION 
SELECT Concat('min > ', min(E.salary)) AS salary, D.department_name
FROM employees E INNER JOIN departments D USING(department_id)
GROUP BY D.department_name
UNION
SELECT Concat('avg > ', avg(E.salary)) AS salary, D.department_name
FROM employees E INNER JOIN departments D USING(department_id)
GROUP BY D.department_name