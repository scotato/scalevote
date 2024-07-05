import React, { useEffect, useRef, useState } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Body,
  Composite,
  IRendererOptions,
} from "matter-js";
import { PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CircleStackProps {
  initialPlatformWidth: number;
  initialNumCircles: number;
}

const CircleStack: React.FC<CircleStackProps> = ({
  initialPlatformWidth = 500,
  initialNumCircles = 10,
}) => {
  const [numCircles, setNumCircles] = useState<number>(initialNumCircles);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const circles = useRef<Matter.Body[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create engine and world
    engineRef.current = Engine.create();
    const world = engineRef.current.world;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width: initialPlatformWidth,
        height: 600,
        wireframes: false,
        background: "transparent",
      } as IRendererOptions,
    });

    // Create boundaries
    const ground = Bodies.rectangle(
      initialPlatformWidth / 2,
      610,
      initialPlatformWidth,
      60,
      { isStatic: true }
    );
    const leftWall = Bodies.rectangle(0, 300, 60, 600, { isStatic: true });
    const rightWall = Bodies.rectangle(initialPlatformWidth, 300, 60, 600, {
      isStatic: true,
    });
    Composite.add(world, [ground, leftWall, rightWall]);

    // Function to create a new circle
    const createCircle = (): void => {
      const radius = Math.random() * 20 + 10; // Random radius between 10 and 30
      const circle = Bodies.circle(
        Math.random() * (initialPlatformWidth - 2 * radius) + radius,
        0,
        radius,
        {
          restitution: 0.5,
          friction: 0.1,
          render: {
            fillStyle: `hsl(${Math.random() * 360}, 70%, 50%)`,
          },
        }
      );
      circles.current.push(circle);
      Composite.add(world, circle);
    };

    // Create initial circles
    for (let i = 0; i < numCircles; i++) {
      createCircle();
    }

    // Run the engine
    Engine.run(engineRef.current);
    Render.run(render);

    return () => {
      if (!engineRef.current) return;
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engineRef.current);
      render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      render.textures = {};
    };
  }, [initialPlatformWidth, initialNumCircles]);

  useEffect(() => {
    if (!engineRef.current) return;

    const world = engineRef.current.world;
    const difference = numCircles - circles.current.length;

    if (difference > 0) {
      // Add circles
      for (let i = 0; i < difference; i++) {
        const radius = Math.random() * 20 + 10;
        const circle = Bodies.circle(
          Math.random() * (initialPlatformWidth - 2 * radius) + radius,
          0,
          radius,
          {
            restitution: 0.5,
            friction: 0.1,
            render: {
              fillStyle: `hsl(${Math.random() * 360}, 70%, 50%)`,
            },
          }
        );
        circles.current.push(circle);
        Composite.add(world, circle);
      }
    } else if (difference < 0) {
      // Remove circles
      for (let i = 0; i < -difference; i++) {
        const circleToRemove = circles.current.pop();
        if (circleToRemove) {
          Composite.remove(world, circleToRemove);
        }
      }
    }
  }, [numCircles, initialPlatformWidth]);

  const handleAddCircle = (): void => {
    setNumCircles((prev) => prev + 1);
  };

  const handleRemoveCircle = (): void => {
    setNumCircles((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={sceneRef}
        style={{ width: initialPlatformWidth, height: 600 }}
      />
      <div className="mt-4 flex space-x-4">
        <Button onClick={handleAddCircle} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Circle
        </Button>
        <Button onClick={handleRemoveCircle} className="flex items-center">
          <MinusCircle className="mr-2 h-4 w-4" /> Remove Circle
        </Button>
      </div>
      <p className="mt-2">Number of circles: {numCircles}</p>
    </div>
  );
};

export default CircleStack;
