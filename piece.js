'use strict';

class Piece{
  constructor(positionX, positionY, cropX, cropY, width, height, imageKey, fromPuzzle){
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
    image.input.bringToTop = true;
    image.input.useHandCursor = true;
    image.data = this;
    image.events.onDragStop.add(Piece.stopDragging, this);
  }

  isPuzzle(){
    return this.puzzle !== null;
  }

  getParentPuzzle(){
    return this.fromPuzzle;
  }

  static stopDragging(image, pointer){
    console.log(pointer.positionUp);
    let piece = image.data;
    let puzzle = piece.getParentPuzzle();
    
  }

}
