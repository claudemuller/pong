(function (global) {
  'use strict';

  function paddle(x, y) {
    let speedY = 0;

    return {
      x,
      y,
      speedY
    }
  }

  global.paddle = paddle;
})(window.PONG = window.PONG || {});
