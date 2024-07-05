export default function Tiles() {
  const tileSize = 200;

  return (
    <>
      <g id="marker">
        <rect width={tileSize} height={tileSize} fill="rgba(0, 0, 0, 0.1)" />
        <circle cx={tileSize / 2} cy={tileSize / 2} r={16} fill="black" />
      </g>
      <g id="basic">
        <rect width={tileSize} height={tileSize} fill="rgba(0, 0, 0, 0.1)" />
        <circle
          cx={tileSize / 2}
          cy={tileSize / 2}
          r={tileSize / 6}
          fill="black"
        />
        <circle
          cx={tileSize / 2}
          cy={tileSize / 2}
          r={tileSize / 12}
          fill="rgba(255, 255, 255, 0.9)"
        />
      </g>
      <g id="event">
        <rect width={tileSize} height={tileSize} fill="rgba(0, 0, 0, 0.1)" />
        <rect
          x={tileSize / 3}
          y={tileSize / 3}
          width={tileSize / 3}
          height={tileSize / 3}
          rx={tileSize / 18}
          ry={tileSize / 18}
          fill="black"
        />
      </g>
      <g id="city">
        <rect width={tileSize} height={tileSize} fill="rgba(0, 0, 0, 0.1)" />
        <rect
          x={tileSize / 4}
          y={tileSize / 4}
          width={tileSize / 2}
          height={tileSize / 2}
          rx={tileSize / 12}
          ry={tileSize / 12}
          fill="black"
        />
      </g>
    </>
  );
}
