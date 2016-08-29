'use strict';

const WIDTH = 640;
const HEIGHT = 480;

let puzzles = {};
let puzzleName = null;
let currentPuzzle = null;
let button = null;

function loadLevels(){
  let levelsKeyArray = Object.keys(levels);
  //First create the puzzles
  for (let levelKey of levelsKeyArray){
    let level = levels[levelKey];
    let name = level.name;
    let image = level.image;
    let width = level.width;
    let height = level.height;
    let puzzle = new Puzzle(name, image, width, height);
    puzzle.randomizePieces();
    puzzle.setPosition(128, 128);
    puzzle.hide();
    puzzles[levelKey] = puzzle;
    console.log(level);
  }
  //next set the pieces
}

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
  puzzleName.x = (WIDTH - puzzleName.width) / 2;
}

let images = [
  'buttonBackground',
  'cat',
  'psmile',
  'puzzleBackground'
]

function preload(){
  for (let image of images){
    game.load.image(image, image + '.png');
  }
}

function create(){
  puzzleName = game.add.text(0, 0, '', {fill: 'white'});
  button = new Button(250, 300, 'buttonBackground',
  () => {console.log("hello...");}, "Push me!");
  loadLevels();
  setPuzzle(puzzles['main']);
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
