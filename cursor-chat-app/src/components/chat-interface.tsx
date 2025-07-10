"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Bot } from "lucide-react";
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
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/chat", {
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
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Error connecting to LLM service.",
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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
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
        <Card className="flex-1 flex flex-col m-4 mt-0 rounded-t-none shadow-xl border-0 bg-white/80 backdrop-blur-sm">
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
                      className={`flex items-start gap-3 max-w-[80%] ${
                        message.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                                             <Avatar className="w-8 h-8 ring-2 ring-white shadow-md">
                         <AvatarFallback className={
                           message.sender === "user" 
                             ? "bg-blue-500 text-white" 
                             : "bg-purple-500 text-white"
                         }>
                           {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                         </AvatarFallback>
                       </Avatar>
                      
                      {message.sender === "user" ? (
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl px-4 py-3 shadow-lg">
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className="text-xs opacity-80 mt-2">
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
                          <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
                            <MarkdownContent 
                              content={message.text} 
                              className="text-sm leading-relaxed"
                            />
                            <p className="text-xs text-gray-500 mt-2">
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
                    <div className="flex items-start gap-3">
                                             <Avatar className="w-8 h-8 ring-2 ring-white shadow-md">
                         <AvatarFallback className="bg-purple-500 text-white">
                           <Bot className="w-4 h-4" />
                         </AvatarFallback>
                       </Avatar>
                      <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input Area */}
            <div className="flex gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 border-0 bg-white/80 backdrop-blur-sm shadow-sm"
              />
              <Button 
                onClick={sendMessage} 
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              >
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