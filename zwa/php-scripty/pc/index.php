<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>

    <div id="terminalCont">

        <input type="text" id="terminal" name="terminal">

    </div>
    
    <div id="inputCont">
        <form method="post" enctype="multipart/form-data">
            <input type="file" id="fileInput" name="fileInput">
            <input type="submit" value="odeslat">
        </form>
    </div>

    <?php
    
        if(isset($_FILES["fileInput"])){
            
            move_uploaded_file($_FILES["fileInput"]["tmp_name"], "soubory/prijate/" . $_FILES["fileInput"]["name"]);
        
            echo "soubory/prijate/" . $_FILES["fileInput"]["name"];
        }
    
    ?>

    <script>
        document.getElementById('terminal').addEventListener('keydown', e => {
        
            console.log(e.key)
        })
    </script>
</body>
</html>