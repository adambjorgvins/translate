<?php

$servername = "localhost";
$username = "test";
$password = "test";
try {
    $bdd = new PDO("mysql:host=$servername;dbname=note", $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}