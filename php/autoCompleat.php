<?php
session_start();
$category = $_SESSION["category"];

try {
    require("config.php");
} catch(Exception $e) {
    exit('Unable to connect to database.');
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=notes", $username, $password);
    $sql = "SELECT place FROM glossary WHERE category = '" . $category . "'";
    $result = $conn->query($sql);
} catch(PDOException $e) {
    echo "Error with query!";
}

echo "{";
while ($row = $result->fetch())
{
    echo("'" . $row['category'] . "' : null, ");
}
echo "'category' : null";
echo "}";