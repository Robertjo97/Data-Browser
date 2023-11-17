<?php
$servername = "localhost";
$username = "AdminLab11";
$password = "4VPnroTOC6wOU3mn";
$dbname = 'NationalParks';

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Error: " . $conn->connect_error);
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['id'])){
        $id = $_POST['id'];

        $sql = "DELETE FROM Parks WHERE id=$id";
        $conn->query($sql);
        
        $sql = "SELECT * FROM Parks LIMIT 1 OFFSET 0";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $park = array ('id' => $row['id'], 'name' => $row['name'], 'location' => $row['location'], 'yearEstablished' => $row['yearEstablished'], 'freeEntry' => $row['freeEntry'], 'biome' => $row['biome'], 'img' => $row['imgURL']);
        
        echo json_encode($park);
    }
}
?>