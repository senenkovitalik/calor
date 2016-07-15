function addProd(button) {

  var cells = button.parentNode.parentNode.cells;

  var name            = cells[0].childNodes[0].value;
  var calories        = cells[1].childNodes[0].value;
  var proteins        = cells[2].childNodes[0].value;
  var fats            = cells[3].childNodes[0].value;
  var carbohydrates   = cells[4].childNodes[0].value;

  var data = {
    'action': 'save',
  	'name': name,
  	'calories': calories,
  	'proteins': proteins,
  	'fats': fats,
  	'carbohydrates': carbohydrates
  };
  
  var str = JSON.stringify(data);
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
  	  // response
      if (xhttp.responseText) {
        // insert new row
        addRowAJAX(data);
      }
    }
  };
  xhttp.open("GET", "serverside.php?q=" + str, true);
  xhttp.send();
}

function removeProd(button) {

  var name = button.parentNode.parentNode.cells[1].innerText;

  var obj = {
    'action': 'remove',
    'name': name
  }

  var str = JSON.stringify(obj);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      if (xhttp.responseText) {
        var row = button.parentNode.parentNode;
        removeRowAJAX(row);
      }
    }
  };
  xhttp.open("GET", "serverside.php?q=" + str, true);
  xhttp.send();
}

// calculate each product per 100g
// and total calculation 
function calculate() {

  clearCalcTable();

  var table = document.getElementById('products');
  var rows = table.rows;

  var name, weight, calories, proteins, fats, carbohydrates,
      total_weight = 0,
      total_calories = 0,
      total_proteins = 0,
      total_fats = 0,
      total_carbohydrates = 0;

  for (var i = 1; i < rows.length-1; i++) {
    var row = rows[i];
    var checkbox = row.cells[0].getElementsByTagName('input')[0];

    if (checkbox.checked) {
      name          = row.cells[1].innerText;
      weight        = parseInt(row.cells[2].getElementsByTagName('input')[0].value);
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

  //  %
  var sum = total_proteins + total_fats + total_carbohydrates;
  var percent = 100/sum;

  var percent_proteins = total_proteins * percent;
  var percent_fats = total_fats * percent;
  var percent_carbohydrates = total_carbohydrates * percent;

  var data = [
    'Сумарно', 
    total_weight, 
    total_calories, 
    total_proteins, 
    total_fats, 
    total_carbohydrates,
    percent_proteins, 
    percent_fats, 
    percent_carbohydrates
  ];

  // insert row with total values
  addRow(data);
  addAdvice(data);
}

// insert new row as last row to calc-table
function addRow(data) {
  
  var table = document.getElementById("calc-table");
  
  var row = table.insertRow(-1);

  // name
  var cell_name = row.insertCell(0);
  cell_name.innerHTML = data[0];

  // weight
  var cell_weight = row.insertCell(1);
  cell_weight.innerHTML = data[1];

  // calories
  var cell_calories = row.insertCell(2);
  cell_calories.innerHTML = data[2].toFixed(2);

  // protein
  var cell_protein = row.insertCell(3);
  if (data[6] !== undefined) {
    cell_protein.innerHTML = data[3].toFixed(2) + " ( " + data[6].toFixed(2) + "% )";
  } else {
    cell_protein.innerHTML = data[3].toFixed(2);
  }
  
  // fats
  var cell_fats = row.insertCell(4);
  if (data[7] !== undefined) {
    cell_fats.innerHTML = data[4].toFixed(2) + " ( " + data[7].toFixed(2) + "% )";
  } else {
    cell_fats.innerHTML = data[4].toFixed(2);
  }
  
  // carbohydrates
  var cell_carbohydrates = row.insertCell(5);
  if (data[8] !== undefined) {
    cell_carbohydrates.innerHTML = data[5].toFixed(2) + " ( " + data[8].toFixed(2) + "% ) ";
  } else {
    cell_carbohydrates.innerHTML = data[5].toFixed(2);
  }
}

// dynamicaly add new product to products table
function addRowAJAX(data) {

  var table = document.getElementById("products");

  // insert new row before last row
  var row = table.insertRow( table.getElementsByTagName("tr").length - 1 );
  row.setAttribute("data-product-name", data.name);


  var cell_ch            = row.insertCell(0);
  var cell_name          = row.insertCell(1);
  var cell_weight        = row.insertCell(2);
  var cell_calories      = row.insertCell(3);
  var cell_proteins      = row.insertCell(4);
  var cell_fats          = row.insertCell(5);
  var cell_carbohydrates = row.insertCell(6);
  var cell_remove        = row.insertCell(7);

  cell_ch.innerHTML = '<input type="checkbox">';

  cell_name.setAttribute("data-value-type", "name");
  cell_name.setAttribute("onclick", "changeProductValue(this)");
  cell_name.innerHTML = data.name;

  cell_weight.innerHTML = '<input type="number" onfocus="checkProduct(this);" onblur="uncheckProduct(this);">';

  cell_calories.setAttribute("data-value-type", "calories");
  cell_calories.setAttribute("onclick", "changeProductValue(this)");
  cell_calories.innerHTML = data.calories;
  
  cell_proteins.setAttribute("data-value-type", "proteins");
  cell_proteins.setAttribute("onclick", "changeProductValue(this)");
  cell_proteins.innerHTML = data.proteins;

  cell_fats.setAttribute("data-value-type", "fats");
  cell_fats.setAttribute("onclick", "changeProductValue(this)");
  cell_fats.innerHTML = data.fats;

  cell_carbohydrates.setAttribute("data-value-type", "carbohydrates");
  cell_carbohydrates.setAttribute("onclick", "changeProductValue(this)");
  cell_carbohydrates.innerHTML = data.carbohydrates;

  cell_remove.innerHTML = '<input type="button" value="Remove from DB" onclick="removeProd(this)">';
}

// dynamicaly remove product from products table
function removeRowAJAX(row) {
  var table = document.getElementById("products");
  table.deleteRow(row.rowIndex);
}

function checkProduct(input) {
  var row = input.parentNode.parentNode;
  var cell = row.cells[0];
  var checkbox = cell.getElementsByTagName("input")[0];
  checkbox.checked = true;
}

function uncheckProduct(input) {
  var row = input.parentNode.parentNode;
  var cell = row.cells[0];
  var checkbox = cell.getElementsByTagName("input")[0];

  if (input.value === "") {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }
}

function clearProdTable() {
  var table = document.getElementById("products");
  var rows = table.rows;
  
  for (var i = rows.length-2; i > 0; i--) {
    table.deleteRow(rows[i].rowIndex);
  }
}

function clearCalcTable() {
  var table = document.getElementById("calc-table");
  var rows = table.rows;
  
  for (var i = rows.length-1; i > 0; i--) {
    table.deleteRow(rows[i].rowIndex);
  }
}

// click on value and start to change it
function changeProductValue(td) {

  var text = td.innerText;

  var input = document.createElement("input");
  input.id = "name";
  input.type = "text";
  input.value = text;

  input.addEventListener("click", function(e) {
    // prevent event propagation to td
    if (e.stopPropagation) e.stopPropagation();
  });

  input.addEventListener("blur", function(e) {
    var value = e.target.value;
    var valueType = td.getAttribute("data-value-type");
    var name = td.parentNode.getAttribute("data-product-name");

    td.innerHTML = value;

    updateProduct(value, valueType, name);
  });

  td.innerText = "";
  td.appendChild(input);

  input.focus();
}

function updateProduct(value, valueType, name) {

  var data = {
    'action': 'update',
    'product': name,
    'value': value,
    'value_type': valueType,
  };

  var str = JSON.stringify(data);
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // response
      if (xhttp.responseText) {
        // insert new row
        console.log(xhttp.response);
      }
    }
  };
  xhttp.open("GET", "serverside.php?q=" + str, true);
  xhttp.send();
}

