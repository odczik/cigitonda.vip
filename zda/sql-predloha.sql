Create Table Tabulka1(

Sloupec1 Datový_typ Primary key,
Sloupec2 Datovy_typ, 
Sloupec3 Datovy_typ, 
FOREIGN KEY (SLOUPEC3) REFERENCES TABULKA2(SLOUPEC1)
);


Create Table Tabulka1(

Sloupec1 Datový_typ Constraint Tab_slou1_pk Primary key,  
Sloupec2 Datovy_typ, 
FOREIGN KEY (SLOUPEC2) REFERENCES TABULKA2(SLOUPEC1)
ON DELETE CASCADE
);

NOT_NULL - Potřebné vyplnit

ALTER TABLE TABULKA ADD SLOUPEC1 DATOVÝ TYP, SLOUPEC2 DATOVÝ_TYP NOT NULL; (Přidat atribut k entitě)

ALTER TABLE TABULKA DROP SLOUPEC1, SLOUPEC2; (Odstranit atribut v entitě)

ALTER TABLE TABULKA ALTER COLUMN CONSTRAINT SLOUPEC1 DATOVÝ_TYP; (Upravit atribut v entitě)

ALTER TABLE TABULKA ADD PRIMARY KEY (ID); (Přidání primárního klíče)

ALTER TABLE TABULKA ADD CONSTRAINT FK_ATR1_ATR2 FOREIGN KEY (SLOUPEC3) REFERENCES TABULKA2 (SLOUPEC1); (Přidat FK do entity)

ALTER TABLE TABULKA DROP CONSTRAINT FK_ATR1_ATR2; (Odebrat FK od entity)



Př. 
CREATE TABLE NEMOCI
(
id_nemoci int NOT NULL PRIMARY KEY,
nazev varchar(255) NOT NULL,
priznaky varchar(255) NOT NULL,
infekcnost bit
);

CREATE TABLE VYROBCE
(
id_vyrobce counter NOT NULL PRIMARY KEY,
nazev_vyrobce varchar(255) NOT NULL,
misto varchar(255) NOT NULL
);

CREATE TABLE LEKY
(
id_leku counter NOT NULL PRIMARY KEY,
nazev_leku varchar(255) NOT NULL,
vedlejsi_ucinky varchar(255) NOT NULL,
kategorie varchar(255) NOT NULL,
id_vyrobce int NOT NULL,
FOREIGN KEY (id_vyrobce) REFERENCES VYROBCE(id_vyrobce)
);


CREATE TABLE LEKY_NEMOCI
(
id_nemoci int NOT NULL,
FOREIGN KEY (id_nemoci) REFERENCES NEMOCI(id_nemoci),
id_leku int NOT NULL,
FOREIGN KEY (id_leku) REFERENCES LEKY(id_leku),
davkovani varchar(255) NOT NULL
);

INSERT INTO NEMOCI VALUES
(
2, "ANGÍNA", "KAŠLÁNÍ, BOLEST KRKU, TEPLOTA", 0
)	Vyplnit řádek v tabulce(pro tabulka kde první sloupec je int)

INSERT INTO VYROBCE (NAZEV_VYROBCE, MISTO) VALUES ("TEVA","OPAVA") - Vyplnit řádek v tabulce (pro tabulka kde první sloupec je counter)
