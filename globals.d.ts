declare global {
  type User = {
    id: number;
    avatar: string;
    size: number;
    side: "left" | "right";
    color: string;
  };

  type Player = User & {
    body: Matter.Body;
  };
}

export {};
