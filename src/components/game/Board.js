import React, { useRef, useEffect } from 'react';

let x = 0;
const Board = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.heigth);
      context.beginPath();
      context.fillStyle = 'red';
      context.arc(x, 50, 20, 0, 2 * Math.PI);
      context.strokeStyle = 'black';
      context.strokeWidth = 4;
      context.fill();
      context.stroke();
      x++;
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas ref={canvasRef} id="canvas" height="500px" width="800px"></canvas>
  );
};

export default Board;
