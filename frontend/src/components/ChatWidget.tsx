import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useMutation } from "@tanstack/react-query";
import { Send, Bot, User, X, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { apiService, type ChatResponse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

export interface ChatWidgetRef {
  openWidget: () => void;
  closeWidget: () => void;
  toggleWidget: () => void;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI shopping assistant. I remember your preferences and can help you find the perfect products. What are you looking for today?",
    sender: "ai",
    timestamp: new Date(),
    suggestions: [
      "Show me electronics under $200",
      "Find ergonomic office furniture",  
      "Recommend gifts for tech lovers",
      "What's trending in smart home?"
    ]
  }
];

const ChatWidget = forwardRef<ChatWidgetRef>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mutation for sending messages to API
  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => apiService.sendMessage(message),
    onSuccess: (response: ChatResponse) => {
      const aiMessage: Message = {
        id: Date.now().toString() + '-ai',
        content: response.response,
        sender: "ai",
        timestamp: new Date(response.timestamp),
        suggestions: generateSuggestions(response.response)
      };
      setMessages(prev => [...prev, aiMessage]);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateSuggestions = (response: string): string[] => {
    const suggestions = [
      "Show me similar products",
      "What's the best price?",
      "Compare with alternatives", 
      "Check customer reviews",
      "Find matching accessories",
      "Show me deals and discounts"
    ];
    
    return suggestions.slice(0, 4);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sendMessageMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue("");
    
    sendMessageMutation.mutate(messageToSend);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const openWidget = () => {
    setIsOpen(true);
  };

  const closeWidget = () => {
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openWidget,
    closeWidget,
    toggleWidget,
  }));

  return (
    <>
      {/* Chat Widget */}
      <div className={cn(
        "fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-0"
      )}>
        {isOpen && (
          <ResizablePanelGroup
            direction="horizontal"
            className="mb-4 min-w-[320px] min-h-[300px] max-w-[600px] max-h-[700px]"
          >
            <ResizablePanel defaultSize={100} minSize={30}>
              <Card className="w-full h-full glass shadow-2xl border-border/50 flex flex-col">
                {/* Header */}
                <CardHeader className="pb-3 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full gradient-primary">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">AI Assistant</CardTitle>
                        <p className="text-xs text-muted-foreground">Always here to help</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleWidget}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-2",
                          message.sender === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.sender === "ai" && (
                          <div className="p-1 rounded-full gradient-primary flex-shrink-0 mt-1">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                        )}

                        <div className={cn(
                          "max-w-[85%]",
                          message.sender === "user" ? "order-first" : ""
                        )}>
                          <div className={cn(
                            "rounded-lg px-3 py-2 text-sm",
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-muted"
                          )}>
                            <p>{message.content}</p>
                            <p className={cn(
                              "text-xs mt-1 opacity-70",
                              message.sender === "user" ? "text-primary-foreground" : "text-muted-foreground"
                            )}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>

                          {/* AI Suggestions */}
                          {message.sender === "ai" && message.suggestions && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="text-xs h-6 px-2 hover-scale"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>

                        {message.sender === "user" && (
                          <div className="p-1 rounded-full bg-accent flex-shrink-0 mt-1">
                            <User className="h-3 w-3 text-accent-foreground" />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {sendMessageMutation.isPending && (
                      <div className="flex gap-2">
                        <div className="p-1 rounded-full gradient-primary flex-shrink-0 mt-1">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-3 w-3 animate-spin text-primary" />
                            <span className="text-xs text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-3 border-t border-border/50">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="text-sm"
                      disabled={sendMessageMutation.isPending}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || sendMessageMutation.isPending}
                      size="sm"
                      className="px-3"
                    >
                      {sendMessageMutation.isPending ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Send className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={0} minSize={0} maxSize={0} />
          </ResizablePanelGroup>
        )}

        {/* Toggle Button */}
        <Button
          onClick={toggleWidget}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg gradient-primary hover-glow transition-all duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    </>
  );
});

export default ChatWidget;