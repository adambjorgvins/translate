<?php
session_start();
$userid = $_SESSION["username"];

try {
    require("config.php");
} catch(Exception $e) {
    exit('Unable to connect to database.');
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=note", $username, $password);
    $sql = "SELECT id, fromtext, totext, category FROM glossary WHERE userid = '" . $userid . "' ORDER BY category DESC";
    $result = $conn->query($sql);
} catch(PDOException $e) {
    echo "Error with query!";
}

$data = array();
while ($row = $result->fetch())
{
    $data[] = array('id' => $row['id'], 'from' => $row['fromtext'], 'to' => $row['totext'], 'category'=> $row['category'] );
}

echo '<table class="striped centered responsive-table">';
    echo '<thead>';
        echo '<tr>';
            echo '<th>From</th>';
            echo '<th>To</th>';
            echo '<th>Category</th>';
            echo '<th></th>';
        echo '</tr>';
    echo '</thead>';
    echo '<tbody>';
        foreach ($data as $ROW){
            echo'<tr>';
                echo'<td>'. $ROW['from']."</td>";
                echo'<td>'. $ROW['to'].'</td>';
                echo'<td>'. $ROW['category'].'</td>';
                echo'<td><button id="' . $ROW["id"] . '" class="large material-icons btn waves-effect waves-light bold  red del-butt">delete</button></td>';
            echo'</tr>';
        }
    echo '</tbody>';
echo '</table>';
