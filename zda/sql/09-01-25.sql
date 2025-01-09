SELECT RCPac as [Rodné cislo], DatumNavst as Datum FROM
Navsteva WHERE Month(Date()) = Month(DatumNavst) and
Year(DatumNavst) = Year(Date());

SELECT Pacient.RCpac, DATESERIAL(MID(RCpac, 1, 2), MID(RCpac, 3, 2), MID(RCpac, 5, 2))
FROM Pacient
