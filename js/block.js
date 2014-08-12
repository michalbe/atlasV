'use strict';

var AV = AV || {};

AV.block = function(x, y, color, speed) {
  this.x = x;
  this.y = y;
  this.speedY = speed || 10;
  this.speedX = 0;
  this.color = color;
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
