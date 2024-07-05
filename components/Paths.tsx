export default function Paths() {
  const tileSize = 200;

  return (
    <>
      <g id="road">
        <line
          x1="0"
          y1="0"
          x2={tileSize}
          y2="0"
          stroke="black"
          strokeWidth={tileSize / 16}
        />
      </g>
      <g id="locked">
        <line
          x1="0"
          y1="0"
          x2={tileSize}
          y2="0"
          stroke="black"
          strokeWidth={tileSize / 16}
          strokeDasharray={`${tileSize / 3},${tileSize / 3}`}
        />
      </g>
      <g id="secret">
        <line
          x1="0"
          y1="0"
          x2={tileSize}
          y2="0"
          stroke="black"
          strokeWidth={tileSize / 16}
          strokeDasharray={`${tileSize / 9},${tileSize / 9}`}
        />
      </g>
    </>
  );
}
