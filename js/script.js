'use strict';

var AV = (function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var cellSize = 30;
  var cellsX = 10;
  var cellsY = 15;
  var totalWidth;
  var totalHeight;
  canvas.width = totalWidth = cellSize * cellsX;
  canvas.height = totalHeight = cellSize * cellsY;

  var drawGrid = function() {
    var start = 0;
    // vertical
    for (var i = 0; i < cellsX; i++) {
      ctx.beginPath();
      ctx.moveTo(start-0.5, 0);
      ctx.lineTo(start-0.5, totalHeight);
      ctx.stroke();
      start += cellSize;
    }

    start = 0;
    //horizontal
    for (i = 0; i < cellsY; i++) {
      ctx.beginPath();
      ctx.moveTo(0, start-0.5);
      ctx.lineTo(totalWidth, start-0.5);
      ctx.stroke();
      start += cellSize;
    }
  };
  var init = function(){
    drawGrid();
  };

  return {
    init: init
  };
})();

AV.init();
