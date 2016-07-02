function addProd(button) {

  var cell, name, cal, protein, fat, vugli, data, str;

  cell = button.parentNode.parentNode.cells;

  name            = cell[0].childNodes[0].value;
  calories        = cell[1].childNodes[0].value;
  proteins        = cell[2].childNodes[0].value;
  fats            = cell[3].childNodes[0].value;
  carbohydrates   = cell[4].childNodes[0].value;

  data = {
  	'name' : name,
  	'calories' : calories,
  	'proteins' : proteins,
  	'fats' : fats,
  	'carbohydrates' : carbohydrates
  };

  str = JSON.stringify(data);
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
  	  // response
      console.log(xhttp.responseText);
    }
  };
  xhttp.open("GET", "serverside.php?q=" + str, true);
  xhttp.send();
}

function calculate() {
  var table = document.getElementById("products");
  var rows = table.rows;

  var row, checkbox, name, weight, calories, proteins, fats, carbohydrates,
      total_weight = 0,
      total_calories = 0,
      total_proteins = 0,
      total_fats = 0,
      total_carbohydrates = 0;

  for (var i = 1; i < rows.length-1; i++) {
    row = rows[i];
    checkbox = row.cells[0].getElementsByTagName("input")[0];

    if (checkbox.checked) {
      name          = row.cells[1].innerText;
      weight        = row.cells[2].getElementsByTagName("input")[0].value/100;
      calories      = parseInt(row.cells[3].innerText);
      proteins      = parseFloat(row.cells[4].innerText);
      fats          = parseFloat(row.cells[5].innerText);
      carbohydrates = parseFloat(row.cells[6].innerText);

      // calculated
      proteins      = proteins*weight;
      fats          = fats*weight;
      carbohydrates = carbohydrates*weight;

      // total calculated
      total_weight        += weight;
      total_calories      += calories;
      total_proteins      += proteins;
      total_fats          += fats;
      total_carbohydrates += carbohydrates;

      var data = [name, weight, calories, proteins, fats, carbohydrates];

      addRow(data);
    }
  }
  var data = ["Total", total_weight, total_calories, total_proteins, total_fats, total_carbohydrates];
  addRow(data);
}

// function addRow(data) {
//   var table = getElementById("calc-table");
//   var rows = table.rows;
// }