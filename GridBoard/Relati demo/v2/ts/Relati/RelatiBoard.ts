namespace Relati {
    export interface RelatiBoard {
        grids: RelatiGrid[][];
        gridList: RelatiGrid[];
        query(directionCommand: string): RelatiGrid;
        queries(directionCommands: string): RelatiGrid[];
    }

    export class RelatiBoard extends GridBoard {
        constructor(public width: number, public height: number, public gridSize: number) {
            super(width, height);
            this.gridList = [];

            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var grid = new RelatiGrid(this, x, y);
                    this.grids[x][y] = grid;
                    this.gridList.push(grid);
                }
            }

            this.view = createSVG("svg", {
                width: `${width * gridSize}`,
                height: `${height * gridSize}`
            });
        }

        private addBackground() {
            var backgroundView = createSVG("g");
            this.view.appendChild(backgroundView);
        }

        private drawGridLine() {
            var { width, height, gridSize } = this;
            var lineContainer = createSVG("g");
            var lineColor = "#888";
            var lineWidth = "0.2";
            var lineAttribute = {
                "stroke": lineColor,
                "stroke-width": lineWidth,
                "d": ""
            };

            for (var x = 1; x < width; x++) {
                var linePositionX = x * gridSize;
                var linePositionY = 0;
                var lineLength = height * gridSize;

                lineAttribute["d"] = (
                    `M ${linePositionX} ${linePositionY}` +
                    `v ${lineLength}`
                );

                var line = createSVG("path", lineAttribute);
                lineContainer.appendChild(line);
            }

            for (var y = 1; y < height; y++) {
                var linePositionX = 0;
                var linePositionY = y * gridSize;
                var lineLength = width * gridSize;

                lineAttribute["d"] = (
                    `M ${linePositionX} ${linePositionY}` +
                    `h ${lineLength}`
                );

                var line = createSVG("path", lineAttribute);
                lineContainer.appendChild(line);
            }

            this.view.appendChild(lineContainer);
        }

        viewInitialize(container: Element) {
            this.addBackground();
            this.drawGridLine();

            for (var grid of this.gridList) {
                this.view.appendChild(grid.view);
            }

            this.viewResize(
                container.clientWidth,
                container.clientHeight
            );

            container.appendChild(this.view);
            window.addEventListener("resize", function (this: RelatiBoard) {
                this.viewResize(
                    container.clientWidth,
                    container.clientHeight
                );
            }.bind(this));

            container.appendChild(this.view);
        }

        viewResize(containerWidth: number, containerHeight: number) {
            var { gridSize } = this;
            var boardViewWidth = this.width * gridSize;
            var boardViewHeight = this.height * gridSize;

            var widthScalingRatio = containerWidth / boardViewWidth;
            var heightScalingRatio = containerHeight / boardViewHeight;
            var scalingRatio = Math.min(
                widthScalingRatio,
                heightScalingRatio
            );

            scalingRatio *= 0.95;
            this.view.style.transform = `scale(${scalingRatio})`;
        }
    }
}