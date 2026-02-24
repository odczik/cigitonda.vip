--1
SELECT first_name, last_name, job_title FROM EMPLOYEES, JOBS
WHERE job_title = 'Sales Representative' AND EMPLOYEES.JOB_ID = JOBS.JOB_ID

--2
SELECT first_name, last_name, job_title FROM EMPLOYEES, JOBS
WHERE SUBSTR(last_name, 1, 1) = 'H' AND EMPLOYEES.JOB_ID = JOBS.JOB_ID

--3
SELECT first_name, last_name, department_name FROM EMPLOYEES, DEPARTMENTS
WHERE department_name = 'Shipping' AND EMPLOYEES.department_id = DEPARTMENTS.department_id

--4
SELECT SUBSTR(first_name,1,1) || '. ' || SUBSTR(last_name,1,1) || '.' AS zamestnanec, job_title FROM EMPLOYEES, JOBS
WHERE employees.job_id = jobs.job_id
SELECT * FROM EMPLOYEES WHERE DEPARTMENT_ID IS NULL

--5a
SELECT first_name, last_name, salary AS mzda, salary*1.25 AS zvysena_mzda FROM EMPLOYEES
--5b
SELECT first_name, last_name, salary AS mzda,
CASE
WHEN employees.salary*1.25 > jobs.max_salary THEN 'NELZE'
ELSE CAST(employees.salary*1.25 AS CHAR(20))
END AS zvysena_mzda
FROM EMPLOYEES, JOBS
WHERE employees.job_id = jobs.job_id
--5c
SELECT first_name, last_name, salary AS mzda,
CASE
WHEN employees.salary*1.25 > jobs.max_salary THEN jobs.max_salary
ELSE employees.salary*1.25
END AS zvysena_mzda
FROM EMPLOYEES, JOBS
WHERE employees.job_id = jobs.job_id

--6
SELECT Z.first_name, Z.last_name, Z.manager_id, M.first_name AS jmeno_managera, M.last_name AS prijmeni_managera FROM employees Z LEFT JOIN employees M ON Z.manager_id = M.employee_id 

--7
SELECT D.department_name, E.first_name, E.last_name FROM departments D, employees E
WHERE D.manager_id = E.employee_id

--8
SELECT D.department_name, C.department_name
FROM departments D CROSS JOIN DEPARTMENTS C
WHERE D.department_name != C.department_name

--9
CREATE TABLE kdo_vi_povi AS
SELECT D.department_name AS domaci, B.department_name AS hoste
FROM departments D CROSS JOIN DEPARTMENTS B
WHERE D.department_name NOT LIKE B.department_name

SELECT * FROM kdo_vi_povi

