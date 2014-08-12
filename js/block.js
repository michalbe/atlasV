'use strict';

var AV = AV || {};

AV.block = function(x, y, color) {
  this.x = x;
  this.y = y;
  this.speedY = 4;
  this.speedX = 0;
  this.color = color;
};

AV.block.prototype.update = function() {
  if (this.y < AV.consts.totalHeight - AV.consts.cellSize) {
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
