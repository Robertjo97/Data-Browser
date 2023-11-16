<?php
$servername = "localhost";
$username = "AdminLab11";
$password = "4VPnroTOC6wOU3mn";
$dbname = "NationalParks";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error){
    die("Connection failed: " . $conn->error);
}
$sql = "CREATE DATABASE NationalParks";
if($conn->query($sql) === TRUE){
    echo 'database created successfully';
}
else {
    echo "Error: " . $conn->error; 
}
$conn->close();
?>