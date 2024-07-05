import { getCoordinatesById } from "@/lib/world";
const worldTileSize = 200;
const tileSize = 64;

export default function Tiles({ tiles }: { tiles: GenericTile[] }) {
  const { x, y } = getCoordinatesById(tiles[0].locationId);

  const Container = ({ children }: { children: React.ReactNode }) => (
    <g id={`tiles-${x}-${y}`}>
      {children}
      <rect
        width={worldTileSize}
        height={worldTileSize}
        x={x * worldTileSize}
        y={y * worldTileSize}
        fill="none"
      />
    </g>
  );

  if (tiles.length === 1) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={68} y={68} />
      </Container>
    );
  }

  if (tiles.length === 2) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={35} y={68} />
        <Tile tile={tiles[1]} x={101} y={68} />
      </Container>
    );
  }

  if (tiles.length === 3) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={68} y={39} />
        <Tile tile={tiles[1]} x={35} y={97} />
        <Tile tile={tiles[2]} x={101} y={97} />
      </Container>
    );
  }

  if (tiles.length === 4) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={68} y={21} />
        <Tile tile={tiles[1]} x={21} y={68} />
        <Tile tile={tiles[2]} x={115} y={68} />
        <Tile tile={tiles[3]} x={68} y={115} />
      </Container>
    );
  }

  if (tiles.length === 5) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={21} y={21} />
        <Tile tile={tiles[1]} x={115} y={21} />
        <Tile tile={tiles[2]} x={68} y={68} />
        <Tile tile={tiles[3]} x={21} y={115} />
        <Tile tile={tiles[4]} x={115} y={115} />
      </Container>
    );
  }

  if (tiles.length === 6) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={35} y={10} />
        <Tile tile={tiles[1]} x={101} y={10} />
        <Tile tile={tiles[2]} x={2} y={68} />
        <Tile tile={tiles[3]} x={134} y={68} />
        <Tile tile={tiles[4]} x={35} y={126} />
        <Tile tile={tiles[5]} x={101} y={126} />
      </Container>
    );
  }

  if (tiles.length === 7) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={35} y={10} />
        <Tile tile={tiles[1]} x={101} y={10} />
        <Tile tile={tiles[2]} x={2} y={68} />
        <Tile tile={tiles[3]} x={68} y={68} />
        <Tile tile={tiles[4]} x={134} y={68} />
        <Tile tile={tiles[5]} x={35} y={126} />
        <Tile tile={tiles[6]} x={101} y={126} />
      </Container>
    );
  }

  if (tiles.length === 8) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={2} y={2} />
        <Tile tile={tiles[1]} x={68} y={2} />
        <Tile tile={tiles[2]} x={134} y={2} />
        <Tile tile={tiles[3]} x={2} y={68} />
        <Tile tile={tiles[4]} x={68} y={68} />
        <Tile tile={tiles[5]} x={134} y={68} />
        <Tile tile={tiles[6]} x={35} y={126} />
        <Tile tile={tiles[7]} x={101} y={126} />
      </Container>
    );
  }

  if (tiles.length === 9) {
    return (
      <Container>
        <Tile tile={tiles[0]} x={2} y={2} />
        <Tile tile={tiles[1]} x={68} y={2} />
        <Tile tile={tiles[2]} x={134} y={2} />
        <Tile tile={tiles[3]} x={2} y={68} />
        <Tile tile={tiles[4]} x={68} y={68} />
        <Tile tile={tiles[5]} x={134} y={68} />
        <Tile tile={tiles[6]} x={2} y={134} />
        <Tile tile={tiles[7]} x={68} y={134} />
        <Tile tile={tiles[8]} x={134} y={134} />
      </Container>
    );
  }

  // more than 9 tiles, show an overflow counter

  return (
    <Container>
      <Tile tile={tiles[0]} x={2} y={2} />
      <Tile tile={tiles[1]} x={68} y={2} />
      <Tile tile={tiles[2]} x={134} y={2} />
      <Tile tile={tiles[3]} x={2} y={68} />
      <Tile tile={tiles[4]} x={68} y={68} />
      <Tile tile={tiles[5]} x={134} y={68} />
      <Tile tile={tiles[6]} x={2} y={134} />
      <Tile tile={tiles[7]} x={68} y={134} />
      <Counter tile={tiles[0]} count={tiles.length - 8} x={134} y={134} />
    </Container>
  );
}

function Tile({ tile, x, y }: { tile: GenericTile; x: number; y: number }) {
  const tileCoords = getCoordinatesById(tile.locationId);

  return (
    <image
      width={tileSize}
      height={tileSize}
      xlinkHref={tile.image}
      transform={`translate(${tileCoords.x * worldTileSize + x} ${
        tileCoords.y * worldTileSize + y
      })`}
      mask="url(#pfpMask)"
    />
  );
}

function Counter({
  tile,
  count,
  x,
  y,
}: {
  tile: GenericTile;
  count: number;
  x: number;
  y: number;
}) {
  const tileCoords = getCoordinatesById(tile.locationId);

  return (
    <g
      transform={`translate(${tileCoords.x * worldTileSize + x} ${
        tileCoords.y * worldTileSize + y
      })`}
    >
      <circle
        cx={tileSize / 2}
        cy={tileSize / 2}
        r={tileSize / 2}
        fill="white"
      />
      <text
        color="black"
        x={tileSize / 2 - 16}
        y={tileSize / 2 + 8}
        fontSize={24}
        fontWeight="bold"
      >
        +{count}
      </text>
    </g>
  );
}

export function PFPMask() {
  return (
    <mask id="pfpMask">
      <circle cx={32} cy={32} r={32} fill="white" />
    </mask>
  );
}
