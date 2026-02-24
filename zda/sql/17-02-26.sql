--1
SELECT * FROM employees WHERE job_id = 'IT_PROG'

--2
SELECT Count(employee_id) AS pocet_zamestnancu, departments.department_id, departments.department_name
FROM employees, departments
WHERE departments.department_id = employees.department_id
GROUP BY departments.department_name, departments.department_id

--3
SELECT departments.department_name, jobs.job_title, Count(employees.employee_id) AS pocet_zamestnancu
FROM (jobs INNER JOIN employees USING (job_id))
INNER JOIN departments ON employees.department_id = departments.department_id
GROUP BY departments.department_name, jobs.job_title

--4
SELECT D.department_name, Sum(E.salary) / Count(E.salary) || '$' AS prumerna_mzda
FROM departments D, employees E
WHERE D.department_id = E.department_id
GROUP BY D.department_name

--5
SELECT jobs.job_title, Min(employees.salary) AS minimum, Max(employees.salary) AS maximum
FROM jobs, employees
WHERE jobs.job_id = employees.job_id
GROUP BY jobs.job_title

--6
SELECT L.city, D.department_name, Count(E.employee_id)
FROM departments D, employees E, locations L
WHERE E.department_id = D.department_id AND L.location_id = D.location_id
GROUP BY L.city, D.department_name
HAVING Count(E.employee_id) > 1

--7
