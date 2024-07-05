import {
  getPathCoordinates,
  pathTypeForRequirement,
  rotatePath,
} from "@/lib/paths";

type Rule = {
  requirement: string;
};

type Path = {
  from: string;
  to: string;
  rule: Rule;
};

export default function Path({ path }: { path: Path }) {
  const { fromX, fromY, toX, toY } = getPathCoordinates(path.from, path.to);
  return (
    <g
      transform={`translate(${fromX}, ${fromY}) ${rotatePath(
        fromX,
        fromY,
        toX,
        toY
      )}`}
      transform-origin="0 0"
      key={[fromX, fromY, toX, toY].join("-")}
    >
      <use href={`#${pathTypeForRequirement(path.rule.requirement)}`} />
    </g>
  );
}
