<?php
$method = null;
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['method'])){
        $method = $_POST['method'];
        echo $method;
    }
}
?>