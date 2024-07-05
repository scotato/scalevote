import { NextApiRequest, NextApiResponse } from "next";
import { Engine, Bodies, Composite } from "matter-js";
import ReactDOMServer from "react-dom/server";

type User = {
  id: number;
  avatar: string;
  size: number;
  body: Matter.Body;
};

const getAvatar = (id: number) =>
  `https://api.dicebear.com/9.x/big-smile/svg?seed=${id}`;
const DUMMY_USER_COUNT = 10;
const DUMMY_USERS = Array.from({ length: DUMMY_USER_COUNT }, (_, i) => ({
  id: i,
  avatar: getAvatar(i),
  size: Math.floor(Math.random() * 100) + 50,
}));

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const engine = Engine.create();
  const world = engine.world;

  // Create a ground
  const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });
  Composite.add(world, ground);

  // Create walls - rotate 22.5 degrees
  const leftWall = Bodies.rectangle(5, 300, 10, 600, {
    isStatic: true,
    angle: -0.392699,
  });
  const rightWall = Bodies.rectangle(795, 300, 10, 600, {
    isStatic: true,
    angle: 0.392699,
  });
  Composite.add(world, [leftWall, rightWall]);

  const users = DUMMY_USERS.map((user, i) => ({
    ...user,
    body: Bodies.circle(Math.floor(Math.random() * 800), i, user.size),
  }));

  users.forEach((user) => Composite.add(world, user.body));

  // Simulate for a few steps manually
  const DURATION = 200;
  const timeStep = 1000 / 60; // 60 steps per second
  for (let i = 0; i < DURATION; i++) {
    Engine.update(engine, timeStep);
  }

  // Generate the SVG string
  const generateSVG = (users: User[], groundPosition: Matter.Vector) => {
    // React component for generating the SVG
    const SVGComponent = () => (
      <svg
        width="100%"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {users.map((user, index) => {
            const radius = user.body.circleRadius || 1;
            const size = radius * 2;
            return (
              <pattern
                key={`pattern-${user.id}`}
                id={`ballPattern${index}`}
                x="0"
                y="0"
                width="1"
                height="1"
              >
                <image
                  x="0"
                  y="0"
                  width={size}
                  height={size}
                  transform={`rotate(${
                    user.body.angle * (180 / Math.PI)
                  } ${radius} ${radius})`}
                  href={user.avatar}
                />
              </pattern>
            );
          })}
        </defs>

        <rect width="100%" height="100%" fill="white" />
        <rect
          x={groundPosition.x - 405}
          y={groundPosition.y - 30}
          width={810}
          height={60}
          fill="skyblue"
        />
        <rect
          x={leftWall.position.x - 5}
          y={leftWall.position.y - 300}
          width={10}
          height={600}
          fill="skyblue"
          transform={`rotate(-22.5 ${leftWall.position.x} ${leftWall.position.y})`}
        />
        <rect
          x={rightWall.position.x - 5}
          y={rightWall.position.y - 300}
          width={10}
          height={600}
          fill="skyblue"
          transform={`rotate(22.5 ${rightWall.position.x} ${rightWall.position.y})`}
        />

        {users.map((user, index) => {
          const radius = user.body.circleRadius || 1;
          const size = radius * 2;

          return (
            <>
              <circle
                cx={user.body.position.x}
                cy={user.body.position.y}
                r={user.body.circleRadius}
                fill={`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                  Math.random() * 255
                )}, ${Math.floor(Math.random() * 255)})`}
                opacity="0.5"
              />
              <circle
                cx={user.body.position.x}
                cy={user.body.position.y}
                r={user.body.circleRadius}
                fill={`url(#ballPattern${index})`}
              />
            </>
          );
        })}
      </svg>
    );

    const svgString = ReactDOMServer.renderToString(
      // todo pass props
      <SVGComponent />
    );

    return svgString;
  };

  const svgString = generateSVG(users, ground.position);
  res.status(200).send(svgString);
};

export default handler;
