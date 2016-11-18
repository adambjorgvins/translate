<?php

/* Values received via ajax */
$id = $_POST['id'];

// connection to the database
try {
    require("config.php");
} catch(Exception $e) {
    exit('Unable to connect to database.');
}
// update the records
try{
    $sql = "DELETE FROM glossary WHERE id='$id'";
    $q = $bdd->prepare($sql);
    $q->execute(array($id));
    echo ("Success!" . $id);
} catch (Exception $e){
    echo ("Error" . $id);
}