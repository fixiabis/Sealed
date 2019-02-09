var symbols = "OXDUAH";

function createBoard(name, width, height) {
    var board = new GridBoard(width, height);
    var element = document.querySelector(`[board=${name}]`);

    addSkinOn(board);
    board.viewer.width = 40 * width;
    board.viewer.style.margin = "5px";
    element.appendChild(board.viewer);

    return board;
}

function relatiRoute(painter, begin, ...final) {
    painter.beginPath();
    painter.moveTo(begin.x, begin.y);
    for (var final of final) {
        painter.lineTo(final.x, final.y);
    }
    painter.stroke();
    painter.closePath();
}