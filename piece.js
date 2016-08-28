'use strict';

class Piece{
  constructor(x, y, width, height, imageKey, fromPuzzle){
    this.value = 0;
    this.fromPuzzle = fromPuzzle;
    this.puzzle = null;
    let image = game.add.image(x, y, imageKey);
    this.image = image;
    let rectangle = new Phaser.Rectangle(x, y, width, height);
    image.crop(rectangle);
    image.updateCrop();
    image.inputEnabled = true;
    image.input.enableDrag(true);
    image.input.bringToTop = true;
    image.input.useHandCursor = true;
    image.data = this;
    image.events.onDragStop.add(Piece.omgDragging, this);
  }

  isPuzzle(){
    return this.puzzle !== null;
  }

  getParentPuzzle(){
    return this.fromPuzzle;
  }

  static omgDragging(thi, object){
    console.log(object.positionDown);
  }

}
