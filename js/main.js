'use strict';

var AV = AV || {};

AV.main = (function() {
  var blocks = [];
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

  var block;

  var init = function() {
    canvas.width = AV.consts.totalWidth;
    canvas.height = AV.consts.totalHeight;
    createNewBlock();
    tick();
  };

  var clearCanvas = function(){
    ctx.clearRect(0, 0, AV.consts.totalWidth, AV.consts.totalHeight);
    drawGrid();
  };

  var tick = function() {
    clearCanvas();
    block.update();
    block.draw();
    requestAnimationFrame(tick);
    blocks.forEach(function(b){
      b.draw();
    });
  };

  var createNewBlock = function() {
    block = new AV.block(
      ~~(Math.random()*AV.consts.cellsX)*AV.consts.cellSize,
      0,
      'rgb(' + ~~(Math.random()*255) +',' +
      ~~(Math.random()*255) +',' + ~~(Math.random()*255) +')'
    );
  };

  var addToStack = function(b) {
    blocks.push(b);
  };

  return {
    init: init,
    ctx: ctx,
    createNewBlock: createNewBlock,
    addToStack: addToStack,
    get blocks() { return blocks; }
  };
})();

AV.main.init();
