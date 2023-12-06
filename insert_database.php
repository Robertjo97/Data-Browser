<?php
$servername = "localhost";
$username = "AdminLab11";
$password = "4VPnroTOC6wOU3mn";
$dbname = "NationalParks";

$rawData = file_get_contents('./data.json');
$data = json_decode($rawData, true);

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Error ' . $conn->connect_error);
}
for ($i = 0; $i < count($data); $i++) {
    $park = $data[$i];
    $sql = "INSERT INTO Parks (name, location, yearEstablished, freeEntry, biome, imgURL)
    VALUES ('" . $park['name'] . "', '" . $park['location'] . "', " . $park['yearEstablished'] . ", " . ($park['freeEntry'] ? 1 : 0) . ", '" . $park['biome'] . "', '" . $park['img'] . "')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
