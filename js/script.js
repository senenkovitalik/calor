function addProd(button) {

  var cell, name, cal, protein, fat, vugli, data, str;

  cell = button.parentNode.parentNode.cells;

  name            = cell[0].childNodes[0].value;
  calories        = cell[1].childNodes[0].value;
  proteins        = cell[2].childNodes[0].value;
  fats            = cell[3].childNodes[0].value;
  carbohydrates   = cell[4].childNodes[0].value;

  data = {
    'action': 'save',
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

function removeProd(button) {
  var name;

  name = button.parentNode.parentNode.cells[1].innerText;

  console.log(name);

  str = JSON.stringify( {'action':'remove', 'name':name} );

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log(xhttp.responseText);
    }
  };
  xhttp.open("GET", "serverside.php?q=" + str, true);
  xhttp.send();
}

// calculate each product per 100g
// and total calculation 
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
      weight        = parseInt(row.cells[2].getElementsByTagName("input")[0].value);
      calories      = parseInt(row.cells[3].innerText);
      proteins      = parseFloat(row.cells[4].innerText);
      fats          = parseFloat(row.cells[5].innerText);
      carbohydrates = parseFloat(row.cells[6].innerText);

      // calculated
      calories      *= weight/100; 
      proteins      *= weight/100;
      fats          *= weight/100;
      carbohydrates *= weight/100;

      // total calculated
      total_weight        += weight;
      total_calories      += calories;
      total_proteins      += proteins;
      total_fats          += fats;
      total_carbohydrates += carbohydrates;


      var data = [name, weight, calories, proteins, fats, carbohydrates];

      // insert row to calc-table
      addRow(data);
    }
  }

  var data = ["Сумарно", total_weight, total_calories, total_proteins, total_fats, total_carbohydrates];

  // insert row with total values
  addRow(data);
}

// insert new row as last row to calc-table
function addRow(data) {
  var table, row, cell_name, cell_weight, cell_calories, cell_protein, 
      cell_fats, cell_carbohydrates;
  
  table = document.getElementById("calc-table");
  
  row = table.insertRow(-1);

  // name
  cell_name = row.insertCell(0);
  cell_name.innerHTML = data[0];

  // weight
  cell_weight = row.insertCell(1);
  cell_weight.innerHTML = data[1];

  // calories
  cell_calories = row.insertCell(2);
  cell_calories.innerHTML = data[2].toFixed(2);

  // protein
  cell_protein = row.insertCell(3);
  cell_protein.innerHTML = data[3].toFixed(2);
  
  // fats
  cell_fats = row.insertCell(4);
  cell_fats.innerHTML = data[4].toFixed(2);

  // carbohydrates
  cell_carbohydrates = row.insertCell(5);
  cell_carbohydrates.innerHTML = data[5].toFixed(2);
}