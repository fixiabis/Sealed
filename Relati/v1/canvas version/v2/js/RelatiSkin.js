function addSkinOn(board, game) {
    board.addGridMark(
        grid => grid.status === "normal",
        painter => painter.strokeStyle = "black"
    );
    board.addGridMark(
        grid => grid.status === "select",
        painter => painter.strokeStyle = "green"
    );
    board.addGridMark(
        grid => grid.status === "forbid",
        painter => painter.strokeStyle = "red"
    );
    board.addGridMark(
        grid => grid.status === "source",
        function (painter, x, y, size) {
            painter.lineWidth = 2;
            painter.beginPath();
            painter.moveTo(x + size * 0.1, y + size * 0.1);
            painter.lineTo(x + size * 0.1, y + size * 0.9);
            painter.lineTo(x + size * 0.9, y + size * 0.9);
            painter.stroke();
            painter.closePath();
        }
    );
    board.addGridMark(
        grid => grid.status === "broken",
        function (painter, x, y, size) {
            painter.strokeStyle = "brown";
            painter.lineWidth = 2;
            painter.beginPath();
            painter.moveTo(x + size * 0.8, y);
            painter.lineTo(x, y + size * 0.8);
            painter.stroke();
            painter.closePath();
            painter.beginPath();
            painter.moveTo(x + size * 0.2, y + size);
            painter.lineTo(x + size, y + size * 0.2);
            painter.stroke();
            painter.closePath();
            painter.strokeStyle = "black";
        }
    );
    board.addGridMark(
        grid => grid.status === "shield",
        function (painter, x, y, size) {
            painter.strokeStyle = "blue";
            painter.lineWidth = 2;
            painter.beginPath();
            painter.moveTo(x + size * 0.1, y + size * 0.1);
            painter.lineTo(x + size * 0.1, y + size * 0.8);
            painter.lineTo(x + size * 0.5, y + size * 0.9);
            painter.lineTo(x + size * 0.9, y + size * 0.8);
            painter.lineTo(x + size * 0.9, y + size * 0.1);
            painter.stroke();
            painter.closePath();
            painter.strokeStyle = "black";
        }
    );
    board.addGridMark(
        function (grid) {
            if (!game) return false;
            return board.history[board.history.length - 1] === grid.crd;
        },
        painter => painter.strokeStyle = "blue"
    );
    board.addGridMark(
        grid => grid.symbol === "O",
        function (painter, x, y, size) {
            painter.lineWidth = 2;
            painter.beginPath();
            painter.arc(x + size / 2, y + size / 2, (size / 2) * 0.6, 0, Math.PI * 2);
            painter.closePath();
            painter.stroke();
        }
    );
    board.addGridMark(
        grid => grid.symbol === "X",
        function (painter, x, y, size) {
            painter.lineWidth = 2;
            painter.beginPath();
            painter.moveTo(x + size * 0.2, y + size * 0.2);
            painter.lineTo(x + size * 0.8, y + size * 0.8);
            painter.closePath();
            painter.stroke();
            painter.beginPath();
            painter.moveTo(x + size * 0.8, y + size * 0.2);
            painter.lineTo(x + size * 0.2, y + size * 0.8);
            painter.closePath();
            painter.stroke();
        }
    );
    board.addGridMark(
        grid => grid.symbol === "D",
        function (painter, x, y, size) {
            painter.lineWidth = 2;
            painter.beginPath();
            painter.moveTo(x + size * 0.5, y + size * 0.2);
            painter.lineTo(x + size * 0.8, y + size * 0.8);
            painter.lineTo(x + size * 0.2, y + size * 0.8);
            painter.closePath();
            painter.stroke();
        }
    );
    board.addGridMark(
        grid => grid.symbol === "U",
        function (painter, x, y, size) {
            painter.lineWidth = 2;
            painter.beginPath();
            painter.moveTo(x + size * 0.2, y + size * 0.2);
            painter.lineTo(x + size * 0.2, y + size * 0.8);
            painter.lineTo(x + size * 0.8, y + size * 0.8);
            painter.lineTo(x + size * 0.8, y + size * 0.2);
            painter.closePath();
            painter.stroke();
        }
    );
    board.addGridMark(
        grid => grid.symbol === "A",
        function (painter, x, y, size) {
            var r = (size / 2) * 0.6;
            painter.lineWidth = 2;

            painter.beginPath();
            painter.moveTo(
                x + size / 2 + Math.cos((2 / 5 * 1 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 5 * 1 + 0.5) * Math.PI) * r
            );
            painter.lineTo(
                x + size / 2 + Math.cos((2 / 5 * 4 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 5 * 4 + 0.5) * Math.PI) * r
            );
            painter.lineTo(
                x + size / 2 + Math.cos((2 / 5 * 2 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 5 * 2 + 0.5) * Math.PI) * r
            );
            painter.lineTo(
                x + size / 2 + Math.cos((2 / 5 * 0 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 5 * 0 + 0.5) * Math.PI) * r
            );
            painter.lineTo(
                x + size / 2 + Math.cos((2 / 5 * 3 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 5 * 3 + 0.5) * Math.PI) * r
            );
            painter.closePath();
            painter.stroke();
        }
    );
    board.addGridMark(
        grid => grid.symbol === "H",
        function (painter, x, y, size) {
            var r = (size / 2) * 0.6;
            painter.lineWidth = 2;

            painter.beginPath();
            painter.moveTo(
                x + size / 2 + Math.cos((2 / 6 * 1 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 6 * 1 + 0.5) * Math.PI) * r
            );
            painter.lineTo(
                x + size / 2 + Math.cos((2 / 6 * 5 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 6 * 5 + 0.5) * Math.PI) * r
            );
            painter.lineTo(
                x + size / 2 + Math.cos((2 / 6 * 3 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 6 * 3 + 0.5) * Math.PI) * r
            );
            painter.closePath();
            painter.stroke();
            painter.beginPath();
            painter.moveTo(
                x + size / 2 + Math.cos((2 / 6 * 2 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 6 * 2 + 0.5) * Math.PI) * r
            );
            painter.lineTo(
                x + size / 2 + Math.cos((2 / 6 * 6 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 6 * 6 + 0.5) * Math.PI) * r
            );
            painter.lineTo(
                x + size / 2 + Math.cos((2 / 6 * 4 + 0.5) * Math.PI) * r,
                y + size / 2 - Math.sin((2 / 6 * 4 + 0.5) * Math.PI) * r
            );
            painter.closePath();
            painter.stroke();
        }
    );
    board.addGridMark(
        () => true,
        painter => painter.strokeStyle = "black"
    );
}