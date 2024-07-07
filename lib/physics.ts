import { Engine, Bodies, Composite } from "matter-js";

const DURATION = 200;
const TIMESTEP = 1000 / 60; // 60 steps per second... i think

const physics = (users: User[]) => {
  const engine = Engine.create();
  const world = engine.world;

  // Create a ground
  const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });

  // Create walls - rotate 22.5 degrees
  const leftWall = Bodies.rectangle(5, 300, 10, 600, {
    isStatic: true,
    angle: -0.392699,
  });

  const rightWall = Bodies.rectangle(795, 300, 10, 600, {
    isStatic: true,
    angle: 0.392699,
  });

  Composite.add(world, [ground, leftWall, rightWall]);

  const players: Player[] = users.map((user, i) => ({
    ...user,
    body: Bodies.circle(Math.floor(Math.random() * 800), i, user.size),
  }));

  players.forEach((player) => Composite.add(world, player.body));

  // Simulate for a few steps manually
  for (let i = 0; i < DURATION; i++) {
    Engine.update(engine, TIMESTEP);
  }

  return {
    players,
    world,
    leftBalance: {
      ground,
      leftWall,
      rightWall,
    },
  };
};

export default physics;
