
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, UserCheck } from 'lucide-react'; // Added UserCheck
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system'; // Added system sender for specific messages
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: "Hello! I'm MindLink Bot. How can I help you today? You can ask for 'human support' if you need to talk to someone.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const newUserMessage: ChatMessage = { id: String(Date.now()), text: inputValue, sender: 'user' };
    
    let botResponseText = "I'm still learning, but I'm here to listen. For specific help, please check our Resources page or contact a professional. If you'd like to connect with human support, please type 'request human support'.";
    
    if (inputValue.toLowerCase().includes("sad") || inputValue.toLowerCase().includes("hopeless")) {
        botResponseText = "I hear that you're feeling " + (inputValue.toLowerCase().includes("sad") ? "sad" : "hopeless") + ". It's okay to feel this way. Remember, you're not alone. Talking about it can help. If these feelings are overwhelming, consider reaching out for human support by typing 'request human support' or using the 'Help Now' button.";
    } else if (inputValue.toLowerCase().includes("help") && !inputValue.toLowerCase().includes("human support")) {
        botResponseText = "If you need urgent help, please use the 'Help Now' button or contact emergency services. You can also find resources on our 'Resources' page. For direct support through chat, type 'request human support'.";
    } else if (inputValue.toLowerCase().includes("request human support") || inputValue.toLowerCase().includes("human support")) {
        const supportMessage: ChatMessage = { id: String(Date.now() + 1), text: "Connecting you to human support is a feature we're working on. For now, please use the 'Help Now' button for urgent assistance or check the 'Resources' page for professional contacts. We're here to support you.", sender: 'system'};
        setMessages(prev => [...prev, newUserMessage, supportMessage]);
        setInputValue('');
        return;
    }

    const newBotMessage: ChatMessage = { id: String(Date.now() + 1), text: botResponseText, sender: 'bot' };
    
    setMessages(prev => [...prev, newUserMessage, newBotMessage]);
    setInputValue('');
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 left-4 rounded-full p-4 shadow-xl z-50 bg-lavender-medium hover:bg-lavender-dark"
        onClick={toggleChat}
        aria-label="Open Chat"
      >
        <MessageCircle size={28} className="text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 left-4 w-80 h-[28rem] shadow-xl z-50 flex flex-col bg-white border-lavender">
      <CardHeader className="flex flex-row items-center justify-between p-3 bg-lavender-light border-b border-lavender">
        <CardTitle className="text-md font-semibold text-deep-purple">Support Chat</CardTitle>
        <Button variant="ghost" size="icon" onClick={toggleChat} className="text-deep-purple hover:bg-lavender">
          <X size={20} />
        </Button>
      </CardHeader>
      <ScrollArea className="flex-grow p-3">
        <div className="space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-2 rounded-lg text-sm ${
                msg.sender === 'user' 
                  ? 'bg-lavender-medium text-white' 
                  : msg.sender === 'bot' 
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-300 w-full' // System message style
              }`}>
                {msg.sender === 'system' && <UserCheck size={16} className="inline mr-1 mb-0.5" />}
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <CardFooter className="p-3 border-t border-lavender">
        <div className="flex w-full space-x-2">
          <Input 
            type="text" 
            placeholder="Type a message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow"
          />
          <Button onClick={handleSendMessage} className="bg-lavender-medium hover:bg-lavender-dark">Send</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatWidget;
