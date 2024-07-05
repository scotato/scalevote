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
          x_coordinate: {
            type: "integer",
            description: "The x coordinate of the player on a grid",
          },
          y_coordinate: {
            type: "integer",
            description: "The y coordinate of the player on a grid",
          },
        },
        required: ["x_coordinate", "y_coordinate"],
      },
    },
  },
  // a function to get the players current location
  {
    type: "function",
    function: {
      name: "get_player_location",
      description: "Get the player's current location and connecting tiles",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
];

// async function runConversation(messages: Message[], sup) {
//   const messageStore = sup.retrieve("messages") || [];
//   // Step 1: get a response from the model
//   const response = await getChatCompletion(
//     {
//       model: "gpt-4o",
//       messages: messages,
//       tools: tools,
//       tool_choice: "auto", // auto is default, but we'll be explicit
//     },
//     sup
//   );

//   // don't need to run tools, abort
//   if (response.choices[0].finish_reason === "stop") {
//     sup.store("messages", [
//       ...messageStore,
//     {
//       role: "user",
//       content: sup.input,
//     },
//     {
//       role: "assistant",
//       content: response.choices[0].message.content,
//     }]);
//     return response.choices;
//   }
//   const responseMessage = response.choices[0].message;

//   // Step 2: check if the model wanted to call a function
//   const toolCalls = responseMessage.tool_calls;
//   if (responseMessage.tool_calls) {
//     // Step 3: call the function
//     // Note: the JSON response may not always be valid; be sure to handle errors
//     const availableFunctions = {
//       move_player: movePlayer,
//       // get_connecting_tiles: getConnectingTiles,
//       // get_player_location: getPlayerLocation,
//     }; // only one function in this example, but you can have multiple
//     messages.push(responseMessage); // extend conversation with assistant's reply
//     for (const toolCall of toolCalls) {
//       const functionName = toolCall.function.name;
//       const functionToCall = availableFunctions[functionName];
//       const functionArgs = JSON.parse(toolCall.function.arguments);
//       const functionResponse = functionToCall(
//         functionArgs.x_coordinate,
//         functionArgs.y_coordinate,
//         sup
//       );
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
//       },
//       sup
//     ); // get a new response from the model where it can see the function response
//     sup.store("messages", [
//       ...messageStore,
//       {
//         role: "user",
//         content: sup.input,
//       },
//       {
//         role: "assistant",
//         content: secondResponse.choices[0].message.content,
//       }
//     ]);
//     return secondResponse.choices;
//   }
// }

// const apiUrl = "https://api.openai.com/v1/chat/completions";

// async function getChatCompletion(options, sup) {
//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sup.secret("apiKey")}`,
//       },
//       body: JSON.stringify(options),
//     });

//     // Parse the JSON response
//     return await response.json();
//   } catch (error) {
//     throw new Error("Error:", error);
//   }
// }
