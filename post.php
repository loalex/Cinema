<?php
$str_json = file_get_contents('php://input');
$param = json_decode($str_json, false);
$link = mysqli_connect('localhost', 'root', '', 'kino');

if (!$link) {
    die('Connection failed: ' . mysqli_connect_error());
}

$nazwa = mysqli_real_escape_string($link, $param->nazwa);
$rodzaj = mysqli_real_escape_string($link, $param->rodzaj);
$dlugosc = mysqli_real_escape_string($link, $param->dlugosc);
$data_dodania = mysqli_real_escape_string($link, $param->data_dodania);

$sql = "INSERT INTO kino (nazwa, rodzaj, dlugosc, data_dodania) VALUES ('$nazwa', '$rodzaj', '$dlugosc', '$data_dodania')";
$dane = $link->query($sql);

if ($dane) {
    $response = array('success' => true, 'message' => 'Dane zosta³y pomyœlnie dodane do bazy.');
} else {
    $response = array('success' => false, 'message' => 'B³¹d dodawania danych do bazy: ' . $link->error);
}

echo json_encode($response);
$link->close();
?>