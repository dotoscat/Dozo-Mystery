'use strict';

const WIDTH = 640;
const HEIGHT = 480;

let puzzles = {};
let puzzleName = null;
let currentPuzzle = null;
let button = null;

function getRandomInteger(min, max){
  return Math.floor( Math.random() * (max - min) + min );
}

function setPuzzle(puzzle){
  if (currentPuzzle !== null) {
    currentPuzzle.hide();
  }
  currentPuzzle = puzzle;
  currentPuzzle.show();
  puzzleName.setText(puzzle.getName());
}

function preload(){
  game.load.image('buttonBackground', 'buttonBackground.png');
  game.load.image('psmile', 'psmile.png');
  game.load.image('cat', 'cat.png');
  game.load.image('puzzleBackground', 'puzzleBackground.png');
}

function create(){
  let mainPuzzle = new Puzzle('a smile', 'psmile', 32, 32);
  puzzles['mainPuzzle'] = mainPuzzle;
  mainPuzzle.resetCurrentPieces();
  mainPuzzle.randomizePieces();
  mainPuzzle.setPosition(128, 128);
  puzzleName = game.add.text(0, 0, '', {fill: 'white'});
  setPuzzle(mainPuzzle);
  button = new Button(250, 250, 'buttonBackground',
  () => {console.log("hello...");}, "Push me!");
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
