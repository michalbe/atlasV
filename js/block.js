'use strict';

var AV = AV || {};
var colors = ['#FF0000', '#00FF00', '#0000FF', '#CCCCCC'];

AV.block = function(x, y, speed) {
  this.x = x-0.5;
  this.y = y;
  this.speedY = speed || 3;
  this.speedX = 0;
  this.type = ~~(Math.random()*2);
  this.color = colors[this.type];
  this.size = AV.consts.cellSize;
};

AV.block.prototype.update = function() {
  var c = false;
  var blocks = AV.main.blocks;
  for (var i=0, l = blocks.length; i<l; i++) {
    if (this.collidesWith(blocks[i])) {
      c = true;
      break;
    }
  }

  if (this.y >= AV.consts.totalHeight - this.size || c) {
    this.y = (~~(this.y/this.size))*this.size;
    AV.main.checkWithMatrix(this);
    AV.main.addToStack(this);
    AV.main.createNewBlock();
  } else {
    this.y += this.speedY;
  }

  this.x += this.speedX;
};

AV.block.prototype.draw = function() {
  AV.main.ctx.fillStyle = this.color;
  AV.main.ctx.fillRect(
    this.x,
    this.y,
    AV.consts.cellSize,
    AV.consts.cellSize
  );
};

AV.block.prototype.collidesWith = function(block) {
  if (this.x < block.x + block.size &&
   this.x + this.size > block.x &&
   this.y < block.y + block.size &&
   this.size + this.y > block.y) {
    return true;
  } else {
    return false;
  }
};
