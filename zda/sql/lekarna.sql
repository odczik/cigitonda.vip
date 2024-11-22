Create Table LEKY(
    id_leku int NOT NULL Primary key,
    nazev varchar(255) NOT NULL,
    cena int NOT NULL,
    vyrobce varchar(255) NOT NULL,
    kategorie varchar(255) NOT NULL
);
Create Table SKLAD(
    id_leku int NOT NULL ,
    id_sarze varchar(7) NOT NULL Primary key,
    pocet int NOT NULL,
    datum_expirace date NOT NULL,
    Foreign key (id_leku) References LEKY (id_leku)
);
Create Table OBSAH(
    evidencni_cislo int NOT NULL Primary key,
    id_sarze varchar(7) NOT NULL,
    id_leku int NOT NULL,
    mnozstvi int NOT NULL,
    Foreign key (id_sarze) References SKLAD (id_sarze)
);
Create Table PRODEJ(
    evidencni_cislo int NOT NULL Primary key,
    datum date NOT NULL,
    Foreign key (evidencni_cislo) References OBSAH (evidencni_cislo)
);

insert into OBSAH values(
    1,"iopiie",2,10
)