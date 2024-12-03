create table ZAMESTNANCI(

    idZamestnance counter(16) not null primary key,
    jmeno varchar(255) not null,
    prijmeni varchar(255) not null,
    email varchar(255) not null,
    telefon varchar(9) not null,
    datumNarozeni date not null,
    pozice varchar(255) not null
);

create table PROJEKTY(

    idProjektu counter(16) not null primary key,
    popis varchar(255) not null,
    cena int not null,
    hotovo bit not null,
);

create table SPOJENI(

    idZamestnance int not null,
    idProjektu int not null,

    foreign key (idZamestnance) references ZAMESTNANCI (idZamestnance),
    foreign key (idProjektu) references PROJEKTY (idProjektu)
);

insert into ZAMESTNANCI(jmeno, prijmeni, email, telefon, datumNarozeni, pozice)
values
("Karel","Barel","kajabaja@yahoo.com","123456789","12.10.1821","kolemjdoucí")
("Verca","Veprova","minecraftcreeper815@seznam.cz","875132645","01.01.2023","kominik")
("Dominik","Kominik","domcaskocdopole@gmail.com","751465213","08.06.2001","vrchni mechanik")

insert into PROJEKTY(popis,cena,hotovo)
values
("fein",500,1)
("cisteni kominu",1800,0)
("spravit kavovar",20000,0)
("umit si vlasy",0,0)
("zbavit se hada z koupelny(vasek)",-100,0)