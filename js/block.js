'use strict';

var AV = AV || {};
var colors = ['#FF0000', '#00FF00', '#0000FF', '#CCCCCC'];

AV.block = function(x, y, speed) {
  this.x = x-0.5;
  this.y = y;
  this.speedY = speed || 6;
  this.speedX = 0;
  this.type = ~~(Math.random()*3);
  this.color = colors[this.type];
  this.size = AV.consts.cellSize;
  this.active = true;
  this.collides = false;
};

AV.block.prototype.checkCollision = function(){
  this.collides = false;
  var blocks = AV.main.blocks;
  for (var i=0, l = blocks.length; i<l; i++) {
    if (this !== blocks[i] && this.collidesWith(blocks[i])) {
      this.colw = i;
      this.collides = true;
      break;
    }
  }
};

AV.block.prototype.update = function() {
  this.checkCollision();
  //if (this.y >= AV.consts.totalHeight - this.size || this.collides) {
  if (this.y >= AV.consts.totalHeight - this.size || this.collides) {
    this.y = (~~(this.y/this.size))*this.size;
    if (this.active) {
      if (this.collides && AV.main.blocks[this.colw].pr) {
        // collision with projectile
        this.speedX = AV.main.blocks[this.colw].speedX = 3;
      } else {
        AV.main.addToStack(this);
      }
    } else {
      this.speedX = 0;
      this.speedY = 6;
    }

    AV.main.checkWithMatrix(this);

    if (this.active) {
      AV.main.createNewBlock();
      this.active = false;
    }
  } else {
    this.y += this.speedY;
  }

  if (this.x > AV.consts.totalWidth - this.size) {
    this.x = (~~(this.x/this.size))*this.size;
    this.speedX = 0;
    this.speedY = 6;
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
