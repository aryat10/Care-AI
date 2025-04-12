
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Activity, Loader2, SendHorizonal, Bandage } from 'lucide-react';
import { postSymptoms, getFirstAid } from '@/services/apiService';
import ChatMessage from './ChatMessage';
import FirstAidSelect from './FirstAidSelect';
import { useToast } from '@/components/ui/use-toast';

// Type for chat messages
interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: string;
}

const MedicalChatInterface = () => {
  const [activeTab, setActiveTab] = useState('symptoms');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to generate timestamp for messages
  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  // Add welcome message when component mounts
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        content: 'Hi there! I’m CareAI, your Medical Assistant. How can I help you today? You can describe your symptoms or select a first-aid condition.',
        type: 'bot',
        timestamp: getTimestamp(),
      },
    ]);
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle submission of symptoms
  const handleSymptomsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await postSymptoms(userMessage.content);
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.advice,
          type: 'bot',
          timestamp: getTimestamp(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 500); // Small delay to make the conversation feel more natural
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get medical advice. Please try again later.",
      });
    }
  };

  // Function to handle first aid condition selection
  const handleFirstAidSelect = async (condition: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: `I need first-aid information for ${condition}`,
      type: 'user',
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getFirstAid(condition);
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.firstAid,
          type: 'bot',
          timestamp: getTimestamp(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 500); // Small delay to make the conversation feel more natural
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get first-aid information. Please try again later.",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-medical-blue to-medical-teal text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Care AI
        </h2>
        <p className="text-sm opacity-80">Get health advice and first-aid tips</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="symptoms" className="flex items-center gap-1">
            <Stethoscope className="h-4 w-4" />
            <span>Symptoms</span>
          </TabsTrigger>
          <TabsTrigger value="firstaid" className="flex items-center gap-1">
            <Bandage className="h-4 w-4" />
            <span>First Aid</span>
          </TabsTrigger>
        </TabsList>

        <div className="p-4 h-[400px] overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                type={message.type}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 text-medical-blue animate-spin" />
                <span className="ml-2 text-sm text-gray-500">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <TabsContent value="symptoms" className="m-0 p-4 border-t">
          <form onSubmit={handleSymptomsSubmit} className="flex gap-2">
            <Input
              placeholder="Describe your symptoms..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-medical-blue hover:bg-medical-dark"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizonal className="h-4 w-4" />
              )}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="firstaid" className="m-0 p-4 border-t">
          <FirstAidSelect 
            onSelect={handleFirstAidSelect} 
            disabled={isLoading} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalChatInterface;
