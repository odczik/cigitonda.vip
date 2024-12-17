SELECT Vyrobce, Cena_bez_DPH, Cena_bez_DPH*1.2 as cena FROM Mobily
WHERE Vyrobce =  "Nokia" OR Vyrobce = "Apple"
ORDER BY Cena_bez_DPH;