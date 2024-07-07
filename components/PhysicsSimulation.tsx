import { useEffect, useState } from "react";
import { DUMMY_PLAYER_COUNT } from "@/lib/constants";

const DUMMY_PLAYERS: User[] = Array.from(
  { length: DUMMY_PLAYER_COUNT },
  (_, i) => ({
    id: i,
    avatar: `https://api.dicebear.com/9.x/big-smile/svg?seed=${i}`,
    size: Math.floor(Math.random() * 20) + 20,
    side: i % 2 === 0 ? "left" : "right",
  })
);

const PhysicsSimulation: React.FC = () => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch("/api/physics-simulation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ players: DUMMY_PLAYERS }),
    })
      .then((response) => response.text())
      .then((data) => setSvgContent(data));
  }, []);

  return (
    <div className="w-full" dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default PhysicsSimulation;
