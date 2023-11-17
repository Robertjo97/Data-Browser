<?php
$servername = "localhost";
$username = "AdminLab11";
$password = "4VPnroTOC6wOU3mn";
$dbname = 'NationalParks';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

$index = null;
$name = null;
$location = null;
$yearEstablished = null;
$freeEntry = null;
$biome = null;
$img = null;
$newPark = null;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['name']) && isset($_POST['location']) && isset($_POST['yearEstablished']) && isset($_POST['freeEntry']) && isset($_POST['biome']) && isset($_POST['img'])) {
        $name = $_POST['name'];
        $location = $_POST['location'];
        $yearEstablished = intval($_POST['yearEstablished']);
        $freeEntry = $_POST['freeEntry'] === 'true' ? 1 : 0;
        $biome = $_POST['biome'];
        $img = $_POST['img'];

        $stmt = $conn->prepare("INSERT INTO Parks (name, location, yearEstablished, freeEntry, biome, imgURL) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssibss", $name, $location, $yearEstablished, $freeEntry, $biome, $img);

        if ($stmt->execute()) {
            $id = $conn->insert_id;
            $newPark = array('id' => $id, 'name' => $name, 'location' => $location, 'yearEstablished' => $yearEstablished, 'freeEntry' => $freeEntry, 'biome' => $biome, 'img' => $img);
        }
        $stmt->close();
        $response = json_encode($newPark);
        echo $response;
    }
}
?>