--1
SELECT * FROM EMPLOYEES
WHERE length(last_name) = 4
ORDER BY last_name

--2
SELECT first_name, SUBSTR(first_name, length(first_name), 1) || SUBSTR(first_name, 2, length(first_name)-2) || SUBSTR(first_name, 1, 1)  AS po_uprave
FROM EMPLOYEES

--3
SELECT first_name || ' ' || last_name AS cele_jmeno
FROM EMPLOYEES
WHERE length(first_name) = length(last_name)
ORDER BY first_name

--4
SELECT first_name, last_name, REPLACE(last_name, 'a', SUBSTR(first_name, length(first_name), 1) || 'a') AS vysledek
FROM EMPLOYEES

--5
SELECT first_name, SUBSTR(first_name, 1, INSTR(first_name, 'n')) AS vysledek
FROM EMPLOYEES

--druha cast zadani:
--1
SELECT EXTRACT(YEAR FROM SYSDATE) AS aktualni_rok FROM DUAL

--2
SELECT EXTRACT(YEAR FROM SYSDATE)-1 AS lonsky_rok FROM DUAL

--3
SELECT EXTRACT(DAY FROM LAST_DAY(SYSDATE)) AS pocet_dni_v_mesici FROM DUAL

--4
SELECT TO_CHAR(SYSDATE, 'Mon') ||'='|| TO_CHAR(SYSDATE, 'mm') AS mesic FROM DUAL

--5
SELECT 
CONCAT(EXTRACT(YEAR FROM SYSDATE), CONCAT('-', CONCAT(EXTRACT(MONTH FROM SYSDATE), CONCAT('-', EXTRACT(DAY FROM SYSDATE)-1)))) AS vcera,
CONCAT(EXTRACT(YEAR FROM SYSDATE), CONCAT('-', CONCAT(EXTRACT(MONTH FROM SYSDATE), CONCAT('-', EXTRACT(DAY FROM SYSDATE)+1)))) AS zitra 
FROM DUAL

--6
SELECT 
EXTRACT(YEAR FROM SYSDATE) AS rok,
EXTRACT(MONTH FROM SYSDATE) AS mesic,
FLOOR(SYSDATE - TO_DATE('01-Jan-'||EXTRACT(YEAR FROM SYSDATE), 'dd-mon-yyyy'))+1 +7-TO_CHAR(SYSDATE, 'D') AS den
FROM DUAL