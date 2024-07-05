import worldTiles from "@/lib/tiles.json";
import paths from "@/lib/paths.json";
import Path from "@/components/Path";
import Paths from "@/components/Paths";
import Tile from "@/components/Tile";
import Tiles from "@/components/Tiles";
import TileGrid, { PFPMask } from "@/components/TileGrid";
import { useWorldTiles } from "@/stores/world-store";

export default function WorldMap() {
  const tiles = useWorldTiles();

  return (
    <svg
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      className="rounded-xl lg:rounded-3xl grow shrink-0 lg:shrink"
    >
      <defs>
        <Tiles />
        <Paths />
        <PFPMask />
      </defs>
      <g id="paths">
        {paths.map((path) => (
          <Path path={path} key={[path.from, path.to].join("-")} />
        ))}
      </g>
      <g id="world-tiles">
        {worldTiles.map((tile) => (
          <Tile tile={tile} key={tile.id} />
        ))}
      </g>
      <g id="tiles">
        {Object.keys(tiles).map((key) => (
          <TileGrid tiles={tiles[key]} key={key} />
        ))}
      </g>
    </svg>
  );
}
