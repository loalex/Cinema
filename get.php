<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8'); 

$dbname = "kino"; 

$link = mysqli_connect('localhost', 'root', '', $dbname); 
if (!$link) {
    die('Connection failed: ' . mysqli_connect_error());
}

$sql = "SELECT nazwa, rodzaj, data_dodania FROM filmy ORDER BY nazwa DESC";
$dane = $link->query($sql);
if ($dane === false) {
        die("Błąd wykonania zapytania SQL: " . $link->error);
    }
try {
		$outp = $dane->fetch_all(MYSQLI_ASSOC);
}

catch(Exception $e) {
  echo 'Message: ' .$e->getMessage();
}

echo json_encode($outp);
$link->close();
?>