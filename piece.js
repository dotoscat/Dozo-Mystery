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

class Piece{
  constructor(group, cropX, cropY, width, height,
    imageKey, fromPuzzle){
    this.puzzleX = -1;
    this.puzzleY = -1;
    this.value = 0;
    this.fromPuzzle = fromPuzzle;
    this.toPuzzle = null;
    let image = game.add.image(0, 0, imageKey);
    group.addChild(image);
    this.image = image;
    //this rectangle is used for crop
    let rectangle = new Phaser.Rectangle(cropX, cropY, width, height);
    image.crop(rectangle);
    image.updateCrop();
    image.inputEnabled = true;
    image.input.enableDrag(true);
    image.bringToTop();
    image.input.bringToTop = true;
    image.input.useHandCursor = true;
    image.input.dragStopBlocksInput = true;
    image.data = this;
    image.events.onDragStop.add(Piece.stopDragging, this);
    image.events.onInputUp.add(Piece.onClick, this);
  }

  setPuzzleXY(x, y){
    this.puzzleX = x;
    this.puzzleY = y;
    this.image.position.set(x * this.image.width, y * this.image.height);
  }

  resetPuzzlePosition(){
    this.puzzleX = -1;
    this.puzzleY = -1;
  }

  markToBeSolved(){
    this.image.alpha = 0.5;
    this.image.tint = 0xFF0000;
    this.image.input.draggable = false;
  }

  unmarkToBeSolved(){
    this.image.alpha = 1.0;
    this.image.tint = 0xFFFFFF;
    this.image.input.draggable = true;
  }

  isPuzzle(){
    return this.toPuzzle !== null;
  }

  isOutOfPuzzle(){
    return this.puzzleX === -1 && this.puzzleY === -1;
  }

  getPuzzle(){
    return this.toPuzzle;
  }

  setPuzzle(puzzle){
    this.toPuzzle = puzzle;
    puzzle.setParentPiece(this);
    if (puzzle !== null && !puzzle.isSolved()){
      this.markToBeSolved();
    }
    else if ((puzzle !== null && puzzle.isSolved()) || puzzle === null){
      this.unmarkToBeSolved();
    }
  }

  getParentPuzzle(){
    return this.fromPuzzle;
  }

  setPosition(x, y){
    this.image.position.set(x, y);
  }

  resetPosition(){
    let pos = this.image.input.dragStartPoint;
    this.image.position.set(pos.x, pos.y);
  }

  static stopDragging(image, pointer){
    let piece = image.data;
    let puzzle = piece.getParentPuzzle();
    puzzle.setPiece(piece, pointer);
    if (puzzle.isSolved()){
      let parentPiece = puzzle.getParentPiece();
      parentPiece.unmarkToBeSolved();
      back();
    }
  }

  static onClick(image, pointer){
    let piece = image.data;
    let piecePuzzle = piece.getPuzzle();
    if (piece.isPuzzle() && !piecePuzzle.isSolved()) {
      setPuzzle(piece.getPuzzle());
      increaseDepth();
    }
  }

}
