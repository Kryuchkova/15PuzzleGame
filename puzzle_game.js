// реализует игру
function game() {
	// игровое поле
	var gameField = [];
	for (var i = 0; i < 4; i++){
		gameField[i] = [];
		for (var j = 0; j < 4; j++){
			if (i + j != 6){
				gameField[i][j] = i * 4 + j + 1;
			} else {
				gameField[i][j] = "";
			}
		}
	} 

	gameField = shuffle(350, gameField);
	createField(gameField);
		
}

function getNullCell(gameField){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (gameField[i][j] == "")
				return {'x': i, 'y': j}; 
		}
	}
}

// обменивает местами ячейки
function swapCells(gameField, x1, y1, x2, y2){
	var t = gameField[x1][y1];
	gameField[x1][y1] = gameField[x2][y2];
	gameField[x2][y2] = t;
}

// перемешивает ячейки пятнашек
function shuffle(count, gameField){
	var nullCell = getNullCell(gameField);
	for (var i = 0; i < count; i++) {
		switch(Math.rount(3 * Math.random())) {
		/* 0 соответсвует верхней соседней костяшке, 1 - правой  и т.д.
		 * обратим внимание что обмен местами, например,
		 * с верхней костяшкой возможен, если "пустое место"
		 * не находится у верхней границы игрового поля. Аналогично и для
		 * других соседних костяшек. При обмене изменяем переменные ei и ej.
		 */
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
	return gameField;
}

//создаем таблицу в которой рисуем ячейки
function createField(gameField){
	// создаем таблицу
	var table = document.createElement("table");
	for(var i = 0; i < 4; i++){
	// добавляем в нее строки
	var row = document.createElement("tr");
		for(var j = 0; j < 4; j++) {
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
		table.appendChild(row);		
	}
	// проверка на случай, если игрок начнет игру сначала
	if(field.childNodes.length == 1) {
		// удаляем таблицу, если она есть
		field.removeChild(field.firstChild); 
	}
	// записываем таблицу в div		
	field.appendChild(table);
}