'use strict';

const WIDTH = 640;
const HEIGHT = 480;

let puzzles = {};
let puzzleName = null;
let mainPuzzle = null;
let currentPuzzle = null;
let lastPuzzle = null;
let backButton = null;

function loadLevels(){
  let levelsKeyArray = Object.keys(levels);
  //First create the puzzles
  for (let levelKey of levelsKeyArray){
    let level = levels[levelKey];
    let name = level.name;
    let image = level.image;
    let width = level.width;//width and height are the size of the pieces
    let height = level.height;
    let puzzle = new Puzzle(name, image, width, height);
    puzzle.randomizePieces();
    puzzle.setPosition(256, 128);
    puzzle.hide();
    puzzles[levelKey] = puzzle;
  }
  //next set the pieces
  for (let levelKey of levelsKeyArray){
    let level = levels[levelKey];
    let pieces = level.pieces;
    let puzzle = puzzles[levelKey];
    for (let y = 0; y < pieces.length; y++){
      for (let x = 0; x < pieces[y].length; x++){
        if (pieces[y][x] === null) continue;
          let piece = puzzle.getPiece(x,y);
          let key = pieces[y][x];
          piece.setPuzzle(puzzles[key]);
      }
    }
  }
}

function getRandomInteger(min, max){
  return Math.floor( Math.random() * (max - min) + min );
}

function back(){
  setPuzzle(lastPuzzle);
}

function setPuzzle(puzzle){
  if (currentPuzzle !== null) currentPuzzle.hide();
  puzzle.show();
  lastPuzzle = currentPuzzle;
  currentPuzzle = puzzle;
  if (puzzle === mainPuzzle){
    backButton.hide();
  }else{
    backButton.show();
  }
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
  backButton = new Button(250, 300, 'buttonBackground', back, "Back");
  backButton.hide();
  loadLevels();
  mainPuzzle = puzzles['main'];
  setPuzzle(puzzles['main']);
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
