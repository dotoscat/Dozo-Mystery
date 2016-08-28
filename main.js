'use strict';

const WIDTH = 640;
const HEIGHT = 480;

let images = {};

function preload(){
  console.log('preload');
  game.load.image('psmile', 'psmile.png');
  game.load.image('puzzleBackground', 'puzzleBackground.png');
}

function create(){
  console.log('create');
  new Puzzle('psmile', 64, 64, 32, 32);
}

function update(){

}

let state = {preload: preload, create: create, update: update}

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