function sortColumn(column, order) {
  var col = column.parentNode.getAttribute("data-col-name");

  var data = {
    'action': 'sort',
    'column': col,
    'order': order
  };

  var str = JSON.stringify(data);
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      if (xhttp.responseText) {

        clearProdTable();
        
        var sortedProducts = JSON.parse(xhttp.responseText);
        sortedProducts.forEach(function(item) {
          addRowAJAX(item);
        });
      }
    }
  };
  xhttp.open("GET", "serverside.php?q=" + str, true);
  xhttp.send();
}

function addAdvice(data) {
  
  var text = document.getElementById("advice").firstElementChild;

  var p = data[6];
  var f = data[7];
  var c = data[8];

  // protein 30-35
  // fat 10-20
  // carbohydrates 50-60
  var pt, ft, ct;

  if (p >= 30 && p <= 35) {
    pt = "норма";
  } else if (p < 30) {
    pt = "+" + (30 - p).toFixed(2) + "%";
  } else {
    pt = "-" + (p - 35).toFixed(2) + "%";
  }

  if (f >= 10 && f <= 20) {
    ft = "норма";
  } else if (f < 10) {
    ft = "+" + (10 - f).toFixed(2) + "%";
  } else {
    ft = "-" + (f - 20).toFixed(2) + "%";
  }

  if (c >= 50 && c <= 60) {
    ct = "норма";
  } else if (c < 50) {
    ct = "+" + (50 - c).toFixed(2) + "%";
  } else {
    ct = "-" + (c - 60).toFixed(2) + "%";
  }

  text.innerHTML = "Норма: білки - 30-35%, жири - 10-20%, вуглеводи - 50-60%<br>Білки: " + pt + ". Жири: " + ft + ". Вуглеводи: " + ct;
}