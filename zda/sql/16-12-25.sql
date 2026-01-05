--1
create table VYSLEDKY(
    cisloVysledku int not null primary key,
    nazev varchar(64),
    idStudenta int not null,
    pocetBodu int not null
)

--2
insert into VYSLEDKY(cisloVysledku idStudenta, pocetBodu)
values(0, 1, 100)

--3
alter table VYSLEDKY
add znamka int

--4
update VYSLEDKY
set znamka = 5
where idStudenta = 1

--5
alter table VYSLEDKY
add constraint fkVysledekMaturant foreign key (idStudenta) references STUDENTI (id)

--6
SELECT VYSLEDKY.idStudenta
FROM VYSLEDKY 
LEFT JOIN STUDENTI ON VYSLEDKY.idStudenta = STUDENTI.id

--7
DELETE FROM VYSLEDKY
WHERE NOT EXISTS (
    SELECT 1 FROM STUDENTI 
    WHERE STUDENTI.id = VYSLEDKY.idStudenta
);

--9
update VYSLEDKY
set pocetBodu = pocetBodu + 10