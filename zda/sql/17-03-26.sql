--1
SELECT J.job_title, Avg(E.salary) AS prumerna_mzda
FROM jobs J RIGHT JOIN employees E ON J.job_id = E.job_id
GROUP BY J.job_title
ORDER BY Avg(E.salary)

--2
SELECT E.first_name || ' ' || E.last_name AS jmeno, J.job_title
FROM employees E, jobs J
WHERE E.department_id IS NULL AND J.job_id = E.job_id

--3
SELECT J.job_title, Count(E.first_name) AS pocet_na_oddeleni
FROM jobs J RIGHT JOIN employees E ON J.job_id = E.job_id
GROUP BY J.job_title
ORDER BY Count(E.first_name)

--4 (nikoho nenaslo)
SELECT E.department_id, E.last_name, E.first_name, Length(E.last_name)
FROM employees E
WHERE Length(E.last_name) = 6 AND E.department_id = 90


--1. Určete všechna oddělení, která mají stejný počet zaměstnanců jako oddělení dopravy (Shipping).
SELECT *
FROM departments D
WHERE (SELECT Count(E.last_name) FROM employees E WHERE E.department_id = D.department_id) = (SELECT Count(Z.last_name) FROM employees Z WHERE Z.department_id = 50)
--kontrola
SELECT D.department_name, Count(E.last_name)
FROM departments D RIGHT JOIN employees E ON E.department_id = D.department_id
GROUP BY D.department_name

--2. Vytvořte dotaz, který vypíše všechna oddělení, jejichž průměrný plat je větší než plat pana Vargase.
SELECT D.department_name, (SELECT Avg(E.salary) FROM employees E WHERE E.DEPARTMENT_ID = D.department_id) AS prumer
FROM departments D
WHERE (SELECT Avg(E.salary) FROM employees E WHERE E.DEPARTMENT_ID = D.department_id) > (SELECT Z.salary FROM employees Z WHERE Z.last_name = 'Vargas')

--3. Určete všechny zaměstnance, kteří pracují ve stejném odděleni jako King.
SELECT E.department_id, E.first_name, E.last_name
FROM employees E
WHERE E.department_id = (SELECT Z.department_id FROM employees Z WHERE Z.last_name = 'King')

--4. Určete všechny zaměstnance, kteří mají menší plat než je celkový průměrný plat na jednoho zaměstance.
SELECT E.first_name, E.last_name, E.salary, (SELECT Avg(Z.salary) FROM employees Z) AS prumerny_plat
FROM employees E 
WHERE E.salary < (SELECT Avg(Z.salary) FROM employees Z)

--5. Vytvořte dotaz, který vypíše všechny zaměstnance, kteří mají menší plat než je průměrný plat na oddělení Executive
SELECT E.first_name, E.last_name, E.salary, Round((SELECT Avg(Z.salary) FROM employees Z WHERE Z.department_id = 90),2) AS prumerny_plat_executive
FROM employees E 
WHERE E.salary < (SELECT Avg(Z.salary) FROM employees Z WHERE Z.department_id = 90)