'use strict';

var AV = AV || {};

AV.BLOCK = (function() {
  var draw = function(x, y, color) {
    AV.main.ctx.fillStyle = color;
    AV.main.ctx.fillRect(
      x*AV.consts.cellSize-0.5,
      y*AV.consts.cellSize-0.5,
      AV.consts.cellSize,
      AV.consts.cellSize
    );
  };

  return {
    draw: draw
  }
})();
