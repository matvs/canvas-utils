const CanvasUtils = (function () {
    const defaultMode = '2d';
    class CanvasUtilsService {
        constructor(canvas, mode = defaultMode) {
            if (!canvas) {
                throw Error('Canvas cannot be null. No canvas found');
            }
            this.canvas = canvas;
            this.ctx = canvas.getContext(mode);
        }

        disk(x, y, r) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        circle(x, y, r) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.stroke();
        }

        line(x1, y1, x2, y2) {
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }

        point(x,y) {
            this.disk(x,y,1);
        }

        triangle(x1, y1, x2, y2, x3, y3) {
            this.polygon(x1, y1, x2, y2, x3, y3)
        }

        polygon(...args) {
            if (args.length === 1 && Array.isArray(args[0])) {
                args = args[0];
            }
            if (args.length < 6 || args.length % 2 === 1) {
                throw Error('Wrong number of arguments');
            }
            this.ctx.beginPath();
            this.ctx.moveTo(args[0],args[1]);
            for (let i = 2; i < args.length - 1; i += 2) {
                this.ctx.lineTo(args[i], args[i + 1]);
            }
            this.ctx.closePath();
            this.ctx.stroke();
        }

        setFill(color) {
            this.ctx.fillStyle = color;
        }

        setStroke(color) {
            this.ctx.strokeStyle = color;
        }

        setLineWidth(width = 1) {
            this.ctx.lineWidth = width;
        }

        setFont(fontSize = 10, fontFamily = 'sans-serif') {
            this.ctx.font = `${fontSize}px ${fontFamily}`;
        }

        text(content, x, y, maxWidth) {
            ctx.fillText(content, x, y, maxWidth)
        }

        square(x, y, size) {
            this.rect(x, y, size, size);
        }

        squarePerimeter(x, y, size) {
            this.rectPerimeter(x, y, size, size);
        }

        rect(x, y, width, height) {
            this.ctx.fillRect(x, y, width, height);
        }

        rectPerimeter(x, y, width, height) {
            this.ctx.strokeRect(x, y, width, height);
        }

        clear(x = 0, y = 0, width = this.canvas.width, height = this.canvas.height) {
            this.ctx.clearRect(x, y, width, height)
        }

        push() {
            this.ctx.save();
        }

        pop() {
            this.ctx.restore()
        }
    }

    return {
        fromCanvas: (canvas, mode = defaultMode) => new CanvasUtilsService(canvas, mode),
        fromId: (canvasId, mode = defaultMode) => new CanvasUtilsService(document.getElementById(canvasId), mode),
        addCanvas: (width, height, root = document.body, mode = defaultMode) => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            root.appendChild(canvas);
            return new CanvasUtilsService(canvas, mode); 
        }
    }
})();

