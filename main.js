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

const WIDTH = 640;
const HEIGHT = 480;

let images = {};

function preload(){
  console.log('preload');
  game.load.image('psmile', 'psmile.png');

}

function create(){
  console.log('create');
  let aPiece = game.add.sprite(0,0, 'psmile');
  let rectangle = new Phaser.Rectangle(0, 0, 32, 32);
  aPiece.crop(rectangle);
  aPiece.updateCrop();
  //images['psmile'] = game.add.image('psmile');
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
