const Canvas = require('./canvas');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');

  canvas.width = Canvas.DIM_X;
  canvas.height = Canvas.DIM_Y;
  canvas.speed = 600;

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

  $('canvas')[0].addEventListener("mousemove", (e) => {
    let clickedPos = getMousePos(e.target, e);
    thisCanvas.hoverHandler(clickedPos.x, clickedPos.y, ctx);
  });

  $('.one-step').on('click', () => {
    thisCanvas.processConway(ctx, 1);
    thisCanvas.draw(ctx);
  });





  let intervalName;
  $('.step-play').on('click', () => {
    $('.play-active').toggleClass('hidden');

    if (intervalName) {
      clearInterval(intervalName);
      intervalName = null;
    } else {
      intervalName = setInterval(() => {
        thisCanvas.processConway(ctx, 1);
        thisCanvas.draw(ctx);
      }, canvas.speed);
    }
  });

  $('.pick-still-life').on('click', () => {
    $('.still-life-select').removeClass('hidden');
    $('.oscillator-select').addClass('hidden');
    $('.spaceship-select').addClass('hidden');
    $('.generator-select').addClass('hidden');
  });

  $('.pick-oscillator').on('click', () => {
    $('.still-life-select').addClass('hidden');
    $('.oscillator-select').removeClass('hidden');
    $('.spaceship-select').addClass('hidden');
    $('.generator-select').addClass('hidden');
  });

  $('.pick-spaceship').on('click', () => {
    $('.still-life-select').addClass('hidden');
    $('.oscillator-select').addClass('hidden');
    $('.spaceship-select').removeClass('hidden');
    $('.generator-select').addClass('hidden');
  });

  $('.pick-generator').on('click', () => {
    $('.still-life-select').addClass('hidden');
    $('.oscillator-select').addClass('hidden');
    $('.spaceship-select').addClass('hidden');
    $('.generator-select').removeClass('hidden');
  });

  $('.template-clickable').on('click', (e) => {
    thisCanvas.setTemplate(e.target.attributes.data.nodeValue);
  });

  $('.clear-all').on('click', (e) => {
    thisCanvas.clearCells();
    thisCanvas.draw(ctx);
  });

  $('#speed-picker').on('change', (e) => {
    $('.play').removeClass('hidden');
    $('.stop').addClass('hidden');
    clearInterval(intervalName);
    intervalName = null;
    canvas.speed = 1000 - 10*parseInt(e.target.value);
  })

})
