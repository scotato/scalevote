import { NextApiRequest, NextApiResponse } from "next";

const tools = [
  {
    type: "function",
    function: {
      name: "move_player",
      description:
        "Move the player to a new location and get the connecting tiles",
      parameters: {
        type: "object",
        properties: {
          locationId: {
            type: "string",
            description: "The tile id on the world grid",
          },
        },
        required: ["locationId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "talk_to_character",
      description:
        "Talk to a Character and get a response. The Character must be on the same tile as the player.",
      parameters: {
        type: "object",
        properties: {
          characterId: {
            type: "string",
            description: "The ID of the Character.",
          },
          message: {
            type: "string",
            description: "The message to send to the Character.",
          },
        },
        required: ["characterId", "message"],
      },
    },
  },
];

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

  const { prompt, player, tileData, messages, allowedPlayerMoves } = req.body;

  // if (!prompt) {
  //   return res.status(400).json({ message: "Prompt is required" });
  // }

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
          tileData,
          allowedPlayerMoves,
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
        tools: tools,
        tool_choice: "auto", // auto is default, but we'll be explicit
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

//

// async function runConversation(messages) {
//   // Step 1: get a response from the model
//   const response = await getChatCompletion(
//     {
//       model: "gpt-4o",
//       messages: messages,
//       tools: tools,
//       tool_choice: "auto", // auto is default, but we'll be explicit
//     }
//   );

//   // don't need to run tools, abort
//   if (response.choices[0].finish_reason === "stop") {
//     // sup.store("messages", [
//     //   ...messageStore,
//     // {
//     //   role: "user",
//     //   content: sup.input,
//     // },
//     // {
//     //   role: "assistant",
//     //   content: response.choices[0].message.content,
//     // }]);
//     // return response.choices;
//   }
//   const responseMessage = response.choices[0].message;

//   // Step 2: check if the model wanted to call a function
//   const toolCalls = responseMessage.tool_calls;
//   if (responseMessage.tool_calls) {
//     // Step 3: call the function
//     // Note: the JSON response may not always be valid; be sure to handle errors
// const availableFunctions = {
//   move_player: movePlayer,
//   // get_connecting_tiles: getConnectingTiles,
//   // get_player_location: getPlayerLocation,
// }; // only one function in this example, but you can have multiple

//     messages.push(responseMessage); // extend conversation with assistant's reply

//     for (const toolCall of toolCalls) {
//       const functionName = toolCall.function.name;
//       const functionToCall = availableFunctions[functionName];
//       const functionArgs = JSON.parse(toolCall.function.arguments);
//       const functionResponse = functionToCall(functionArgs.locationId);
//       messages.push({
//         tool_call_id: toolCall.id,
//         role: "tool",
//         name: functionName,
//         content: functionResponse,
//       }); // extend conversation with function response
//     }

//     const secondResponse = await getChatCompletion(
//       {
//         model: "gpt-4o",
//         messages: messages,
//       }
//       // sup
//     ); // get a new response from the model where it can see the function response
//     // sup.store("messages", [
//     //   ...messageStore,
//     //   {
//     //     role: "user",
//     //     content: sup.input,
//     //   },
//     //   {
//     //     role: "assistant",
//     //     content: secondResponse.choices[0].message.content,
//     //   }
//     // ]);
//     return secondResponse.choices;
//   }
// }

// async function getChatCompletion(options: any) {
//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify(options),
//     });

//     // Parse the JSON response
//     return await response.json();
//   } catch (error) {
//     throw new Error("Error: something failed during chat completion request");
//   }
// }
