(function (global) {
  'use strict';

  const PADDLE_HEIGHT = 100,
    PADDLE_WIDTH = 10,
    BALL_RADIUS = 10,
    WINNING_SCORE = 3;

  const game = {
    player1Score: 0,
    player2Score: 0,
    init() {
      this.canvas = document.getElementById('gameCanvas');
      this.canvasContext = this.canvas.getContext('2d');

      this.paddle1 = paddle(0, this.canvas.height / 2 - PADDLE_HEIGHT / 2);
      this.paddle2 = paddle(this.canvas.width - PADDLE_WIDTH, this.canvas.height / 2 - PADDLE_HEIGHT / 2),
        this.ball = ball(this.canvas.width / 2, this.canvas.height / 2);

      window.addEventListener('load', this.load.bind(this));
    },
    load() {
      const framesPerSecond = 30;

      setInterval(this.tick.bind(this), 1000 / framesPerSecond);

      this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.canvas.addEventListener('mousedown', this.handleMouseClick.bind(this));
    },
    tick() {
      this.update();
      this.render();
    },
    update() {
      if (this.showingWinScreen) return;

      this.computerMovement();

      this.ball.x += this.ball.speedX;
      this.ball.y += this.ball.speedY;

      if (this.ball.x < 0) {
        if (this.ball.y > this.paddle1.y && this.ball.y < this.paddle1.y + PADDLE_HEIGHT) {
          const deltaY = this.ball.y - (this.paddle1.y + PADDLE_HEIGHT / 2);

          this.ball.speedX = -this.ball.speedX;
          this.ball.speedY = deltaY * 0.35;
        }
        else {
          this.player2Score++;
          this.ballReset();
        }
      }
      if (this.ball.x > this.canvas.width) {
        if (this.ball.y > this.paddle2.y && this.ball.y < this.paddle2.y + PADDLE_HEIGHT) {
          const deltaY = this.ball.y - (this.paddle2.y + PADDLE_HEIGHT / 2);
          this.ball.speedX = -this.ball.speedX;
          this.ball.speedY = deltaY * 0.35;
        }
        else {
          this.player1Score++;
          this.ballReset();
        }
      }
      if (this.ball.y > this.canvas.height || this.ball.y < 0) this.ball.speedY = -this.ball.speedY;
    },
    render() {
      colourRect(this.canvasContext, 0, 0, this.canvas.width, this.canvas.height, 'black');

      if (this.showingWinScreen) {
        this.canvasContext.fillStyle = 'white';

        if (this.player1Score >= WINNING_SCORE) this.canvasContext.fillText('Left player won', 350, 200);
        else if (this.player2Score >= WINNING_SCORE) this.canvasContext.fillText('Right player won', 350, 200);

        this.canvasContext.fillText('Click to continue', 350, 500);

        return;
      }

      this.drawNet();
      colourRect(this.canvasContext, 0, this.paddle1.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
      colourRect(this.canvasContext, this.canvas.width - PADDLE_WIDTH, this.paddle2.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
      colourCircle(this.canvasContext, this.ball.x, this.ball.y, BALL_RADIUS, 'white');
      this.canvasContext.fillText(this.player1Score, 100, 100);
      this.canvasContext.fillText(this.player2Score, this.canvas.width - 100, 100);
    },
    handleMouseClick(event) {
      if (this.showingWinScreen) {
        this.player1Score = 0;
        this.player2Score = 0;
        this.showingWinScreen = false;
      }
    },
    handleMouseMove(event) {
      const mousePos = this.calculateMousePos(event);
      this.paddle1.y = mousePos.y - (PADDLE_HEIGHT / 2);
    },
    calculateMousePos(event) {
      const rect = this.canvas.getBoundingClientRect(),
        root = document.documentElement,
        mouseX = event.clientX - rect.left - root.scrollLeft,
        mouseY = event.clientY - rect.top - root.scrollTop;

      return {
        x: mouseX,
        y: mouseY
      };
    },
    ballReset() {
      if (this.player1Score >= WINNING_SCORE || this.player2Score >= WINNING_SCORE) {
        this.showingWinScreen = !this.showingWinScreen;
      }

      this.ball.x = this.canvas.width / 2;
      this.ball.y = this.canvas.height / 2;
      this.ball.speedX = -this.ball.speedX;
    },
    computerMovement() {
      const paddle2YCentre = this.paddle2.y + (PADDLE_HEIGHT / 2);
      if (paddle2YCentre < this.ball.y - 35) this.paddle2.y += 6;
      else if (paddle2YCentre > this.ball.y + 35) this.paddle2.y -= 6;
    },
    drawNet() {
      for (let i = 0; i < this.canvas.height; i += 40) {
        colourRect(this.canvasContext, this.canvas.width / 2 - 1, i, 2, 20, 'white');
      }
    }
  };

  function colourRect(canvasContext, leftX, topY, width, height, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(leftX, topY, width, height);
  }

  function colourCircle(canvasContext, x, y, radius, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }

  global.game = game;
})(window);

