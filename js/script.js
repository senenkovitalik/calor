function addProd(button) {

  var cell, name, cal, protein, fat, vugli, data;

  cell = button.parentNode.parentNode.cells;

  name    = cell[0].childNodes[0].value;
  cal     = cell[1].childNodes[0].value;
  protein = cell[2].childNodes[0].value;
  fat     = cell[3].childNodes[0].value;
  vugli   = cell[4].childNodes[0].value;

  data = {
  	'name' : name,
  	'call' : cal,
  	'protein' : protein,
  	'fat' : fat,
  	'vugli' : vugli
  };

  console.log( JSON.stringify(data) );
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
  	  // response
    }
  };
  xhttp.open("GET", window.location.protocol +"//serverside.php", true);
  xhttp.send( data );
}