import { Engine, Bodies, Composite, Vertices, Common, Vector } from "matter-js";
import svgPathProperties from "svg-path-properties";

import {
  ENGINE_DURATION,
  ENGINE_TIMESTEP,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLATFORM_WIDTH,
  PLATFORM_HEIGHT,
  PLATFORM_PATH,
} from "./constants";

const LEFT_CENTER = 206;
const RIGHT_CENTER = 596;
const PLATFORM_DEFAULT_HEIGHT = 300;
const PLATFORM_MAX_OFFSET = 100;

// provide concave decomposition support library
Common.setDecomp(require("poly-decomp"));

const physics = (users: User[]) => {
  const engine = Engine.create();
  const world = engine.world;

  const ground = Bodies.rectangle(400, 599, 800, 1, { isStatic: true });
  const leftWall = Bodies.rectangle(0, 300, 1, 600, { isStatic: true });
  const centerWall = Bodies.rectangle(400, 300, 1, 600, { isStatic: true });
  const rightWall = Bodies.rectangle(799, 300, 1, 600, { isStatic: true });

  const leftPlatform = createPlatform();
  const rightPlatform = createPlatform();

  const { offsetLeft, offsetRight } = calculateOffset(users);

  // move the composite to a new position
  moveComposite(leftPlatform, {
    x: LEFT_CENTER,
    y: PLATFORM_DEFAULT_HEIGHT + offsetLeft,
  });
  moveComposite(rightPlatform, {
    x: RIGHT_CENTER,
    y: PLATFORM_DEFAULT_HEIGHT + offsetRight,
  });

  Composite.add(world, [ground, leftWall, centerWall, rightWall]);
  Composite.add(world, [leftPlatform, rightPlatform]);

  const players: Player[] = users.map((user, i) => {
    const x = user.side === "left" ? LEFT_CENTER + i : RIGHT_CENTER + i;
    return {
      ...user,
      body: Bodies.circle(x, 0, user.size),
    };
  });

  players.forEach((player) => Composite.add(world, player.body));

  // Simulate for a few steps manually
  for (let i = 0; i < ENGINE_DURATION; i++) {
    Engine.update(engine, ENGINE_TIMESTEP);
  }

  return {
    players,
    world,
    leftPlatform,
    rightPlatform,
    leftPlatformOffset: offsetLeft,
    rightPlatformOffset: offsetRight,
  };
};

function createPlatform() {
  // rotate 30deg
  const leftPlatformWall = Bodies.rectangle(56, 262, 1, 182, {
    isStatic: true,
    angle: -0.523599,
  });

  // rotate -30deg
  const rightPlatformWall = Bodies.rectangle(355, 262, 1, 182, {
    isStatic: true,
    angle: 0.523599,
  });

  const basePlatform = Bodies.rectangle(205, 340, 208, 1, {
    isStatic: true,
  });

  // group bodies into a composite
  const platform = Composite.create();

  Composite.add(platform, [leftPlatformWall, rightPlatformWall, basePlatform]);

  return platform;
}

// function to calculate the centroid of the composite
const calculateCompositeCentroid = (composite: Composite): Vector => {
  const bodies = Composite.allBodies(composite);
  const totalArea = bodies.reduce(
    (sum, body) => sum + Vertices.area(body.vertices, false),
    0
  );
  const centroid = bodies.reduce((sum, body) => {
    const area = Vertices.area(body.vertices, false);
    const bodyCentroid = Vertices.centre(body.vertices);
    return Vector.add(sum, Vector.mult(bodyCentroid, area));
  }, Vector.create(0, 0));
  return Vector.div(centroid, totalArea);
};

// function to move all bodies in the composite
const moveComposite = (composite: Composite, newPosition: Vector) => {
  const centroid = calculateCompositeCentroid(composite);
  const delta = Vector.sub(newPosition, centroid);
  Composite.translate(composite, delta);
};

export function calculateOffset(users: User[]) {
  const leftSidePlayers = users.filter((user) => user.side === "left");
  const rightSidePlayers = users.filter((user) => user.side === "right");
  const leftWeight = leftSidePlayers.reduce(
    (acc, player) => acc + player.size,
    0
  );
  const rightWeight = rightSidePlayers.reduce(
    (acc, player) => acc + player.size,
    0
  );
  const weightDifference = leftWeight - rightWeight;

  const offsetLeft = Math.min(
    Math.max(weightDifference, -PLATFORM_MAX_OFFSET),
    PLATFORM_MAX_OFFSET
  );
  const offsetRight = -offsetLeft;

  return { offsetLeft, offsetRight };
}

export default physics;

// this works but seems super inaccurate, need a debug view to use this

// const vertices = getPointsOnPath(PLATFORM_PATH);

// const platform = Bodies.fromVertices(
//   400,
//   300,
//   Common.choose([[vertices]]),
//   { isStatic: true },
//   true
// );

// function getPointsOnPath(pathData: string, n = 8) {
//   const properties = new svgPathProperties.svgPathProperties(pathData);
//   const length = properties.getTotalLength();
//   const points = [];

//   for (let i = 0; i <= n; i++) {
//     const distance = (i / n) * length;
//     const { x, y } = properties.getPointAtLength(distance);
//     points.push(Vector.create(x, y));
//   }

//   return points;
// }
