import tiles from "@/lib/tiles.json";
import { getCoordinatesById } from "@/lib/world";

export function getPathCoordinates(from: string, to: string) {
  const tileSize = 200;
  const fromTile = tiles.find((tile) => tile.id === from);
  const toTile = tiles.find((tile) => tile.id === to);
  if (!fromTile || !toTile) throw new Error("Invalid path");
  const fromCoordinates = getCoordinatesById(from);
  const toCoordinates = getCoordinatesById(to);
  const fromX = fromCoordinates.x * tileSize + tileSize / 2;
  const fromY = fromCoordinates.y * tileSize + tileSize / 2;
  const toX = toCoordinates.x * tileSize + tileSize / 2;
  const toY = toCoordinates.y * tileSize + tileSize / 2;
  return { fromX, fromY, toX, toY };
}

export function rotatePath(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) {
  const angle = (Math.atan2(toY - fromY, toX - fromX) * 180) / Math.PI;
  return `rotate(${angle})`;
}

export function pathTypeForRequirement(requirement: string) {
  switch (requirement) {
    case "none":
      return "road";
    case "locked":
      return "locked";
    case "offering":
      return "secret";
  }
}
