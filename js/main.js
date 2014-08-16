'use strict';

var AV = AV || {};

AV.main = (function() {
  var STATE = 1;
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

  var ticks = 0;
  var tick = function() {
    ticks++;
    clearCanvas();
    block.update();
    block.draw();
    blocks.forEach(function(b){
      // I know it makes no sense at all, but it's 4 AM and it works. Kind of.
      b.update();
      b.update();
      b.draw();
    });

    if (STATE) {
      requestAnimationFrame(tick);
    }
  };

  var recalculateMatrix = function(){
    matrix = [];
    for (var i = 0; i< AV.consts.totalWidth; i++) {
      matrix.push([]);
    }
    blocks.forEach(function(b){
      var coords = calculateMatrixPosition(b);
      matrix[coords.x][coords.y] = b;
    });
  };

  var createNewBlock = function(projectile) {
    if (!projectile) {
      block = new AV.block(
        ~~(Math.random()*AV.consts.cellsX)*AV.consts.cellSize, 0);
    } else {
      var pr = blocks.push(new AV.block(0, 150));
      blocks[pr-1].speedX = 8;
      blocks[pr-1].speedY = 1;
    }
    recalculateMatrix();
  };

  var calculateMatrixPosition = function(b) {
    var halfSize = ~~(AV.consts.cellSize/2);
    return {
      x: ~~((b.x+halfSize) / AV.consts.cellSize),
      y: ~~((b.y+halfSize) / AV.consts.cellSize)
    };
  };

  var checkWithMatrix = function(b, active) {
    var coords = calculateMatrixPosition(b);
    matrix[coords.x][coords.y] = b;
    matches = [b];
    checkNeighbors(coords.x, coords.y);
    if (matches.length > 2) {
      matches.forEach(function(m) {
        var coo = calculateMatrixPosition(m);
        delete matrix[coo.x][coo.y];
      });
      blocks = blocks.filter(function(b) {
        return matches.indexOf(b) === -1;
      });
    }
  };

  var matches = [];
  //var checked = [];
  var checkNeighbors = function(x, y) {

    var current = matrix[x][y];
    var currentType = current.type;

    if (x > 0 && matrix[x-1][y] && matches.indexOf(matrix[x-1][y]) === -1) {
      if (currentType === matrix[x-1][y].type) {
        matches.push(matrix[x-1][y]);
        //matrix[x-1][y].type = 2;
        checkNeighbors(x-1, y);
      }
    }

    if (y > 0 && matrix[x][y-1] && matches.indexOf(matrix[x][y-1]) === -1) {
      if (currentType === matrix[x][y-1].type) {
        matches.push(matrix[x][y-1]);
        //matrix[x][y-1].type = 2;
        checkNeighbors(x, y-1);
      }
    }

    if (x < AV.consts.cellsX && matrix[x+1][y] &&
      matches.indexOf(matrix[x+1][y]) === -1) {
      if (currentType === matrix[x+1][y].type) {
        matches.push(matrix[x+1][y]);
        //matrix[x+1][y].type = 2;
        checkNeighbors(x+1, y);
      }
    }

    if (y < AV.consts.cellsY && matrix[x][y+1] &&
      matches.indexOf(matrix[x][y+1]) === -1) {
      if (currentType === matrix[x][y+1].type) {
        matches.push(matrix[x][y+1]);
        //matrix[x][y+1].type = 2;
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
    get matrix() { return matrix; },
    checkWithMatrix: checkWithMatrix,
    get blocks() { return blocks; },
    get STATE() { return STATE; },
    set STATE(s) { STATE = s; if (s===1) { requestAnimationFrame(tick); } }
  };
})();

AV.main.init();
