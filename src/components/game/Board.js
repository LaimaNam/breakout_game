import React, { useRef, useEffect } from 'react';
import { BallMovement } from './BallMovement';
import WallCollision from './utils/WallCollision';
import data from '../../data';
import Paddle from './Paddle';
import Brick from './Brick';

let bricks = [];
let { ballObj, paddleProps, brickObj } = data;

export default function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      //assign bricks
      let newBrickSet = Brick(2, bricks, canvas, brickObj);

      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //display bricks
      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      //handle ball movement
      BallMovement(ctx, ballObj);

      //ball and wall collision
      WallCollision(ballObj, canvas);

      Paddle(ctx, canvas, paddleProps);

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      onMouseMove={(event) =>
        (paddleProps.x = event.clientX - paddleProps.width / 2 - 10)
      }
      height="500"
      width={window.innerWidth - 20}
    ></canvas>
  );
}
