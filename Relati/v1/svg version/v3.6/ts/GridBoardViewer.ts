interface GridBoardViewer {
    body: SVGSVGElement;
    views: GridBoardView[];
    render(): void;
}

class GridBoardViewer implements GridBoardViewer {
    public views: GridBoardView[] = [];
    constructor(public board: GridBoard, public body: SVGSVGElement) { }

    appendView(view: GridBoardView) {
        this.views.push(view);
    }

    removeView(view: GridBoardView) {
        this.views = this.views.filter(v => v != view);
    }

    appendIn(container: HTMLElement) {
        var {board, body} = this;
        container.appendChild(body);

        updateSVG(body, {
            "width": `${board.width * 5}`,
            "height": `${board.height * 5}`
        });
        
        body.style.transform = `scale(${Math.min(
            container.clientWidth / (board.width * 5),
            container.clientHeight / (board.height * 5)
        ) * 0.95})`;

        window.addEventListener("resize", function (this: GridBoardViewer) {
            this.body.style.transform = `scale(${Math.min(
                container.clientWidth / (this.board.width * 5),
                container.clientHeight / (this.board.height * 5)
            ) * 0.95})`;
        }.bind(this));
    }

    render() {
        setInterval(async function (this: GridBoardViewer) {
            while (this.body.childNodes.length > 0) {
                this.body.removeChild(this.body.childNodes[0]);
            }

            for (var view of this.views) {
                view.render(this.body);
            }
        }.bind(this), 25);
    }
}

interface GridBoardView {
    status: number;
    render(viewer: SVGSVGElement): void;
}

class GridBoardView implements GridBoardView {
    constructor(public status = 0) { }
    render(viewer: SVGSVGElement): void { }
}