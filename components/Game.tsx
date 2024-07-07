import physics from "@/lib/physics";
interface GameProps {
  players: User[];
}

export default function Game(props: GameProps) {
  const { players, leftBalance } = physics(props.players);

  return (
    <svg width="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
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
      <rect
        x={leftBalance.ground.position.x - 405}
        y={leftBalance.ground.position.y - 30}
        width={810}
        height={60}
        fill="skyblue"
      />
      <rect
        x={leftBalance.leftWall.position.x - 5}
        y={leftBalance.leftWall.position.y - 300}
        width={10}
        height={600}
        fill="skyblue"
        transform={`rotate(-22.5 ${leftBalance.leftWall.position.x} ${leftBalance.leftWall.position.y})`}
      />
      <rect
        x={leftBalance.rightWall.position.x - 5}
        y={leftBalance.rightWall.position.y - 300}
        width={10}
        height={600}
        fill="skyblue"
        transform={`rotate(22.5 ${leftBalance.rightWall.position.x} ${leftBalance.rightWall.position.y})`}
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
