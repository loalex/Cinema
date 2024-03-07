<?php
header("Content-Type: application/json");

$inputData = json_decode(file_get_contents('php://input'));

$mysqli = new mysqli($inputData->host, $inputData->user, $inputData->pass, $inputData->baza);

if ($mysqli->connect_errno) {
    // bledy
    $error = array("error" => "Database connection error: " . $mysqli->connect_error);
    echo json_encode($error);
    exit;
}

$result = $mysqli->query($inputData->sql);

if ($result === false) {
    $error = array("error" => "SQL query error: " . $mysqli->error);
    echo json_encode($error);
    exit;
}

$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($data);

$mysqli->close();
?>
