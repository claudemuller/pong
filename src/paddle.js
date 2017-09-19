(function (global) {
  'use strict';

  function Paddle(x, y) {
    let speedY = 0;

    return {
      x,
      y,
      speedY
    }
  }

  global.Paddle = Paddle;
})(window);
