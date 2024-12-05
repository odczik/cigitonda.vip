create table ZAKAZNICI(

    idZakaznika counter(16) not null primary key,
    jmeno varchar(255) not null,
    prijmeni varchar(255) not null,
    telefon varchar(9) not null
);

create table AUTA(

    idAuta counter(16) not null primary key,
    SPZ varchar(255) not null,
    model varchar(255) not null,
    rokVyroby date not null,
    zakaznik int not null,
    foreign key (zakaznik) references ZAKAZNICI (idZakaznika)
);

create table OPRAVY(

    idOpravy counter(16) not null primary key,
    popis varchar(255) not null,
    cena int not null,
    datum date not null,
    idAuta int not null,
    foreign key (idAuta) references AUTA (idAuta)
);

create table ZAMESTNANCI(

    idZamestnance counter(16) not null primary key,
    jmeno varchar(255) not null,
    prijmeni varchar(255) not null,
    mzda int,
);

create table SPOJENI(
    idZamestnance int not null primary key,
    idOpravy int not null primary key,

    foreign key (idZamestnance) references ZAMESTNANCI (idZamestnance),
    foreign key (idOpravy) references OPRAVY (idOpravy)
);
insert into ZAKAZNICI(jmeno, prijmeni, telefon)
values
("David", "Mastny","123456789");
("Honza","Cervenka","198756148");
("Jan","Zelezny","789361377");
("Karel","Barel","123789156");
("Anicka","Tkanicka","734897165");

insert into ZAMESTNANCI(jmeno, prijmeni, mzda)
values
("Dratenka", "KutilAOpravar", 100);
("Franta","Švanda",500);
("Dijana","Raklotvorna",-500);
("LePan","Tau",1000);
("Vodník","Nemazbrojnik",400);

insert into AUTA(SPZ, model, rokVyroby, zakaznik)
values
("1TF8568", "polednik", "01.15.1991", 8);
("1H61891", "cap", "05.11.2011", 9);
("4TH8794", "turek", "04.09.1935", 6);
("8R18941", "sichra", "30.11.2025", 10);
("8TH8643", "gabryys", "11.05.2018", 7);

insert into OPRAVY(popis, cena, datum, idAuta)
values
("Špinavé zrcátko", 100000, "20.12.1851", 18);
("Rozkoplé dveře", 20, "02.11.1120", 20);
("Pochcaná sedačka", 80000, "15.02.2024", 17);
("Křivý volant", 400, "11.09.2001", 16);
("Okurka ve vyfuku", 10000, "28.02.1954", 19);