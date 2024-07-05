import { useEffect, useRef } from "react";
import { useWorldStore } from "@/stores/world-store";
import Terminal from "./Terminal";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export default function Chat() {
  const messages = useWorldStore((s) => s.messages);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  return (
    <div className="relative w-full max-w-[520px] h-full">
      <div className="absolute w-full top-0 bottom-0 grow shrink bg-white rounded-xl lg:rounded-3xl flex flex-col justify-end">
        <ScrollArea ref={chatRef}>
          <div className="flex flex-col gap-3 pb-6">
            {messages.map((message, index) => (
              <Message message={message} key={index} />
            ))}
          </div>
        </ScrollArea>
        <Terminal />
      </div>
    </div>
  );
}

function Message({ message }: { message: any }) {
  return (
    <div
      className={`flex gap-2 px-6 ${
        message.role === "assistant" ? "" : "justify-end"
      }`}
    >
      <div
        className={cn(
          "px-3 py-1.5 rounded-2xl text-sm",
          message.role === "assistant"
            ? "bg-gray-100 mr-16 rounded-bl-lg"
            : "bg-blue-500 text-white ml-16 rounded-br-lg"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
