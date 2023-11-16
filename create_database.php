<?php 
$servername = "localhost";
$username = "AdminLab11";
$password = "4VPnroTOC6wOU3mn";
$dbname = "NationalParks";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error){
    die("Connection failed: " . $conn->error);
}
$sql = "CREATE DATABASE myDB";
if($conn->query($sql) === TRUE){
    echo 'database created successfully';
}
else {
    echo "Error: " . $conn->error; 
}

// $sql = "CREATE TABLE Parks (
//     id INT AUTO_INCREMENT PRIMARY KEY,
    


$conn->close();
?>