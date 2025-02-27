<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>


    <a href=""></a>
    <nav></nav>

    <?php

        $folder = scandir("zwa");

        for($i = 2; $i<count($folder); $i++){
            echo '<a href="zwa/' . $folder[$i] . 'index.html">' . $i . '</a>' . "<br>";
        }
    ?>
</body>
</html>