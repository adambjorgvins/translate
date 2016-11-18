<?php
session_start();
$userid = $_SESSION["username"];

try {
    require("config.php");
} catch(Exception $e) {
    echo "Error with query!";
   // exit('Unable to connect to database.');
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=note", $username, $password);
    $sql = "SELECT DISTINCT (category) FROM glossary WHERE userid = '".$userid."'";
    $result = $conn->query($sql);
} catch(PDOException $e) {
    echo "Error with query! ".$e->getMessage();
}
try {
    echo "[";
    while ($row = $result->fetch())
    {
        echo("\"" . trim($row['category']) . "\",");
    }
    echo "\"Home\"";
    echo "]";
} catch(PDOException $e) {
    echo "Error with render!";
}
