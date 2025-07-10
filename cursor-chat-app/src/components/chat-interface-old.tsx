"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsPanel } from "./settings-panel";
import { ReasoningMessage } from "./reasoning-message";
import { MarkdownContent } from "./markdown-content";
import { BrandedHeader } from "./branded-header";
import { Sidebar } from "./sidebar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Settings state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [model, setModel] = useState("deepseek-ai/DeepSeek-R1-0528-Turbo");

  // Check if current model is a reasoning model
  const isReasoningModel = (modelName: string) => {
    const reasoningModels = [
      "deepseek-ai/DeepSeek-R1",
      "deepseek-ai/DeepSeek-R1-0528-Turbo",
      "openai/o1",
      "openai/o1-mini",
    ];
    return reasoningModels.some(rm => modelName.includes(rm));
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage.text,
          temperature: temperature,
          model: model
        }),
      });
      const data = await res.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Erreur lors de la connexion au LLM.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  // Convert messages for export
  const exportMessages = messages.map(msg => ({
    role: msg.sender === "user" ? "user" as const : "assistant" as const,
    content: msg.text,
    timestamp: msg.timestamp
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onClearChat={clearChat}
        messages={exportMessages}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <BrandedHeader model={model} temperature={temperature} />
        
        {/* Chat Content */}
        <Card className="flex-1 flex flex-col m-4 mt-0 rounded-t-none shadow-lg">
          <CardContent className="flex-1 flex flex-col p-6">
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          message.sender === "user"
                            ? "https://github.com/shadcn.png"
                            : "https://github.com/github.png"
                        }
                      />
                      <AvatarFallback>
                        {message.sender === "user" ? "U" : "B"}
                      </AvatarFallback>
                    </Avatar>
                    {message.sender === "user" ? (
                      <div className="bg-blue-500 text-white rounded-lg px-3 py-2">
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    ) : (
                      // Use reasoning component for bot messages if reasoning model
                      isReasoningModel(model) ? (
                        <ReasoningMessage 
                          content={message.text} 
                          timestamp={message.timestamp} 
                        />
                      ) : (
                        <div className="bg-gray-100 text-gray-900 rounded-lg px-3 py-2">
                          <MarkdownContent 
                            content={message.text} 
                            className="text-sm leading-relaxed"
                          />
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://github.com/github.png" />
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                                          <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={isLoading || !inputValue.trim()}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        temperature={temperature}
        onTemperatureChange={setTemperature}
        model={model}
        onModelChange={setModel}
      />
    </div>
  );
} 