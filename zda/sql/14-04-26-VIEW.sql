-- DP_15_1_Practice.pdf
--2
CREATE VIEW pohled_2 AS 
SELECT id, title AS song_title, artist
FROM d_songs 

--4
CREATE OR REPLACE VIEW pohled_2 AS
SELECT id, title AS song_title, atist AS umelec, type_code AS typ
FROM d_songs

--5
CREATE OR REPLACE VIEW pohled_4 AS
SELECT name AS jmeno, event_date AS datum, description AS popis
FROM d_events

--6
CREATE OR REPLACE VIEW pohled_6 AS
SELECT D.department_name,
(SELECT Round(Max(E.salary), 2) FROM employees E WHERE D.department_id = E.department_id) AS max_salary,
(SELECT Round(Min(E.salary), 2) FROM employees E WHERE D.department_id = E.department_id) AS min_salary,
(SELECT Round(Avg(E.salary), 2) FROM employees E WHERE D.department_id = E.department_id) AS avg_salary
FROM departments D

--DP_15_2_Practice.pdf3
--2
CREATE TABLE copy_pohled_2 AS
SELECT * FROM pohled_2

--4
CREATE OR REPLACE VIEW pohled_B4 AS
SELECT *
FROM d_cds
WHERE year >= 2000
WITH READ ONLY

--5
CREATE OR REPLACE VIEW pohled_B4 AS
SELECT *
FROM d_cds
WHERE year >= 2000
WITH CHECK OPTION CONSTRAINT ck_read_copy_d_cds