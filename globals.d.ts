declare global {
  type User = {
    id: number;
    avatar: string;
    size: number;
    side: "left" | "right";
  };

  type Player = User & {
    body: Matter.Body;
  };
}

export {};
