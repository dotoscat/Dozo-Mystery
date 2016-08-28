'use strict';

class Puzzle{
  constructor(imageKey, puzzleX, puzzleY, pieceWidth, pieceHeight){
    this.pieceWidth = pieceWidth;
    this.pieceHeight = pieceHeight;
    let image = game.cache.getImage(imageKey);
    let imageWidth = image.width;
    let imageHeight = image.height;
    let nPieceWidth = imageWidth / pieceWidth;
    let nPieceHeight = imageHeight / pieceHeight;
    this.rect = new Phaser.Rectangle(puzzleX, puzzleY, imageWidth, imageHeight);
    this.area = new Phaser.Rectangle(puzzleX, puzzleY, imageWidth, imageHeight);
    this.area.inflate(64, 64);
    let pieces = new Array(nPieceHeight);
    this.pieces = pieces;
    this.backgrounds = [];
    //fill pieces and backgrounds
    for (let y = 0; y < nPieceHeight; y++){
      pieces[y] = new Array(nPieceWidth);
      for (let x = 0; x < nPieceWidth; x++){
        const finalX = puzzleX + pieceWidth * x;
        const finalY = puzzleY + pieceHeight * y;
        const cropX = pieceWidth * x;
        const cropY = pieceHeight * y;
        let backgroundImage = game.add.image(finalX, finalY,
          'puzzleBackground');
        this.backgrounds.push(backgroundImage);
        pieces[y][x] = new Piece(finalX, finalY, cropX, cropY,
          pieceWidth, pieceHeight, imageKey, this);
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

  setPiece(piece, point){
    let done = false;
    if (!Phaser.Rectangle.containsPoint(this.rect, point)) {
      return done;
    }
    let pixelX = point.x - this.rect.x;
    let pixelY = point.y - this.rect.y;
    let x = Math.floor(pixelX / this.pieceWidth);
    let y = Math.floor(pixelY / this.pieceHeight);
    this.currentPieces[y][x] = piece;
    piece.image.position.set(this.rect.x + x * this.pieceWidth,
      this.rect.y + y * this.pieceHeight);
    done = true;
    return done;
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

  randomizePieces(space){
    let area = this.area;
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
