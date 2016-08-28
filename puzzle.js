'use strict';

class Puzzle{
  constructor(imageKey, width, height){
    //width and height are the size of the piece
    this.width = width;
    this.height = height;
    let image = game.cache.getImage(imageKey);
    let imageWidth = image.width;
    let imageHeight = image.height;
    let widthPiece = imageWidth / width;
    let heightPiece = imageHeight / width;
    this.pieces = new Array(imageHeight);
    let pieces = this.pieces;
    this.backgrounds = [];
    for(let y = 0; y < heightPiece; y++){
      pieces[y] = new Array(imageWidth);
      for(let x = 0; x < widthPiece; x++){
        let backgroundImage = game.add.image(width*x, height*y, 'puzzleBackground');
        this.backgrounds.push(backgroundImage);
        pieces[y][x] = new Piece(width*x, height*y, width, height, imageKey, this);
      }
    }
  }

  getPiece(x, y){
    return this.pieces[y][x];
  }

}
