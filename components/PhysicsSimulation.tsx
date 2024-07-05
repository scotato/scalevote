import { useEffect, useState } from "react";

const PhysicsSimulation: React.FC = () => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch("/api/physics-simulation")
      .then((response) => response.text())
      .then((data) => setSvgContent(data));
  }, []);

  return (
    <div className="w-full" dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default PhysicsSimulation;
