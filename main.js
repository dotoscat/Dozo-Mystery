'use strict';

const WIDTH = 640;
const HEIGHT = 480;

let images = {};
let mainPuzzle = null;
let catPuzzle = null;

function getRandomInteger(min, max){
  return Math.floor( Math.random() * (max - min) + min );
}

function preload(){
  console.log('preload');
  game.load.image('psmile', 'psmile.png');
  game.load.image('cat', 'cat.png');
  game.load.image('puzzleBackground', 'puzzleBackground.png');
}

function create(){
  console.log('create');
  mainPuzzle = new Puzzle('a smile', 'psmile', 64, 64, 32, 32);
  mainPuzzle.resetCurrentPieces();
  mainPuzzle.randomizePieces(64);
  catPuzzle = new Puzzle('kitty!', 'cat', 255, 64, 32, 32);
  catPuzzle.randomizePieces(64);
  mainPuzzle.getPiece(1,1).setPuzzle(catPuzzle);
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
