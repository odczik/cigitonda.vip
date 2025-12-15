--pocet zamestnancu
SELECT Count(*) as pocetZamestnancu
FROM ZAMESTNANCI

--volne pokoje
SELECT *
FROM POKOJE
WHERE navstevnik IS NULL

--kteri zamestnanci meli smenu v urcity den
SELECT zamestnanec
FROM SMENY
WHERE date(od) = [datum]

--navstevnici co maji obed
SELECT idN jmeno prijmeni
FROM NAVSTEVNICI
WHERE obedy IS NOT NULL

--denni vydelek za cely den
SELECT Count(*)*cenaZaDen AS denni vydelek Count(*)*cenaZaDen/100*79 AS vydelekPoZdaneni
FROM POKOJE
WHERE navstevnik IS NOT NULL

--ucet za obedy
SELECT Sum(cena) AS celkemUtratilZaObedy
FROM POKRMY
WHERE idNavstevnika = [navstevnik]

--celkovy plat zamestnance za urcitou dobu
SELECT ZAMESTNANCI.idZ ZAMESTNANCI.jmeno ZAMESTNANCI.prijmeni
Sum(TIMESTAMPDIFF(MINUTE, SMENY.do, SMENY.do)/60*ZAMESTNANCI.platNaHodinu) AS celkovyPlat
WHERE SMENY.do >= [datum]

--zmeni email navstevnika
UPDATE NAVSTEVNICI
SET email = [novyEmail]
WHERE idN = [idNavstevnika]

--prida polozku na menu
INSERT INTO POKRMY(nazev, recept, cena, dobapripravy)
([nazevPokrmu], [receptNaPorkm], [cenaPokrmu], [dobapripravyPorkmu])

--prida smenu
INSERT INTO SMENY(zamestnanec, od, do)
([idZamestnance], [casPrichodu], [casOdchodu])