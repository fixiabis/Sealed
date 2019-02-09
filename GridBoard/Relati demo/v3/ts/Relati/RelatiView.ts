namespace Relati {
    var gridSize = 5;

    export class RelatiView {
        public boardView: SVGSVGElement;
        public boardViewBackground: SVGGElement;
        public boardViewGridLines: SVGGElement;

        constructor(public board: RelatiBoard) {
            var { width, height } = board;

            var boardView = createSVG("svg", {
                "width": `${width * gridSize}`,
                "height": `${height * gridSize}`
            });

            var boardViewBackground = createSVG("g");
            boardView.appendChild(boardViewBackground);

            var boardViewGridLines = createSVG("g");
            var gridLineAttr = {
                
            };

            for (var x = 1; x < width; x++) {
            }

            this.boardView = boardView;
            this.boardViewGridLines = boardViewGridLines;
            this.boardViewBackground = boardViewBackground;
        }
    }
}