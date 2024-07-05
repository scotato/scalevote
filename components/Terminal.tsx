import { useState } from "react";
import { Input } from "@/components/ui/input";
import { usePlayer, useWorldStore } from "@/stores/world-store";

async function fetchGameGptResponse(payload: any) {
  const response = await fetch("/api/gamegpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return data.choices
    ? data.choices[0]
    : { message: { role: "assistant", content: data.message } };
}

async function fetchCharacterGptResponse(payload: any) {
  const response = await fetch("/api/charactergpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return data.choices
    ? data.choices[0]
    : { message: { role: "assistant", content: data.message } };
}

function Terminal() {
  const { player, tileData, updatePlayer, allowedPlayerMoves } = usePlayer();
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [messages, addMessage, reset, players, npcs, updateNpc] = useWorldStore(
    (s) => [s.messages, s.addMessage, s.reset, s.players, s.npcs, s.updateNPC]
  );

  async function movePlayer({ locationId }: { locationId: string }) {
    updatePlayer({ ...player, locationId });
    return `${player.name} moved to ${locationId}`;
  }

  async function talkToCharacter({
    characterId,
    message: content,
  }: {
    characterId: string;
    message: string;
  }) {
    const character = [...players, ...npcs].find((t) => t.id === characterId);
    if (!character) return "Character not found";

    const message = { role: "user", content } as Message;
    const oldMessages = character.messages[player.id] || [];
    const messages = [...oldMessages, message];
    const data = await fetchCharacterGptResponse({
      prompt,
      messages,
      player,
      character,
    });
    messages.push(data.message);
    // then update the character with the new messages
    addMessage({ role: "assistant", content: data.message.content });
    setResponse(data.message.content);
    console.log({ messages, data });
    updateNpc({
      ...character,
      messages: { ...character.messages, [player.id]: messages },
    });

    return `noop`;
  }

  const availableFunctions = {
    move_player: movePlayer,
    talk_to_character: talkToCharacter,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = { role: "user", content: prompt } as Message;
    setPrompt("");
    if (prompt === "reset") return reset();
    addMessage(message);
    const newMessages = [message];
    const data = await fetchGameGptResponse({
      prompt,
      messages: [...messages, message],
      player,
      tileData,
      allowedPlayerMoves,
    });

    newMessages.push(data.message);

    if (data.message.tool_calls) {
      for (const toolCall of data.message.tool_calls) {
        const functionName = toolCall.function
          .name as keyof typeof availableFunctions;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const functionResponse = await functionToCall(functionArgs);

        if (functionResponse !== "noop") {
          newMessages.push({
            tool_call_id: toolCall.id,
            role: "tool",
            name: functionName,
            content: functionResponse,
          });
        }
      }
    }

    if (data.message.content) {
      addMessage({ role: "assistant", content: data.message.content });
      setResponse(data.message.content);
    } else if (newMessages.length > 2) {
      // send tool responses
      const toolResponse = await fetchGameGptResponse({
        prompt: "",
        messages: [...messages, ...newMessages],
        player,
        tileData,
        allowedPlayerMoves,
      });

      addMessage({ role: "assistant", content: toolResponse.message.content });
      setResponse(toolResponse.message.content);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 pt-0">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
      </form>
    </div>
  );
}

export default Terminal;
