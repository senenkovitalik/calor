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
  
}