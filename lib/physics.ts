import { Engine, Bodies, Composite, Runner, Vector } from "matter-js";

const engine = Engine.create();
const world = engine.world;

// Create a ground
const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });
Composite.add(world, ground);

// Create a ball
const ball = Bodies.circle(400, 100, 40);
Composite.add(world, ball);

// Run the engine for a few steps
const runner = Runner.create();
Runner.run(runner, engine);

// Simulate for a few steps
for (let i = 0; i < 60; i++) {
  Engine.update(engine, 1000 / 60);
}

// Generate the SVG string
const generateSVG = (ballPosition: Vector, groundPosition: Vector) => {
  return `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect x="${groundPosition.x - 405}" y="${
    groundPosition.y - 30
  }" width="810" height="60" fill="green"/>
      <circle cx="${ballPosition.x}" cy="${ballPosition.y}" r="40" fill="blue"/>
    </svg>
  `;
};

const svgString = generateSVG(ball.position, ground.position);
console.log(svgString);
