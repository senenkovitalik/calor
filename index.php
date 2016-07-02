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
	<table>
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
	<table>
		<tr>
			<th>Назва</th>
			<th>Вага, г</th>
			<th>Калорійність, ккал</th>
			<th>Білки, г</th>
			<th>Жири, г</th>
			<th>Вуглеводи, г</th>
			<th></th>
		</tr>

		<!-- Add PHP code here -->
		<!-- Read products from DB -->

		<tr>
			<td>
				<input type="checkbox"> Кукурудза</td>
			<td>
				<input type="number">
			</td>
			<td>54</td>
			<td>1,2</td>
			<td>0,5</td>
			<td>40,0</td>
			<td>
				<input type="button" value="Remove from DB">
			</td>
		</tr>
	</table>
</div>

<div id="calculation">
	<p>За сьогодні я з'їв</p>
	<table>
		<tr>
			<th>Назва</th>
			<th>Вага, г</th>
			<th>Калорійність, ккал</th>
			<th>Білки, г</th>
			<th>Жири, г</th>
			<th>Вуглеводи, г</th>
		</tr>

		<!-- Add JS code here -->

		<tr>
			<td>Сумарно</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></th>
		</tr>
	</table>
</div>

</body>
</html>