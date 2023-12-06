<?php
$servername = "localhost";
$username = "AdminLab11";
$password = "4VPnroTOC6wOU3mn";
$dbname = 'NationalParks';

$name = null;
$location = null;
$yearEstablished = null;
$freeEntry = null;
$biome = null;
$img = null;

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Error: ' . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['id']) && isset($_POST['name']) && isset($_POST['location']) && isset($_POST['yearEstablished']) && isset($_POST['freeEntry']) && isset($_POST['biome']) && isset($_POST['img'])) {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $location = $_POST['location'];
        $yearEstablished = $_POST['yearEstablished'];
        $freeEntry = $_POST['freeEntry'];
        $biome = $_POST['biome'];
        $img = $_POST['img'];

        $stmt = $conn->prepare("UPDATE Parks SET name = ?, location = ?, yearEstablished = ?, freeEntry = ?, biome = ?, imgURL = ? WHERE id = ?");
        $stmt->bind_param("ssiissi", $name, $location, $yearEstablished, $freeEntry, $biome, $img, $id);
        $stmt->execute();
        $stmt->close();

        echo $img;
    }
}
$conn->close();
