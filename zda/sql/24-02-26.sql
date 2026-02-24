--1
SELECT department_name, Round(Avg(SYSDATE - hire_date), 2) AS prumerny_cas_na_oddeleni 
FROM employees E, DUAL, departments D
WHERE D.department_id = E.department_id
GROUP BY department_name

--2
SELECT X.employee_id, X.last_name, Count(E.manager_id) AS pocet
FROM employees E LEFT JOIN employees X ON X.manager_id IS NULL AND X.employee_id = E.manager_id AND X.employee_id NOT LIKE E.employee_id
GROUP BY X.employee_id, X.last_name

--3
SELECT Substr(E.first_name, 1, 1) AS pismeno, Count(E.first_name) AS pocet
FROM employees E
GROUP BY Substr(E.first_name, 1, 1)
ORDER BY pismeno

--4
SELECT Extract(YEAR FROM E.hire_date) AS rok, Count(E.first_name) AS pocet
FROM employees E
GROUP BY Extract(YEAR FROM E.hire_date)
ORDER BY rok

--5
SELECT D.department_id, Count(E.department_id) AS pocet
FROM employees E, departments D
WHERE E.department_id = D.department_id
GROUP BY D.department_id
HAVING Count(E.department_id) < 3

--6
SELECT D.department_id, Round(Avg(E.salary), 2) AS prumer
FROM departments D, employees E
WHERE E.department_id = D.department_id
GROUP BY D.department_id
HAVING Avg(E.salary) < 5000

--7
SELECT D.department_name, Count(JH.employee_id) AS pocet
FROM departments D, job_history JH
WHERE JH.department_id = D.department_id AND Extract(YEAR FROM JH.start_date) >= 1990 AND Extract(YEAR FROM JH.end_date) <= 2000
GROUP BY D.department_name

--8
SELECT D.department_name, Sum(Length(E.last_name)) AS pocet
FROM departments D, employees E
WHERE E.department_id = D.department_id
GROUP BY D.department_name

--9
SELECT X.employee_id, X.last_name, Count(E.manager_id) AS pocet
FROM employees E
INNER JOIN employees X ON X.employee_id = E.manager_id
GROUP BY X.employee_id, X.last_name
HAVING Count(E.manager_id) < 3

--10
SELECT E.first_name, E.salary*0.95 AS snizeny_plat
FROM employees E
WHERE E.first_name LIKE '%e%'

--11
SELECT D.department_name, Extract(YEAR FROM E.hire_date) AS rok, Count(E.first_name) AS pocet
FROM employees E, departments D
GROUP BY D.department_name, Extract(YEAR FROM E.hire_date)
ORDER BY D.department_name, rok;

--12
SELECT COUNT(EXTRACT(YEAR FROM HIRE_DATE)) AS POCET,
EXTRACT(YEAR FROM HIRE_DATE) AS ROK,DEPARTMENT_ID 
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID, (EXTRACT(YEAR FROM HIRE_DATE))