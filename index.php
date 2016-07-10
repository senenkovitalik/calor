<!DOCTYPE html>
<html>
<head>
	<title>Calorizator</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/script.js"></script>
	<meta charset="utf-8">
</head>
<body>

<div id="add_new_products">
	<p>Додайте продукти в БД або <a href="#add_products_to_menu">виберіть</a> з існуючих</p>
	<table id="add-table">
		<tr>
			<th>Назва</th>
			<th>Калорійність, ккал</th>
			<th>Білки, г</th>
			<th>Жири, г</th>
			<th>Вуглеводи, г</th>
			<th></th>
		</tr>

		<tr>
			<td><input type="text"></td>
			<td><input type="number"></td>
			<td><input type="number"></td>
			<td><input type="number"></td>
			<td><input type="number"></td>
			<td>
				<input type="button" value="Add to DB" onclick="addProd(this);">
			</td>
		</tr>
	</table>
</div>

<div id="add_products_to_menu">
	<p>Додайти продукти в своє денне меню</p>
	<table id="products">
		<tr>
		    <th></th>
			<th data-col-name="name">
			    Назва
			    <img class="arrow" src="img/arrow_up.png" onclick="sortColumn(this, 'DESC');">
			    <img class="arrow" src="img/arrow_down.png" onclick="sortColumn(this, 'ASC');">
			</th>
			<th>Вага, г</th>
			<th data-col-name="calories">
			    Калорійність, ккал
			    <img class="arrow" src="img/arrow_up.png" onclick="sortColumn(this, 'DESC');">
			    <img class="arrow" src="img/arrow_down.png" onclick="sortColumn(this, 'ASC');">
			</th>
			<th data-col-name="proteins">
			    Білки, г
			    <img class="arrow" src="img/arrow_up.png" onclick="sortColumn(this, 'DESC');">
			    <img class="arrow" src="img/arrow_down.png" onclick="sortColumn(this, 'ASC');">
			</th>
			<th data-col-name="fats">
			    Жири, г
			    <img class="arrow" src="img/arrow_up.png" onclick="sortColumn(this, 'DESC');">
			    <img class="arrow" src="img/arrow_down.png" onclick="sortColumn(this, 'ASC');">
			</th>
			<th data-col-name="carbohydrates">
			    Вуглеводи, г
			    <img class="arrow" src="img/arrow_up.png" onclick="sortColumn(this, 'DESC');">
			    <img class="arrow" src="img/arrow_down.png" onclick="sortColumn(this, 'ASC');">
			</th>
			<th></th>
		</tr>

		<!-- Read products from DB -->
		<?php
		    require_once "db.php";
		    $db = new DB();

		    $prod_arr = $db->read_all_products();

		    foreach ( $prod_arr as $row ) {
		    	echo 
			    "<tr data-product-name=\"{$row['name']}\">
					<td>
						<input type=\"checkbox\">
					</td>
					<td data-value-type=\"name\" onclick=\"changeProductValue(this);\">{$row['name']}</td>
					<td>
						<input type=\"number\" onfocus=\"checkProduct(this);\" onblur=\"uncheckProduct(this);\">
					</td>
					<td data-value-type=\"calories\" onclick=\"changeProductValue(this);\">{$row['calories']}</td>
					<td data-value-type=\"proteins\" onclick=\"changeProductValue(this);\">{$row['proteins']}</td>
					<td data-value-type=\"fats\" onclick=\"changeProductValue(this);\">{$row['fats']}</td>
					<td data-value-type=\"carbohydrates\" onclick=\"changeProductValue(this);\">{$row['carbohydrates']}</td>
					<td>
						<input type=\"button\" value=\"Remove from DB\" onclick=\"removeProd(this);\">
					</td>
				</tr>";
		    }
		?>
		<tr>
			<td id="calc-td" colspan="8">
			    <input type="button" value="Calculate" onclick="calculate(this);">
			</td>
		</tr>
	</table>
</div>

<div id="calculation">
	<p>За сьогодні я з'їв</p>
	<table id="calc-table">
		<tr>
			<th>Назва</th>
			<th>Вага, г</th>
			<th>Калорійність, ккал</th>
			<th>Білки, г</th>
			<th>Жири, г</th>
			<th>Вуглеводи, г</th>
		</tr>
	</table>
</div>

</body>
</html>