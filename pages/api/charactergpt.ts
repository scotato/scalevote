import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  choices: { text: string }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt, player, messages } = req.body;

  try {
    const newMessages = [
      {
        role: "system",
        content: `We're playing a multiplayer chat based online game called Overworld where players traverse a map to complete quests, find hidden treasures, and work together to unlock new areas and content. You are the game master and interface for this game, you will be provided a list of tools and actions that the player can take, if they seem unclear what their options are you sould notify them. respond in about a sentence. don't mention locationId when talking to the player.`,
      },
      ...messages,
      {
        role: "system",
        content: `Player and world context: ${JSON.stringify({
          player,
        })}`,
      },
    ];
    if (prompt) newMessages.push({ role: "user", content: prompt });
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: newMessages,
        // tools: tools,
        // tool_choice: "auto", // auto is default, but we'll be explicit
      }),
    });

    const data: Data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
