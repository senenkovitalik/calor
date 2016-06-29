<?php 
	$product = json_decode( $_REQUEST["q"] );
	
	$name 			= $product->name;
  	$calories 		= $product->calories;
  	$proteins 		= $product->proteins;
  	$fats 			= $product->fats;
  	$carbohydrates  = $product->carbohydrates;
	
	$db = new DB();
	$db->saveProduct($name, $calories, $proteins, $fats, $carbohydrates);
?>