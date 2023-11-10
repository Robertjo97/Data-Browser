<?php
$rawData = file_get_contents('./data.json');
$data = json_decode($rawData);
$size = count($data);
$index = null;
$name = null;
$location = null;
$yearEstablished = null;
$freeEntry = null;
$biome = null;
$img = null;
$newPark = null;


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['name']) && isset($_POST['location']) && isset($_POST['yearEstablished']) && isset($_POST['freeEntry']) && isset($_POST['biome']) && isset($_POST['img'])){
        $name = [$_POST['name']];
        $location = $_POST['location'];
        $yearEstablished = $_POST['yearEstablished'];
        $freeEntry = $_POST['freeEntry'];
        $biome = $_POST['biome'];
        $img = $_POST['img'];
        $data[] = array("name" => $name, "location" => $location, "yearEstablished" => $yearEstablished, "freeEntry" => $freeEntry, "biome" => $biome, "img" => $img);
        $newPark = json_encode($data);
        file_put_contents('./data.json', $newPark);
        echo json_encode($data[$size]);
    }
}   

?>