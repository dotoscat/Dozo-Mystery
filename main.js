/*
Copyright (C) 2016  Oscar Triano 'dotoscat'

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
*/


'use strict';

const AUTHOR = 'Oscar Triano \'dotoscat\' @cat_dotoscat';

const WIDTH = 640;
const HEIGHT = 480;

let puzzles = {};
let puzzleName = null;
let mainPuzzle = null;
let currentPuzzle = null;
let lastPuzzle = null;
let backButton = null;
let depth = 1;
let depthText = null;

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
  depth -= 1;
  depthText.setText(`Depth ${depth}`);
}

function increaseDepth(){
  depth += 1;
  depthText.setText(`Depth ${depth}`);
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
  'puzzleBackground',
  'gameBackground'
]

function preload(){
  for (let image of images){
    game.load.image(image, image + '.png');
  }
}

function create(){
  game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'gameBackground');
  puzzleName = game.add.text(0, 0, '', {fill: 'white'});
  depthText = game.add.text(0, 0, '', {fill: 'white'});
  let authorText = game.add.text(8, 0, AUTHOR, {fill: 'blue', fontSize: '16px'});
  authorText.y = HEIGHT - authorText.height;
  backButton = new Button(250, 300, 'buttonBackground', back, "Back");
  backButton.hide();
  loadLevels();
  mainPuzzle = puzzles['main'];
  setPuzzle(puzzles['main']);
  depthText.setText(`Depth ${depth}`);
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
