const CanvasUtils = (function(){
    let ctx;
    
    function disk(x, y, r, ctx = ctx) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }

    function circle(x, y, r, ctx = ctx) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function line(x1, y1, x2, y2, ctx = ctx) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function fill(color, ctx = ctx) {
        ctx.fillStyle = color;
    }

    function stroke(color, ctx = ctx) {
        ctx.strokeStyle = color;
    }

   
    return {
        setContext: _ctx => ctx = _ctx,
        disk,
        circle,
        line, 
        fill,
        stroke
    }
})();