interface GridBoardLayout {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    views: GridBoardView[];
    render(): void;
}

class GridBoardLayout implements GridBoardLayout {
    public canvas = document.createElement("canvas");
    public context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    public views: GridBoardView[] = [];

    constructor() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    render() {
        setInterval(function (this: GridBoardLayout) {
            for (var view of this.views) {
                view.render(this);
            }
        }.bind(this), 20);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

interface GridBoardView {
    render(layout: GridBoardLayout): void;
}