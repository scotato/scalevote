declare global {
  type User = {
    id: number;
    avatar: string;
    size: number;
  };

  type Player = User & {
    body: Matter.Body;
  };
}

export {};
