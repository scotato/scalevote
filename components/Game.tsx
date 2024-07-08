import physics from "@/lib/physics";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/constants";
import Platform from "@/public/game/platform.svg";
import PlatformBase from "@/public/game/platform-base.svg";
import PlatformDial from "@/public/game/platform-dial.svg";

interface GameProps {
  players: User[];
}

export default function Game(props: GameProps) {
  const { players, leftPlatformOffset, rightPlatformOffset } = physics(
    props.players
  );
  const offset =
    leftPlatformOffset > rightPlatformOffset
      ? leftPlatformOffset
      : rightPlatformOffset;
  const dialDirection = leftPlatformOffset > rightPlatformOffset ? -1 : 1;
  const dialDegreeMax = 112.5;
  const dialRotation = dialDirection * dialDegreeMax * (offset / 100);

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

      <Platform x={22} y={246 + leftPlatformOffset} />
      <Platform x={412} y={246 + rightPlatformOffset} />

      <PlatformBase x={62} y={456} />
      <g transform={`rotate(${dialRotation} 400 552)`}>
        <PlatformDial x={304} y={456} />
      </g>

      {players.map((user, index) => {
        const radius = user.body.circleRadius || 1;

        return (
          <>
            <circle
              cx={user.body.position.x}
              cy={user.body.position.y}
              r={user.body.circleRadius}
              fill={user.color}
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
