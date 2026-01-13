--1
SELECT first_name || ' ' || UPPER(last_name) AS ZAMESTANCI90
FROM EMPLOYEES
WHERE DEPARTMENT_ID = 90 

--2
SELECT * FROM EMPLOYEES
WHERE HIRE_DATE < '01-Jan-1999'

--3
SELECT DEPARTMENT_ID FROM EMPLOYEES
GROUP BY DEPARTMENT_ID

--4
SELECT * FROM EMPLOYEES
WHERE COMMISSION_PCT = 0 OR COMMISSION_PCT IS NULL

--5
SELECT * FROM EMPLOYEES
WHERE SALARY > 16000 AND LOWER(SUBSTR(last_name, 1, 1)) = 'k'

--6
SELECT SYSDATE AS dnesni_datum FROM DUAL

--7
SELECT CONCAT(first_name, CONCAT(' ', last_name)) FROM EMPLOYEES

--8
SELECT UPPER(SUBSTR(first_name, 1, 1)) || ' ' || UPPER(SUBSTR(last_name, 1, 1)) FROM EMPLOYEES

--9
SELECT last_name, LENGTH(last_name) as delka FROM EMPLOYEES

--10
SELECT last_name, INSTR(LOWER(last_name), 'a') as index_a FROM EMPLOYEES

--11
SELECT REPLACE('PROJEKTOR', 'PRO', 'SE') AS vysledek FROM DUAL

--12
SELECT SUBSTR(first_name, 1, 3) || ' ' || SUBSTR(last_name, length(last_name)-3, 3) AS prezdivka FROM EMPLOYEES

--13
SELECT first_name, SUBSTR(first_name, 1, length(first_name)/2) AS prezdivka FROM EMPLOYEES

--14
SELECT first_name, REPLACE(LOWER(first_name), 'a', '') AS result FROM EMPLOYEES

--15
SELECT first_name, length(first_name) - length(REPLACE(LOWER(first_name), 'a', ''))
FROM EMPLOYEES