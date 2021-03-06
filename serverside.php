<?php
    require_once "db.php";
	$db = new DB();

	$product = json_decode( $_REQUEST["q"] );
	
    $action = $product->action;
    
    switch ( $action ) {
    	case 'save': save_prod( $product );
            break;
        case 'remove': remove_prod( $product );
            break;
        case 'update': update_prod( $product );
            break;
        case 'sort': sort_prod( $product );
            break; 
    }

    function save_prod( $product ) {
        $name 			= $product->name;
	  	$calories 		= $product->calories;
	  	$proteins 		= $product->proteins;
	  	$fats 			= $product->fats;
	  	$carbohydrates  = $product->carbohydrates;	

	  	global $db;
	  	echo $db->save_product( $name, $calories, $proteins, $fats, $carbohydrates );
    }
    
	function remove_prod( $product ) {
        $name = $product->name;
        global $db;
        echo $db->remove_product( $name );
	}

    function update_prod( $product ) {
        $value = $product->value;
        $value_type = $product->value_type;
        $prod = $product->product;

        global $db;

        echo $db->update_product( $value, $value_type, $prod );
    }

    function sort_prod( $product ) {
        $column = $product->column;
        $order = $product->order;

        global $db;

        $prod = $db->sort_product( $column, $order );
        
        $prod_arr = array();

        foreach ($prod as $p) {
            array_push( $prod_arr, $p );
        }

        echo json_encode( $prod_arr );
    }