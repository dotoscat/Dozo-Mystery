'use strict';

class Piece{
  constructor(group, cropX, cropY, width, height,
    imageKey, fromPuzzle){
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

  markToBeSolved(){
    this.image.alpha = 0.5;
    this.image.input.draggable = false;
  }

  unmarkToBeSolved(){
    this.image.alpha = 1.0;
    this.image.input.draggable = true;
  }

  isPuzzle(){
    return this.toPuzzle !== null;
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

  resetPosition(){
    let pos = this.image.input.dragStartPoint;
    this.image.position.set(pos.x, pos.y);
  }

  static stopDragging(image, pointer){
    let piece = image.data;
    let puzzle = piece.getParentPuzzle();
    if (!puzzle.setPiece(piece, pointer)){
      piece.resetPosition();
    }
    if (puzzle.isSolved()){
      let parentPiece = puzzle.getParentPiece();
      parentPiece.unmarkToBeSolved();
      back();
    }
  }

  static onClick(image, pointer){
    let piece = image.data;
    if (piece.isPuzzle()) {
      setPuzzle(piece.getPuzzle());
    }
  }

}
