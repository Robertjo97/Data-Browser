<?php
$rawData = file_get_contents('./data.json');
$data = json_decode($rawData);
$writeData = null;
$park = null;
$index = null;
$name = null;
$location = null;
$yearEstablished = null;
$freeEntry = null;
$biome = null;
$img = null;

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['index']) && isset($_POST['name']) && isset($_POST['location']) && isset($_POST['yearEstablished']) && isset($_POST['freeEntry']) && isset($_POST['biome']) && isset($_POST['img'])){
        
        //READ DATA
        $index = $_POST['index'];
        $name = $_POST['name'];
        $location = $_POST['location'];
        $yearEstablished = intval($_POST['yearEstablished']);
        $freeEntry = $_POST['freeEntry'] === 'true' ? true : false;
        $biome = $_POST['biome'];
        $img = $_POST['img'];
        
        //WRITE DATA
        $data[$index]->name = $name;
        $data[$index]->location = $location;
        $data[$index]->yearEstablished = $yearEstablished;
        $data[$index]->freeEntry = $freeEntry;
        $data[$index]->biome = $biome;
        $data[$index]->img = $img;
        $writeData = json_encode($data);
        file_put_contents('./data.json', $writeData);
    }
}
?>