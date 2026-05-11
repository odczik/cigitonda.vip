CREATE TABLE skoly(
    id_skoly int not null primary key,
    nazev varchar(100) not null,
    typ varchar(100),
    pocet_zaku int,
    mesto varchar(255) not null,
    datum_zapisu date not null,
)
--zacne sequenci na 1
CREATE SEQUENCE seq_skoly_id

INSERT INTO skoly(id_skoly, nazev, typ, pocet_zaku, mesto, datum_zapisu)
VALUES(seq_skoly_id.nextVal, 'Gymnázium Jih', 'SŠ', 450, 'Brno', TO_DATE('1.9.1990', 'DD/MM/YYYY'))
VALUES(seq_skoly_id.nextVal, 'ZS Modra', 'ZŠ', 200, 'Praha', TO_DATE('15.8.2005', 'DD/MM/YYYY'))
VALUES(seq_skoly_id.nextVal, 'Prumyslova Tech', 'SŠ', 600, 'Brno', TO_DATE('10.1.1950', 'DD/MM/YYYY'))
VALUES(seq_skoly_id.nextVal, 'stredni prumyslova skola elektrotechniky a informatiky', 'SŠ', 600 'Ostrava', TO_DATE('1.9.1975', 'DD/MM/YYYY'))
VALUES(seq_skoly_id.nextVal, 'PRIGO', 'SŠ', 350, 'Ostrava', TO_DATE('1.9.2008', 'DD/MM/YYYY'))

--4a
SELECT *
FROM skoly
WHERE pocet_zaku > 300
ORDER BY mesto

--4b
SELECT Sum(pocet_zaku) AS celkovy_pocet_zaku
FROM skoly

--4c
SELECT typ, (SELECT Avg(pocet_zaku) FROM skoly S WHERE S.typ = Z.typ) AS prumerny_pocet_zaku
FROM skoly Z

--4d
SELECT Max(S.pocet_zaku), Min(S.pocet_zaku)
FROM skoly S

--e
SELECT S.mesto, (SELECT Count(Z.mesto) FROM skoly Z WHERE S.mesto = Z.mesto)
FROM skoly S
WHERE (SELECT Count(Z.mesto) FROM skoly Z WHERE S.mesto = Z.mesto) > 1

--4f
SELECT datum_zapisu, nazev
FROM skoly

--4g
ALTER TABLE
ADD active Number(1)

UPDATE TABLE skoly
SET active = 1
WHERE mesto = 'Brno'

--5
CREATE TABLE ucitele(
    id_ucitele int not null primary key,
    jmeno varchar(255) not null,
    prijmeni varchar(255) not null,
    aprobace varchar(255) not null,
    plat Number(5,2),
    id_skoly int

    foreign key (id_skoly) references skoly(id_skoly)
)

--6
CREATE SEQUENCE seq_ucitele_id

--7
INSERT INTO ucitele(id_ucitele, jmeno, prijmeni, aprobace, plat, id_skoly)
VALUES(seq_ucitele_id.nextVal, 'Petr', 'Kobliha', 'TEV', 100, 17)
VALUES(seq_ucitele_id.nextVal, 'Anicka', 'Tkanicka', 'CEJ', 200, 16)
VALUES(seq_ucitele_id.nextVal, 'David', 'Schizofrenik', 'DEJ', 20, 18)
VALUES(seq_ucitele_id.nextVal, 'Karel', 'Barel', 'EKO', 67, 19)
VALUES(seq_ucitele_id.nextVal, 'Marek', 'Skocdopole', 'SPV', 50, 20)
VALUES(seq_ucitele_id.nextVal, 'Denis', 'Pysk', 'ANJ', 5, 19)
VALUES(seq_ucitele_id.nextVal, 'Spitislav', 'Kominik', 'TEV', 500, 20)

--8a
SELECT U.jmeno, U.prijmeni, S.nazev
FROM ucitele U RIGHT JOIN skoly S USING(id_skoly)

--8b
SELECT S.nazev, (SELECT Sum(U.plat) FROM ucitele U WHERE U.id_skoly = S.id_skoly) AS mzdy_vyplacene_skolou
FROM skoly S

--8c
SELECT Max((SELECT Count(U.id_ucitele) FROM ucitele U WHERE S.id_skoly = U.id_skoly GROUP BY id_skoly)) AS pocet_ucitelu
FROM skoly S

--8d
SELECT S.nazev, (SELECT Avg(U.plat) FROM ucitele U WHERE U.id_skoly = S.id_skoly) AS prumerny_plat_v_brne
FROM skoly S
WHERE S.mesto = 'Brno'