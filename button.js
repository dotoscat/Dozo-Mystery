'use strict';

class Button{
  constructor(x, y, key, callback, text){
    this.group = game.add.group(game.world, text + "_Button");
    this.button = game.make.button(0, 0, key, callback);
    this.group.addChild(this.button);
    this.text = game.make.text(0, 0, text, {fill: 'black'});
    this.group.addChild(this.text);
    this.group.position.set(x, y);
  }

}
