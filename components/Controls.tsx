import { useEffect, useState } from "react";
import { useWorldStore } from "@/stores/world-store";
import { Button } from "./ui/button";

const Controls: React.FC = () => {
  const [players, addUser, reset] = useWorldStore((state) => [
    state.users,
    state.addUser,
    state.reset,
  ]);
  const playersLeft = players.filter((player) => player.side === "left");
  const playersRight = players.filter((player) => player.side === "right");
  const playerCount = players.length;
  const playerCountLeft = playersLeft.length;
  const playerCountRight = playersRight.length;
  const size = players.reduce((acc, player) => acc + player.size, 0);
  const sideLeft = playersLeft.reduce((acc, player) => acc + player.size, 0);
  const sideRight = playersRight.reduce((acc, player) => acc + player.size, 0);

  return (
    <div className="w-full p-6 flex flex-col gap-3">
      <div>
        <ControlDetails title="Total Players">{playerCount}</ControlDetails>
        <ControlDetails title="Total Size">{size}</ControlDetails>
        <ControlDetails title="Left Players">{playerCountLeft}</ControlDetails>
        <ControlDetails title="Left Size">{sideLeft}</ControlDetails>
        <ControlDetails title="Right Players">
          {playerCountRight}
        </ControlDetails>
        <ControlDetails title="Right Size">{sideRight}</ControlDetails>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => addUser()}>Add Player</Button>
        <Button onClick={() => addUser("left")}>Add Left</Button>
        <Button onClick={() => addUser("right")}>Add Right</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
};

function ControlDetails({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between">
      <p>{title}</p>
      <p>{children}</p>
    </div>
  );
}

export default Controls;
