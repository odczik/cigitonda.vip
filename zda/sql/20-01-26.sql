--1
--Diana	Lorentz
SELECT first_name, last_name
FROM EMPLOYEES
WHERE hire_date BETWEEN TO_DATE('01-May-1998', 'dd-mm-yyyy') AND SYSDATE
AND salary < 8000 AND INSTR(LOWER(last_name), 'en') != 0

--2
--Michael Hartstein| email-> MHARTSTE
SELECT email
FROM EMPLOYEES
WHERE hire_date BETWEEN TO_DATE('01-Jan-1996', 'dd-mm-yyyy') AND SYSDATE
AND salary > 9000 AND COMMISSION_PCT IS NULL

--3
-- King	24000	15483.87
-- Kochhar	17000	10967.74
-- De Haan	17000	10967.74
SELECT last_name, salary, ROUND(salary/1.55, 2) AS raokrouhlena_mzda
FROM EMPLOYEES
WHERE employee_id BETWEEN 100 AND 102

--4
--Zlotkey	10500	11059.65
--Abel	11000	11586.3
--Taylor	8600	9058.38
SELECT last_name, salary, TRUNC(salary*1.0533, 2) AS salary_rais
FROM EMPLOYEES
WHERE department_id = 80

--5
--false
SELECT CASE 
    WHEN MOD(38873, 2)=0 THEN 'true'
    ELSE 'false'
    END AS je_sude
FROM DUAL

--6
SELECT ROUND(845.553, 1) AS one, ROUND(30695.348, 2) AS two, ROUND(30695.348, -2) as three, TRUNC(2.3454, 1) as four
FROM DUAL

--7
SELECT last_name, salary, salary/3
FROM EMPLOYEES
WHERE MOD(salary, 3)=0

--8
SELECT TO_CHAR(TO_DATE('30-06-2005', 'dd-mm-yyyy'), 'Day') AS posledni_den
FROM DUAL

--9
SELECT TRUNC(MONTHS_BETWEEN(SYSDATE, BIRTHDATE) / 12)
FROM f_staffs
WHERE first_name = 'Bob' AND last_name = 'Miller'

--10
SELECT ADD_MONTHS(SYSDATE, 6) AS apintment
FROM DUAL

--11
SELECT LAST_DAY(SYSDATE) AS deadline
FROM DUAL

--12
SELECT 
TRUNC(MONTHS_BETWEEN(
TO_DATE('01-01-' || EXTRACT(YEAR FROM SYSDATE), 'dd-mm-yyyy'), TO_DATE('30-06-2008', 'dd-mm-yyyy') 
))AS result
FROM DUAL