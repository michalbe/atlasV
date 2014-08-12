'use strict';

var AV = AV || {};

AV.consts = {
  cellSize: 30,
  cellsX: 9,
  cellsY: 15,
  get totalWidth() { return AV.consts.cellSize * AV.consts.cellsX; },
  get totalHeight() { return AV.consts.cellSize * AV.consts.cellsY; }
};
