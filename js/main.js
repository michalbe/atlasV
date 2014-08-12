'use strict';

var AV = AV || {};

AV.main = (function() {
  var blocks = [];
  var matrix = [];
  for (var i = 0; i< AV.consts.totalWidth; i++) {
    matrix.push([]);
  }

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
    blocks.forEach(function(b){
      b.draw();
    });
    requestAnimationFrame(tick);
  };

  var createNewBlock = function() {
    block = new AV.block(
      ~~(Math.random()*AV.consts.cellsX)*AV.consts.cellSize, 0);
  };

  var calculateMatrixPosition = function(b) {
    var halfSize = ~~(AV.consts.cellSize/2);
    return {
      x: ~~((b.x+halfSize) / AV.consts.cellSize),
      y: ~~((b.y+halfSize) / AV.consts.cellSize)
    };
  };

  var checkWithMatrix = function(b) {
    var coords = calculateMatrixPosition(b);
    matrix[coords.x][coords.y] = b;
    matches = [b];
    checked = [b];
    checkNeighbors(coords.x, coords.y);
    console.log(matches);
  };

  var matches = [];
  var checked = [];
  var checkNeighbors = function(x, y) {

    var current = matrix[x][y];
    var currentType = current.type;

    var result = {
      up: 0,
      down: 0,
      left: 0,
      right: 0
    };

    if (x > 0 && matrix[x-1][y] && checked.indexOf(matrix[x-1][y]) === -1) {
      if (currentType === matrix[x-1][y].type) {
        matches.push(matrix[x-1][y]);
        checked.push(matrix[x-1][y]);
        checkNeighbors(x-1, y);
      }
    }

    if (y > 0 && matrix[x][y-1] && checked.indexOf(matrix[x][y-1]) === -1) {
      if (currentType === matrix[x][y-1].type) {
        matches.push(matrix[x][y-1]);
        checked.push(matrix[x][y-1]);
        checkNeighbors(x, y-1);
      }
    }

    if (x < AV.consts.cellsX && matrix[x+1][y] && checked.indexOf(matrix[x+1][y]) === -1) {
      if (currentType === matrix[x+1][y].type) {
        matches.push(matrix[x+1][y]);
        checked.push(matrix[x+1][y]);
        checkNeighbors(x+1, y);
      }
    }

    if (y < AV.consts.cellsY && matrix[x][y+1] && matches.indexOf(matrix[x][y+1]) === -1) {
      if (currentType === matrix[x][y+1].type) {
        matches.push(matrix[x][y+1]);
        checked.push(matrix[x][y+1]);
        checkNeighbors(x, y+1);
      }
    }
    return matches;
  };

  var addToStack = function(b) {
    blocks.push(b);
  };

  return {
    init: init,
    ctx: ctx,
    createNewBlock: createNewBlock,
    addToStack: addToStack,
    checkWithMatrix: checkWithMatrix,
    get blocks() { return blocks; }
  };
})();

AV.main.init();
