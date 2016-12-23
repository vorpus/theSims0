const Canvas = require('./canvas');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');

  canvas.width = Canvas.DIM_X;
  canvas.height = Canvas.DIM_Y;

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = Canvas.BG_COLOR;
  ctx.fillRect(0, 0, Canvas.DIM_X, Canvas.DIM_Y);

  const thisCanvas = new Canvas();

  thisCanvas.draw(ctx);

  function getMousePos(docCanvas, evt) {
    var rect = docCanvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  $('canvas')[0].addEventListener("click", (e) => {
    let clickedPos = getMousePos(e.target, e);
    thisCanvas.clickHandler(clickedPos.x, clickedPos.y);
    thisCanvas.draw(ctx);
  });

})
