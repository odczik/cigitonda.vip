CREATE DATABASE rezervace_chaty default charset utf8mb4 collate utf8mb4_czech_ci;
USE rezervace_chaty;

CREATE TABLE zakaznik(
	id_zakaznika int unsigned not null primary key auto_increment,
    jmeno varchar(64) NOT NULL,
	prijmeni varchar(64) NOT NULL,
    email varchar(128) NOT NULL,
    telefon varchar(16) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE chata(
	id_chaty int unsigned not null primary key auto_increment,
    kapacita int unsigned not null check(kapacita>0),
    cena_za_noc int unsigned not null check(cena_za_noc>0)
) ENGINE = InnoDB;

CREATE TABLE rezervace(
	id_rezervace int unsigned not null primary key auto_increment,
    cas_prijezdu datetime not null,
    cas_odjezdu datetime not null,
    id_zakaznika int unsigned not null,
    id_chaty int unsigned not null,
    
    constraint chck_datum_pobytu check(cas_prijezdu < cas_odjezdu)/*,
    
    foreign key (id_zakaznika) REFERENCES zakaznik(id_zakaznika),
    foreign key (id_chaty) REFERENCES chata(id_chaty)*/
)ENGINE = InnoDB;

DROP TABLE rezervace;

ALTER TABLE zakaznik ADD CONSTRAINT unikatniklic UNIQUE(email);
ALTER TABLE zakaznik ADD CONSTRAINT unikatniklicB UNIQUE(telefon);

ALTER TABLE rezervace ADD CONSTRAINT id_zakaznika_fk foreign key(id_zakaznika) references zakaznik(id_zakaznika);
ALTER TABLE rezervace ADD CONSTRAINT id_chaty_fk foreign key(id_chaty) references chata(id_chaty);


INSERT INTO chata(kapacita, cena_za_noc)
VALUES
(2, 800),
(2, 900),
(3, 1200),
(4, 2000),
(6, 4000),
(200, 2000000),
(20, 80000),
(2, 200);

SELECT * FROM chata;


INSERT INTO zakaznik(jmeno, prijmeni, email, telefon)
VALUES
("David", "Schizofrenik", "ds@example.com", 123456789),
("Karel", "Traged", "kt@example.com", 723456789),
("Petr", "Parek", "pp@example.com", 773456789),
("Mirek", "Skocdopole", "ms@example.com", 777456789),
("Dratenka", "Kutilaopravar", "dk@example.com", 777756789),
("Vasek", "Hasek", "vh@example.com", 777776789),
("Pes", "Stek", "ps@example.com", 777777789);

SELECT * FROM zakaznik;


INSERT INTO rezervace(cas_prijezdu, cas_odjezdu, id_zakaznika, id_chaty)
VALUES
("2026-01-01 12:00:00", "2026-01-02 12:00:00", 1, 1),
("2026-01-03 12:00:00", "2026-01-04 12:00:00", 2, 1),
("2026-01-01 12:00:00", "2026-01-02 12:00:00", 3, 3),
("2026-01-01 12:00:00", "2026-01-02 12:00:00", 4, 5),
("2026-01-01 12:00:00", "2026-01-02 12:00:00", 5, 2),
("2026-01-01 12:00:00", "2026-01-02 12:00:00", 6, 8),
("2026-01-01 12:00:00", "2026-01-02 12:00:00", 7, 6);

SELECT * FROM rezervace;


SELECT concat(Z.jmeno, " ", Z.prijmeni) AS najemnik, concat(C.cena_za_noc*datediff(R.cas_odjezdu, R.cas_prijezdu), "CZK") AS celkem, R.id_rezervace, R.id_chaty
FROM rezervace R INNER JOIN zakaznik Z ON Z.id_zakaznika = R.id_zakaznika INNER JOIN chata C ON R.id_chaty = C.id_chaty;