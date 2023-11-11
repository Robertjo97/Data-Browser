<?php 
$rawData = file_get_contents('./data.json');
$data = json_decode($rawData);
$size = count($data);
$park = null;

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['index'])){
        $index = $_POST['index'];
        if($index >= $size){
            $index = 0;
        }
        else if($index == -1){
            $index = $size - 1;
        }
        $park = $data[$index];
        $response = array('park' => $park, 'size' => $size, 'position' => $index + 1);
        echo json_encode($response);
    }
}
?>


