declare global {
  type PathRule = {
    requirement: string;
  };

  type WorldPath = {
    from: string;
    to: string;
    rule: PathRule;
  };

  type GenericTile = {
    id: string;
    name: string;
    type: string;
    locationId: string;
    image?: string;
  };

  type Item = {
    name: string;
    description: string;
    image: string;
    quantity: number;
    stackable: boolean;
    slot?:
      | "head"
      | "body"
      | "feet"
      | "one-hand"
      | "two-hand"
      | "off-hand"
      | "accessory";
  };

  type Effect = {
    name: string;
    description: string;
    duration: number;
    image: string;
  };

  type CharacterTile = GenericTile & {
    bio: string;
    image: string;
    inventory: Item[];
    coins: number;
    messages: Record<string, Message[]>;
  };

  type Message = {
    role: string;
    content: string;
    tool_call_id?: string;
    name?: string;
  };
}

export {};
