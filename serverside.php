<?php 
	$product = json_decode( $_REQUEST["q"] );
	
	$name 			= $product->name;
  	$calories 		= $product->calories;
  	$proteins 		= $product->proteins;
  	$fats 			= $product->fats;
  	$carbohydrates  = $product->carbohydrates;
	
	require_once "db.php";

	$db = new DB();
	
	echo $db->saveProduct($name, $calories, $proteins, $fats, $carbohydrates);
?>