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

function preload(){
  console.log('preload');
}

function create(){
  console.log('create');
}

function update(){
  
}

let state = {preload: preload, create: create, update: update}

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', state);
