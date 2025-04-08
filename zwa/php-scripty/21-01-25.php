<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <form method="POST">
        RC
        <input type="number" id="RC" name="RC" maxlength="10">
        <input type="submit" value="submit">
    </form>

    <?php
        $mesice = ["ledna", "unoru", "brezenu", "dubenu", "kvetenu", "cervnu", "cervence", "srpna", "zari", "rijna", "listopadu", "prosince"];
    
        if(isset($_POST["RC"])){

            $rc = $_POST["RC"];

            $y = substr($rc, 0, 2);
            $m = substr($rc, 2, 2);
            $d = substr($rc, 4, 2);

            $pohlavi = $m > 50 ? 1 : 0;
            if($m > 50) $m -= 50;

            if($m <= 12 && $d <= 31){

                echo $pohlavi == 1 ? "tato zena se narodila " : "tenhle muz se narodil ";
                echo $d . ". " . $mesice[$m] . " 20" . $y;
            }
        }

    ?>

</body>
</html>