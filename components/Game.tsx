import physics from "@/lib/physics";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLATFORM_WIDTH,
  PLATFORM_HEIGHT,
} from "@/lib/constants";
import Platform from "@/public/game/platform.svg";

interface GameProps {
  players: User[];
}

export default function Game(props: GameProps) {
  const { players } = physics(props.players);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {players.map((user, index) => {
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

      <Platform
        x={22}
        y={236}
        // x={platform.position.x - PLATFORM_WIDTH / 2}
        // y={platform.position.y - PLATFORM_HEIGHT / 1.225}
      />

      <Platform
        x={412}
        y={236}
        // x={platform.position.x - PLATFORM_WIDTH / 2}
        // y={platform.position.y - PLATFORM_HEIGHT / 1.225}
      />

      {players.map((user, index) => {
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
}
