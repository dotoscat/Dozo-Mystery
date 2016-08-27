"use strict";

class Piece{
  constructor(){
    this.value = 0;
    this.puzzle = null;
  }

  isPuzzle(){
    return this.puzzle !== null;
  }

}

var game = new Phaser.Game();
