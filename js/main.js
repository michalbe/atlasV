'use strict';

var AV = AV || {};

AV.main = (function() {
   var canvas = document.getElementById('canvas');
   var ctx = canvas.getContext('2d');

  var drawGrid = function() {
    var start = 0;
    // vertical
    for (var i = 0; i < AV.consts.cellsX; i++) {
      ctx.beginPath();
      ctx.moveTo(start-0.5, 0);
      ctx.lineTo(start-0.5, AV.consts.totalHeight);
      ctx.stroke();
      start += AV.consts.cellSize;
    }

    start = 0;
    //horizontal
    for (i = 0; i < AV.consts.cellsY; i++) {
      ctx.beginPath();
      ctx.moveTo(0, start-0.5);
      ctx.lineTo(AV.consts.totalWidth, start-0.5);
      ctx.stroke();
      start += AV.consts.cellSize;
    }
  };
  var init = function() {
    canvas.width = AV.consts.totalWidth;
    canvas.height = AV.consts.totalHeight;
    tick();
  };

  var clearCanvas = function(){
    ctx.clearRect(0, 0, AV.consts.totalWidth, AV.consts.totalHeight);
    drawGrid();
  };

  var tick = function() {
    clearCanvas();
    //requestAnimationFrame(tick);
  };

  var drawBlock = function(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(
      x*AV.consts.cellSize-0.5,
      y*AV.consts.cellSize-0.5,
      AV.consts.cellSize,
      AV.consts.cellSize
    );
  };

  return {
    init: init,
    drawBlock: drawBlock
  };
})();

AV.main.init();
