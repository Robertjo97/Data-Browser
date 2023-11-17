<?php 
$servername = "localhost";
$username = "AdminLab11";
$password = "4VPnroTOC6wOU3mn";
$dbname = 'NationalParks';
$index = null;

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Error " . $conn->connect_error);
}

$result = $conn->query("SELECT COUNT(*) AS count FROM Parks");
$row = $result->fetch_assoc();
$size = $row['count'];

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['index'])){
        $index = $_POST['index'];
        if($index >= $size){
            $index = 0;
        }
        else if($index == -1){
            $index = $size - 1;
        }
        $sql = "SELECT * FROM Parks LIMIT 1 OFFSET $index";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $park = array ('id' => $row['id'], 'name' => $row['name'], 'location' => $row['location'], 'yearEstablished' => $row['yearEstablished'], 'freeEntry' => $row['freeEntry'], 'biome' => $row['biome'], 'img' => $row['imgURL']);
        $response = array('park' => $park, 'size' => $size, 'position' => $index + 1);
        echo json_encode($response);
    }
}

$conn->close();
?>


