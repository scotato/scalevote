import { useEffect, useState } from "react";
import { useWorldStore } from "@/stores/world-store";

const PhysicsSimulation: React.FC = () => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [players] = useWorldStore((state) => [state.users]);

  useEffect(() => {
    fetch("/api/physics-simulation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ players }),
    })
      .then((response) => response.text())
      .then((data) => setSvgContent(data));
  }, [players]);

  return (
    <div className="w-full" dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default PhysicsSimulation;
