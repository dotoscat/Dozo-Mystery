'use strict';

class Piece{
  constructor(positionX, positionY, cropX, cropY, width, height,
    imageKey, fromPuzzle){
    this.value = 0;
    this.fromPuzzle = fromPuzzle;
    this.puzzle = null;
    let image = game.add.image(positionX, positionY, imageKey);
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
    image.data = this;
    image.events.onDragStop.add(Piece.stopDragging, this);
  }

  isPuzzle(){
    return this.puzzle !== null;
  }

  setPuzzle(puzzle){
    this.puzzle = puzzle;
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
    }
  }

}
