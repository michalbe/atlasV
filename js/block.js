var BLOCK = (function() {
  var drawBlock = function(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*cellSize-0.5, y*cellSize-0.5, cellSize, cellSize);
  };

  return {
    draw: drawBlock
  }
})();
