create TABLE AUTORI(
    idAutora varchar(16) NOT NULL primary key,
    jmeno varchar(255) NOT NULL,
    prijmeni varchar(255) NOT NULL,
    prezdivka varchar
)
create TABLE KNIHY(
    idKnihy varchar(16) NOT NULL primary key,
    nazev varchar(255) NOT NULL,
    autor varchar(16) NOT NULL,
    zanr varchar(16),
    foreign key (autor) references AUTORI(idAutora) 
)