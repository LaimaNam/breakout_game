import React, { useRef, useEffect } from 'react';
import { BallMovement } from './BallMovement';
import WallCollision from './utils/WallCollision';
import data from '../../data';
import Paddle from './Paddle';
let { ballObj, paddleProps } = data;

export default function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
