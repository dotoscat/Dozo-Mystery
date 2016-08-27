"use strict";

class Piece{
  constructor(x, y, width, height, imageKey, fromPuzzle){
    this.value = 0;
    this.fromPuzzle = fromPuzzle;
    this.puzzle = null;
    this.sprite = game.add.sprite(x, y, imageKey);
    let rectangle = new Phaser.Rectangle(x, y, width, height);
    this.sprite.crop(rectangle);
    this.sprite.updateCrop();
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag(true);
    this.sprite.input.bringToTop = true;
    this.sprite.input.useHandCursor = true;
    this.sprite.data = this;
  }

  isPuzzle(){
    return this.puzzle !== null;
  }

}

class Puzzle{
  constructor(imageKey, width, height){
    //width and height are the size of the piece
    let image = game.cache.getImage(imageKey);
    let imageWidth = image.width;
    let imageHeight = image.height;
    let widthPiece = imageWidth / width;
    let heightPiece = imageHeight / width;
    this.pieces = new Array(imageHeight);
    let pieces = this.pieces;
    for(let y = 0; y < heightPiece; y++){
      pieces[y] = new Array(imageWidth);
      for(let x = 0; x < widthPiece; x++){
        pieces[y][x] = new Piece(width*x, width*y, width, height, imageKey, this);
      }
    }
  }

  getPiece(x, y){
    return this.pieces[y][x];
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
  new Puzzle('psmile', 32, 32);
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
