<?php
$file = 'data.json';
	$json = file_get_contents( $file );
	$data = json_decode($json);
	$postArray = array(
      "name" => $_GET['email'],
      "data_url" => $_GET['data_url']
    ); 
	$data[] = $postArray;
	$data_proccesed = json_encode($data);
	file_put_contents($file, $data_proccesed);
?>