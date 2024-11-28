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
    zakaznik counter(16) not null,
    foreign key (zakaznik) references ZAKAZNICI (idZakaznika)
);

create table OPRAVY(

    idOpravy counter(16) not null primary key,
    popis varchar(512) not null,
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
    oprava int,
);

create table SPOJENI(
    idZamestnance int not null primary key,
    idOpravy int not null primary key,

    foreign key (idZamestnance) references ZAMESTNANCI (idZamestnance),
    foreign key (idOpravy) references OPRAVY (idOpravy)
);
insert into ZAKAZNICI(jmeno, prijmeni, telefon)
values
("David", "Mastny","123456789"),
("Honza","Cervenka","198756148"),
("Jan","Zelezny","789361377"),
("Karel","Barel","123789156"),
("Anicka","Tkanicka","734897165");

insert into ZAMESTNANCI values(Dratenka, KutilAOpravar, 100);