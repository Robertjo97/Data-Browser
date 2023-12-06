<?php
$servername = "localhost";
$username = "AdminLab11";
$password = "4VPnroTOC6wOU3mn";
$dbname = 'NationalParks';
$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){
    die("Connection failed " . $conn->connect_error);
}
$sql = "CREATE TABLE Parks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    yearEstablished INT,
    freeEntry BOOLEAN,
    biome VARCHAR(255),
    imgURL TEXT
    )"; 

if($conn->query($sql) === TRUE){
    echo "Table " . $dbname . " created successfully!";   
}
else {
    echo "Error: " . $conn->error;
}
?>