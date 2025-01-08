<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="get">
        <input type="date" name="datum" id="datum">
        <input type="number" name="num" id="num">
        <input type="submit" value="odeslat">
    </form>

    <?php
    
        if(isset($_GET["datum"])){
            $datum = $_GET["datum"];
            $num = $_GET["num"];
            
            echo "<div>". $datum ."</div>";
        }

    ?>
</body>
</html>