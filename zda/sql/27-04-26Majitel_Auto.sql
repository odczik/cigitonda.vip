CREATE TABLE majitel(
    id varchar(255) not null primary key,
    jmeno varchar(255) not null,
    prijmeni varchar(255) not null,
    adresa varchar(255) not null,
)
CREATE TABLE vozidlo(
    SPZ varchar(32) not null primary key,
    majitel varchar(255) not null,
    znackaAuta varchar(255) not null,
    modelAuta varchar(255) not null,
    rokVyroby date not null,

    foreign key (majitel) references majitel(id)
)
--prida majitele
INSERT INTO majitel(id, jmeno, prijmeni, adresa)
VALUES([id], [jmeno], [prijmeni], [adresa])

--prida auto
INSERT INTO vozidlo(SPZ, majitel, znackaAuta, modelAuta, rokVyroby)
VALUES ([SPZ], [idMajitele], [znackaAuta], [modelAuta], [rokVyroby])

--zmeni majitele vozidla
UPDATE vozidlo
SET majitel = [idNovehoMajitele]
WHERE majitel = [idByvalehoMajitele]

--odstrani vozidlo
DELETE FROM vozidlo
WHERE SPZ = [SPZauta]

--odstrani majitele
DELETE FROM vozidlo
WHERE majitel = [idMajitele]
DELETE FROM majitel
WHERE id = [idMajitele]