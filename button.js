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

class Button{
  constructor(x, y, key, callback, text){
    this.group = game.add.group(game.world, text + "_Button");
    this.button = game.make.button(0, 0, key, callback);
    this.group.addChild(this.button);
    this.text = game.make.text(0, 0, text, {fill: 'black'});
    this.group.addChild(this.text);
    this.group.position.set(x, y);
  }

  show(){
    this.group.visible = true;
  }

  hide(){
    this.group.visible = false;
  }

}
