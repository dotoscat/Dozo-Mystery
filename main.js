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
  game.load.image('buttonBackground', 'buttonBackground.png');
  game.load.image('psmile', 'psmile.png');
  game.load.image('cat', 'cat.png');
  game.load.image('puzzleBackground', 'puzzleBackground.png');
}

function create(){
  console.log('create');
  mainPuzzle = new Puzzle('a smile', 'psmile', 32, 32);
  mainPuzzle.resetCurrentPieces();
  mainPuzzle.randomizePieces();
  mainPuzzle.setPosition(128, 128);
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
