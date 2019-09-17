// игровое поле
var gameField = [
	 [1,2,3,4],
	 [5,6,7,8],
	 [9,10,11,12],
	 [13,14,15,0]
	 ];

var field;
let nullCell = { 
  x: 3,  
  y: 3       
};

// обменивает местами ячейки
function swapCells(gameField, x1, y1, x2, y2){
	var t = gameField[x1][y1];
	gameField[x1][y1] = gameField[x2][y2];
	gameField[x2][y2] = t;
}

// перемешивает ячейки пятнашек
function shuffle(count) {
	for (i = 0; i < count; i++) {
		switch(Math.round(3 * Math.random())) {
		 case 0: 
			if (nullCell.x != 0) {
				swapCells(gameField, nullCell.x, nullCell.y, --nullCell.x, nullCell.y);
			}
			break;
		 case 1:
			 if (nullCell.y != 3) {
					swapCells(gameField, nullCell.x, nullCell.y, nullCell.x, ++nullCell.y);
				}
			break;
		 case 2:
			 if (nullCell.x != 3) {
					swapCells(gameField, nullCell.x, nullCell.y, ++nullCell.x, nullCell.y);
				}
			break;
		 case 3:
			 if (nullCell.y != 0) {
					swapCells(gameField, nullCell.x, nullCell.y, nullCell.x, --nullCell.y);
				}
			break;
		 
		}
	}
}

//создаем таблицу в которой рисуем ячейки
function createField(){
	// создаем таблицу
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	for(i = 0; i < 4; i++) {
		// добавляем в нее строки
		var row = document.createElement("tr");
		for(j = 0; j < 4; j++) {
			// создаем ячейки для пятнашек
			var cell = document.createElement("td");
			cell.id = i + " " + j;
			// устанавливаем слушатель для перемещения пятнашки
			cell.onclick = cellClick;
			// записываем в ячейку номер пятнашки
			cell.innerHTML = gameField[i][j];
			//добавляем ячейку к игровому полю
			row.appendChild(cell);
			}
		tbody.appendChild(row);		
	}
	// проверка на случай, если игрок начнет игру сначала
	if(field.childNodes.length == 1) {
		// удаляем таблицу, если она есть
		field.removeChild(field.firstChild); 
	}
	// записываем таблицу в div		
	field.appendChild(table);
}

window.onload = function() {
	field = document.getElementById("field");
	game();				
	document.getElementById("play").onclick = game;
}

function cellClick(event){	
	var event = event || window.event;
	cell = event.srcElement || event.target;
	// номер строки
	x = cell.id.charAt(0);
	// номер столбца
	y = cell.id.charAt(2);
	console.log(x, " ", y);
	// меняем местами пустую ячейку с выбранной,
	// если расстояние между ними равно 1
	// и они в одном столбца или строке
	if((x == nullCell.x && Math.abs(y - nullCell.y) == 1) || (y == nullCell.y && Math.abs(x - nullCell.x) == 1)){
		document.getElementById(nullCell.x + " " + nullCell.y).innerHTML = cell.innerHTML;
		cell.innerHTML = "";
		nullCell.x = x;
		nullCell.y = y;
		var q = true;
		//Проверяем не в выигрышной ли комбинации находятся ячейки.
		for(i = 0; i < 4; i++) {
			for(j = 0; j < 4; j++) {
				if (i + j != 6 && document.getElementById(i + " " + j).innerHTML != i * 4 + j + 1){
					q = false;
					break;
				}
			}
		}
		if (q)
			alert("YOU WIN!");
	}
}
	
function game() {
	shuffle(350);
	createField();
}
