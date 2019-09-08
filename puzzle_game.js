function init() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	    context.fillStyle = "#FF9200"; // устанавливаем цвет "заливки"
	    context.fillRect(0, 0, canvas.width, canvas.height); // закрашиваем холст        
}