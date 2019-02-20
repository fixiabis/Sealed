board.setStatusMark("area", "O", function (painter, size, x, y) {
    painter.fillStyle = "indianred";
    painter.fillRect(x - 1, y - 1, size, size);
});
board.setStatusMark("area", "X", function (painter, size, x, y) {
    painter.fillStyle = "lightblue";
    painter.fillRect(x - 1, y - 1, size, size);
});
board.setStatusMark("status", "", painter => painter.strokeStyle = "black");
board.setStatusMark("status", "dead", painter => painter.strokeStyle = "red");
board.setStatusMark("status", "root", painter => painter.strokeStyle = "blue");
board.setStatusMark("status", "spear", painter => painter.strokeStyle = "orange");
board.setStatusMark("status", "arrow", painter => painter.strokeStyle = "green");
board.setStatusMark("dead", "", painter => painter.strokeStyle = painter.strokeStyle);
board.setStatusMark("dead", "battle", painter => painter.strokeStyle = "brown");
board.setStatusMark("dead", "shield", painter => painter.strokeStyle = "navy");
board.setStatusMark("symbol", "O", function (painter, size, x, y) {
    if (size > 25) {
        size -= 20;
        x += 10;
        y += 10;
    } else if (size > 15) {
        size -= 10;
        x += 5;
        y += 5;
    }
    x -= 1;
    y -= 1;
    var halfSize = size / 2;
    painter.lineWidth = 2;
    painter.beginPath();
    painter.arc(x + halfSize, y + halfSize, halfSize, 0 * Math.PI, 2 * Math.PI);
    painter.stroke();
    painter.closePath();
    painter.lineWidth = 1;
    painter.strokeStyle = "black";
});
board.setStatusMark("symbol", "X", function (painter, size, x, y) {
    if (size > 25) {
        size -= 20;
        x += 10;
        y += 10;
    } else if (size > 15) {
        size -= 10;
        x += 5;
        y += 5;
    }
    x -= 1;
    y -= 1;
    painter.lineWidth = 2;
    painter.beginPath();
    painter.moveTo(x, y);
    painter.lineTo(x + size, y + size);
    painter.stroke();
    painter.closePath();
    painter.beginPath();
    painter.moveTo(x, y + size);
    painter.lineTo(x + size, y);
    painter.stroke();
    painter.closePath();
    painter.lineWidth = 1;
    painter.strokeStyle = "black";
});