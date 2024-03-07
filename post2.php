<?php
    header("Content-Type: application/json");
    $str_json = file_get_contents('php://input');
    $param = json_decode($str_json, false);
    $link = new mysqli($param->host, $param->user, $param->pass, $param->baza);
	if ($link->connect_error) {
		die("Nie udało się połączyć z bazą! Błąd: " . $link->connect_error);
	}
	if ($link->query($param->sql) === TRUE) {
		$odp = array("status" => "success", "message" => "Pomyślnie dodano do bazy!");
	} else {
		$odp = array("status" => "error", "message" => "Nie udało się dodać do bazy! Błąd:" . $link->error);
	}
    echo json_encode($odp);
    $link->close();
?>