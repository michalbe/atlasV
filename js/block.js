'use strict';

var AV = AV || {};

AV.block = function(x, y, color, speed) {
  this.x = x;
  this.y = y;
  this.speedY = speed || 10;
  this.speedX = 0;
  this.color = color;
};

AV.block.prototype.update = function() {
  if (this.y < AV.consts.totalHeight - AV.consts.cellSize) {
    this.y += this.speedY;
  } else {
    AV.main.addToStack(this);
    AV.main.createNewBlock();
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
