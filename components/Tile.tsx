import { getCoordinatesById } from "@/lib/world";

export default function Tile({ tile }: { tile: GenericTile }) {
  const tileSize = 200;
  const { x, y } = getCoordinatesById(tile.id);

  return (
    <g transform={`translate(${x * tileSize}, ${y * tileSize})`} key={tile.id}>
      <use href={`#${tile.type}`} />
      <text x="4" y="-4" dy="1.5em" textAnchor="left" fontSize="12" opacity="0">
        {tile.id}
      </text>
    </g>
  );
}
