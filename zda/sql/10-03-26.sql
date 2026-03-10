--1
SELECT Substr(first_name, 1, 2) || Upper(last_name) AS prezdivka
FROM employees

--2
SELECT Substr(first_name, 1, 2) || Substr(last_name, Length(last_name) - 2, 3) AS kryci_jmeno, first_name, last_name
FROM employees
WHERE salary < 3000

--3
SELECT hire_date, Round(Months_between(sysdate, hire_date)/12, 2) AS pocet_let, first_name, last_name
FROM employees
WHERE Substr(last_name, Length(last_name), 1) = 's'

--4
SELECT hire_date, hire_date + 7-TO_CHAR(hire_date, 'D')+2 AS prvni_pondeli, first_name, last_name
FROM employees
WHERE department_id = 20

--5
SELECT job_id, first_name || ' ' || last_name AS jmeno, Round(Months_between(sysdate, hire_date), 2) AS odpracovane_mesice, salary*1.15 AS zvyseny_plat
FROM employees E
WHERE Substr(job_id, 1, 1) = 'A'

--6
SELECT last_name, salary, salary*COMMISSION_PCT AS provize
FROM employees E
WHERE Substr(last_name, Length(last_name), 1) = 'r'

--7
SELECT '0' || 7+2-to_char(to_date('01-05' || extract(year FROM sysdate), 'DD-MM-YYYY'), 'D') || '-05-' || extract(year FROM sysdate) AS den_nedele
FROM DUAL

--8
SELECT Round(to_date('30-06-'||extract(year FROM sysdate), 'dd-mm-yyyy') - sysdate, 0)/7 AS pocet_tydnu_do_konce_roku
FROM dual

--9
SELECT last_name, Substr(last_name, Length(last_name)-2, 3) || Length(last_name) AS uzivatelske_jmeno
FROM employees E

--10
SELECT E.first_name, D.department_name, Round(E.salary/1000, 0)*1000 AS plat_zaokrouhleny_na_tisice
FROM employees E, departments D
WHERE E.department_id = D.department_id AND Length(D.department_name) = Length(E.first_name)

--11
SELECT *
FROM employees INNER JOIN departments USING(department_id)

--12
SELECT D.department_name, D.location_id, L.country_id
FROM locations L, departments D
WHERE L.location_id = D.location_id AND L.country_id = 'US'

--13
SELECT L.city
FROM locations L, departments D
WHERE L.location_id = D.location_id AND L.country_id = 'CA'

--14 = 11

--15
SELECT first_name
FROM employees, departments D
WHERE E.department_id = D.department_id AND D.location_id = 1800