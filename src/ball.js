(function (global) {
  'use strict';

  function ball(x, y) {
    let speedX = 10,
      speedY = 4;

    return {
      x,
      y,
      speedX,
      speedY
    }
  }

  global.Ball = Ball;
})(window);

