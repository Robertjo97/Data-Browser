<?php 
$rawData = file_get_contents('./data.json');
$data = json_decode($rawData);
print_r($data);
?>