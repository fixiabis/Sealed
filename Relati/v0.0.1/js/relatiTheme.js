board.setStatusMark("area", "O", function (painter, size, x, y) {
    painter.fillStyle = "#c67093";
    painter.fillRect(x - 1, y - 1, size, size);
});
board.setStatusMark("area", "X", function (painter, size, x, y) {
    painter.fillStyle = "#9fc4de";
    painter.fillRect(x - 1, y - 1, size, size);
});
board.setStatusMark("symbol", "O", function (painter, size, x, y) {
    painter.fillStyle = "palevioletred";
    painter.fillStyle = "#c67093";
    painter.fillRect(x - 1, y - 1, size, size);
    painter.fillStyle = "black";
});
board.setStatusMark("symbol", "X", function (painter, size, x, y) {
    painter.fillStyle = "lightsteelblue";
    painter.fillStyle = "#9fc4de";
    painter.fillRect(x - 1, y - 1, size, size);
    painter.fillStyle = "black";
});
board.setStatusMark("status", "", function (painter, size, x, y, grid) {
    if (grid._.symbol == "") return;
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
    painter.beginPath();
    painter.arc(x + halfSize, y + halfSize, halfSize, 0 * Math.PI, 2 * Math.PI);
    painter.stroke();
    painter.closePath();
});
board.setStatusMark("status", "root", function (painter, size, x, y) {
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
    painter.beginPath();
    painter.moveTo(x, y);
    painter.lineTo(x, y + size);
    painter.lineTo(x + size, y + size);
    painter.lineTo(x + size, y);
    painter.lineTo(x + size / 4 * 3, y + size / 4 * 3);
    painter.lineTo(x + size / 2, y);
    painter.lineTo(x + size / 4, y + size / 4 * 3);
    painter.lineTo(x, y);
    painter.stroke();
    painter.closePath();
});
board.setStatusMark("status", "dead", function (painter, size, x, y, grid) {
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
    painter.beginPath();
    painter.fillStyle = "black";
    switch (grid._.dead) {
        case "":
            var halfSize = size / 2;
            painter.arc(x + halfSize, y + halfSize, halfSize / 2, 0 * Math.PI, 2 * Math.PI);
            break;
        case "battle":
            var halfSize = size / 2;
            painter.arc(x + halfSize, y + halfSize, halfSize / 2, 0 * Math.PI, 2 * Math.PI);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            painter.moveTo(x, y);
            painter.lineTo(x + size, y + size);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            painter.moveTo(x + size, y);
            painter.lineTo(x, y + size);
            break;
        case "shield":
            painter.beginPath();
            painter.moveTo(x, y);
            painter.lineTo(x + size, y);
            painter.lineTo(x + size, y + size / 2);
            painter.lineTo(x + size / 2, y + size);
            painter.lineTo(x, y + size / 2);
            painter.lineTo(x, y);
            break;
    }
    painter.stroke();
    painter.closePath();
});
board.setStatusMark("status", "spear", function (painter, size, x, y, grid) {
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
    var halfSize = size / 2,
        arrowSize = size / 5;
    painter.beginPath();
    switch (true) {
        case grid._.direct.match(/FR|BL/) != null:
            painter.moveTo(x + size, y);
            painter.lineTo(x, y + size);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            if (grid._.direct == "FR") {
                painter.moveTo(x, y + size);
                painter.lineTo(x + arrowSize, y + size);
                painter.lineTo(x, y + size - arrowSize);
            } else {
                painter.moveTo(x + size, y);
                painter.lineTo(x + size, y + arrowSize);
                painter.lineTo(x + size - arrowSize, y);
            }
            break;
        case grid._.direct.match(/FL|BR/) != null:
            painter.moveTo(x, y);
            painter.lineTo(x + size, y + size);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            if (grid._.direct == "FL") {
                painter.moveTo(x + size, y + size);
                painter.lineTo(x + size - arrowSize, y + size);
                painter.lineTo(x + size, y + size - arrowSize);
            } else {
                painter.moveTo(x, y);
                painter.lineTo(x + arrowSize, y);
                painter.lineTo(x, y + arrowSize);
            }
            break;
        case grid._.direct.match(/F|B/) != null:
            painter.moveTo(x + halfSize, y);
            painter.lineTo(x + halfSize, y + size);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            if (grid._.direct == "F") {
                painter.moveTo(x + halfSize, y + size);
                painter.lineTo(x + halfSize - arrowSize, y + size - arrowSize);
                painter.lineTo(x + halfSize + arrowSize, y + size - arrowSize);
            } else {
                painter.moveTo(x + halfSize, y);
                painter.lineTo(x + halfSize - arrowSize, y + arrowSize);
                painter.lineTo(x + halfSize + arrowSize, y + arrowSize);
            }
            break;
        case grid._.direct.match(/R|L/) != null:
            painter.moveTo(x, y + halfSize);
            painter.lineTo(x + size, y + halfSize);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            if (grid._.direct == "R") {
                painter.moveTo(x, y + halfSize);
                painter.lineTo(x + arrowSize, y + halfSize + arrowSize);
                painter.lineTo(x + arrowSize, y + halfSize - arrowSize);
            } else {
                painter.moveTo(x + size, y + halfSize);
                painter.lineTo(x + size - arrowSize, y + halfSize - arrowSize);
                painter.lineTo(x + size - arrowSize, y + halfSize + arrowSize);
            }
            break;
    }
    painter.fill();
    painter.closePath();
});
board.setStatusMark("status", "arrow", function (painter, size, x, y, grid) {
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
    painter.beginPath();
    switch (grid._.direct) {
        case "F":
            painter.arc(x + halfSize, y + halfSize, halfSize * 0.75, 0 * Math.PI, 1 * Math.PI);
            break;
        case "B":
            painter.arc(x + halfSize, y + halfSize, halfSize * 0.75, 1 * Math.PI, 2 * Math.PI);
            break;
        case "R":
            painter.arc(x + halfSize, y + halfSize, halfSize * 0.75, 0.5 * Math.PI, 1.5 * Math.PI);
            break;
        case "L":
            painter.arc(x + halfSize, y + halfSize, halfSize * 0.75, 1.5 * Math.PI, 0.5 * Math.PI);
            break;
        case "FR":
            painter.arc(x + halfSize, y + halfSize, halfSize * 0.75, 0.25 * Math.PI, 1.25 * Math.PI);
            break;
        case "FL":
            painter.arc(x + halfSize, y + halfSize, halfSize * 0.75, 1.75 * Math.PI, 0.75 * Math.PI);
            break;
        case "BR":
            painter.arc(x + halfSize, y + halfSize, halfSize * 0.75, 0.75 * Math.PI, 1.75 * Math.PI);
            break;
        case "BL":
            painter.arc(x + halfSize, y + halfSize, halfSize * 0.75, 1.25 * Math.PI, 0.25 * Math.PI);
            break;
    }
    painter.stroke();
    painter.closePath();
    painter.beginPath();
    switch (true) {
        case grid._.direct.match(/F|B|R|L/) != null && grid._.direct.length == 1:
            painter.moveTo(x + halfSize, y);
            painter.lineTo(x + halfSize, y + size);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            painter.moveTo(x, y + halfSize);
            painter.lineTo(x + size, y + halfSize);
            break;
        default:
            painter.moveTo(x, y);
            painter.lineTo(x + size, y + size);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            painter.moveTo(x, y + size);
            painter.lineTo(x + size, y);
    }
    painter.stroke();
    painter.closePath();
});