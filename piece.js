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

  isPuzzle(){
    return this.toPuzzle !== null;
  }

  getPuzzle(){
    return this.toPuzzle;
  }

  setPuzzle(puzzle){
    this.toPuzzle = puzzle;
    if (puzzle !== null && !puzzle.isSolved()){
      this.image.alpha = 0.5;
      this.image.input.draggable = false;
    }
    else if ((puzzle !== null && puzzle.isSolved()) || puzzle === null){
      this.image.alpha = 1.0;
      this.image.input.draggable = true;
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
      console.log("This puzzle is solved!");
      //back from this puzzle
    }
  }

  static onClick(image, pointer){
    let piece = image.data;
    if (piece.isPuzzle()) {
      console.log("Another puzzle!");
    }
  }

}
