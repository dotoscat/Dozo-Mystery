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

class Puzzle{
  constructor(name, imageKey, pieceWidth, pieceHeight){
    this.parentPiece = null;
    this.name = name;
    this.puzzleGroup = game.make.group(game.world, name + '_puzzleGroup');
    this.pieceWidth = pieceWidth;
    this.pieceHeight = pieceHeight;
    let image = game.cache.getImage(imageKey);
    let imageWidth = image.width;
    let imageHeight = image.height;
    let nPieceWidth = imageWidth / pieceWidth;
    let nPieceHeight = imageHeight / pieceHeight;
    this.nPieceWidth = nPieceWidth;
    this.nPieceHeight = nPieceHeight;
    this.rect = new Phaser.Rectangle(0, 0, imageWidth, imageHeight);
    this.areaPieces = new Phaser.Rectangle(imageWidth + pieceWidth, 0,
      imageWidth, imageHeight);
    let pieces = new Array(nPieceHeight);
    this.pieces = pieces;
    this.backgroundGroup = game.make.group(this.puzzleGroup,
      name + '_backgroundGroup');
    this.piecesGroup = game.make.group(this.puzzleGroup, name + "_piecesGroup");
    //fill pieces and backgrounds
    for (let y = 0; y < nPieceHeight; y++){
      pieces[y] = new Array(nPieceWidth);
      for (let x = 0; x < nPieceWidth; x++){
        const finalX = pieceWidth * x;
        const finalY = pieceHeight * y;
        const cropX = pieceWidth * x;
        const cropY = pieceHeight * y;
        let backgroundImage = game.add.image(finalX, finalY,
          'puzzleBackground');
        this.backgroundGroup.addChild(backgroundImage);
        let piece = new Piece(this.piecesGroup, cropX, cropY,
          pieceWidth, pieceHeight, imageKey, this);
        pieces[y][x] = piece;
      }
    }
    //create the current pieces, a multidimensional array
    let currentPieces = new Array(nPieceHeight);
    this.currentPieces = currentPieces;
    for (let y = 0; y < nPieceWidth; y++) {
      currentPieces[y] = new Array(nPieceWidth);
      for (let x = 0; x < nPieceHeight; x++) {
        currentPieces[y][x] = null;
      }
    }
  }

  setParentPiece(piece){
    this.parentPiece = piece;
  }

  getParentPiece(piece){
    return this.parentPiece;
  }

  show(){
    this.puzzleGroup.visible = true;
  }

  hide(){
    this.puzzleGroup.visible = false;
  }

  setPosition(x, y){
    this.puzzleGroup.position.set(x, y);
    this.rect.x = x;
    this.rect.y = y;
  }

  getName(){
    return this.name;
  }

  isSolved(){
    let solved = true;
    for (let y = 0; y < this.nPieceHeight && solved === true; y++){
      for (let x = 0; x < this.nPieceWidth && solved === true; x++){
        solved = solved && (this.pieces[y][x] === this.currentPieces[y][x]);
      }
    }
    return solved;
  }

  checkoutPieces(){

  }

  setPiece(piece, point){
    const currentX = Math.floor((point.x - this.rect.x) / this.pieceWidth);
    const currentY = Math.floor((point.y - this.rect.y) / this.pieceHeight);
    const pieceX = piece.puzzleX;
    const pieceY = piece.puzzleY;
    if (currentX < 0 || currentX > this.nPieceWidth
    || currentY < 0 || currentY > this.nPieceHeight) return;
    if (!Phaser.Rectangle.containsPoint(this.rect, point)
    && !piece.isOutOfPuzzle()) {
      this.currentPieces[pieceY][pieceX] = null;
      piece.resetPuzzlePosition();
    }else{
      if (this.currentPieces[currentY][currentX] !== null
      && this.currentPieces[currentY][currentX] !== piece){
        let thatPiece = this.currentPieces[currentY][currentX];
        if (piece.isOutOfPuzzle()) {
          let pieceDragStartPoint = piece.image.input.dragStartPoint;
          thatPiece.resetPuzzlePosition();
          thatPiece.setPosition(pieceDragStartPoint.x,
            pieceDragStartPoint.y);
        }else{
          this.currentPieces[pieceY][pieceX] = thatPiece;
          thatPiece.setPuzzleXY(pieceX, pieceY);
        }
      }else if(!piece.isOutOfPuzzle()) {
        this.currentPieces[pieceY][pieceX] = null;
      }
      this.currentPieces[currentY][currentX] = piece;
      piece.setPuzzleXY(currentX, currentY);
    }
  }

  getPiece(x, y){
    return this.pieces[y][x];
  }

  resetCurrentPieces(){
    for (let row of this.currentPieces){
      for (let x = 0; x < row.length; x++){
        row[x] = null;
      }
    }

  }

  randomizePieces(){
    let area = this.areaPieces;
    for (let row of this.pieces){
      for (let x = 0; x < row.length; x++){
        let posX = 0;
        let posY = 0;
        do{
          posX = getRandomInteger(area.x, area.right);
          posY = getRandomInteger(area.y, area.bottom);
        }while(Phaser.Rectangle.contains(this.rect, posX, posY));

        row[x].image.position.set(posX, posY);

      }
    }

  }

}
