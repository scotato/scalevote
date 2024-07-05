import paths from "@/lib/paths.json";
import tiles from "@/lib/tiles.json";

export function getCoordinatesById(id: string) {
  switch (id) {
    case "A1":
      return { x: 0, y: 0 };
    case "A2":
      return { x: 1, y: 0 };
    case "A3":
      return { x: 2, y: 0 };
    case "A4":
      return { x: 3, y: 0 };
    case "B1":
      return { x: 0, y: 1 };
    case "B2":
      return { x: 1, y: 1 };
    case "B3":
      return { x: 2, y: 1 };
    case "B4":
      return { x: 3, y: 1 };
    case "C1":
      return { x: 0, y: 2 };
    case "C2":
      return { x: 1, y: 2 };
    case "C3":
      return { x: 2, y: 2 };
    case "C4":
      return { x: 3, y: 2 };
    default:
      return { x: 0, y: 0 };
  }
}

export function groupTilesByPosition(tiles: GenericTile[]) {
  return tiles.reduce((acc, tile) => {
    const existing = acc[tile.locationId] || [];
    acc[tile.locationId] = [...existing, tile];
    return acc;
  }, {} as Record<string, GenericTile[]>);
}

export function getConnectingTiles(tileId: string) {
  const tile = tiles.find((t) => t.id === tileId)!;
  const connectingPaths = paths.filter(
    (path) => path.from === tile.id || path.to === tile.id
  );
  const connections = connectingPaths.map((path) => ({
    to: path.to === tile.id ? path.from : path.to,
    rule: path.rule,
  }));
  return connections.map((connection) => {
    const target = tiles.find((t) => t.id === connection.to)!;
    const targetCoordinates = getCoordinatesById(target.locationId);
    const tileCoordinates = getCoordinatesById(tile.locationId);
    const isLeft =
      targetCoordinates.x === tileCoordinates.x - 1 &&
      targetCoordinates.y === tileCoordinates.y;
    const isRight =
      targetCoordinates.x === tileCoordinates.x + 1 &&
      targetCoordinates.y === tileCoordinates.y;
    const isUp =
      targetCoordinates.x === tileCoordinates.x &&
      targetCoordinates.y === tileCoordinates.y - 1;
    const isDown =
      targetCoordinates.x === tileCoordinates.x &&
      targetCoordinates.y === tileCoordinates.y + 1;

    let direction = "";
    if (isLeft) direction = "left";
    if (isRight) direction = "right";
    if (isUp) direction = "up";
    if (isDown) direction = "down";

    return {
      ...target,
      direction,
    };
  });
}
