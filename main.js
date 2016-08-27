"use strict";

class Piece{
  constructor(x, y, width, height, imageKey){
    this.value = 0;
    this.fromPuzzle = null;
    this.puzzle = null;
    this.sprite = game.add.sprite(0,0, imageKey);
    let rectangle = new Phaser.Rectangle(x, y, width, height);
    this.sprite.crop(rectangle);
    this.sprite.updateCrop();
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag(true);
    this.sprite.data = this;
  }

  isPuzzle(){
    return this.puzzle !== null;
  }

}

const WIDTH = 640;
const HEIGHT = 480;

let images = {};

function preload(){
  console.log('preload');
  game.load.image('psmile', 'psmile.png');

}

function create(){
  console.log('create');
  new Piece(0, 0, 32, 32, 'psmile');
  new Piece(32, 0, 32, 32, 'psmile');
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
