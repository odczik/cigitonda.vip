--1
CREATE VIEW pohled_A AS
SELECT E.employee_id, E.last_name, E.email, E.hire_date, E.job_id
FROM employees E
WHERE E.employee_id = 50

--2
