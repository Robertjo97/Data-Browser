<?php
$rawData = file_get_contents('./data.json');
$data = json_decode($rawData);
$size = count($data);
$index = null;
$park = null;
$writeData = null;

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['index'])){
        $index = $_POST['index'];

        array_splice($data, $index, 1);
        $writeData = json_encode($data);
        file_put_contents('./data.json', $writeData);

        $size = count($data);

        if($index != 0){
            $index = $index - 1;
        }
        
        $park = $data[$index];
        $response = array('park' => $park, 'size' => $size, 'position' => $index + 1);
        echo json_encode($response);
    }
}
?>