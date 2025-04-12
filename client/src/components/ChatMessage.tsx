import React from 'react';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';

type MessageType = 'user' | 'bot';

interface ChatMessageProps {
  message: string;
  type: MessageType;
  timestamp?: string;
}

const ChatMessage = ({ message, type, timestamp }: ChatMessageProps) => {
  // Split by newlines and handle bullets
  const formattedMessage = message.split('\n').map((line, index) => {
    if (line.trim().startsWith('-')) {
      return <li key={index} className="ml-4 list-disc">{line.trim().substring(1).trim()}</li>;
    }
    return <p key={index}>{line}</p>;
  });

  return (
    <div 
      className={cn(
        "flex items-start gap-2.5 animate-slide-up mb-4 max-w-[70%]", // Adjusted to 70% for readability
        type === 'user' ? 'ml-auto' : 'mr-auto'
      )}
    >
      {type === 'bot' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-medical-teal flex items-center justify-center text-white">
          <Bot size={18} />
        </div>
      )}
      
      <div
        className={cn(
          "p-3 rounded-lg shadow-sm", // Reduced padding to 3 for tighter look
          type === 'user' 
            ? "bg-medical-blue text-white rounded-tr-none" 
            : "bg-medical-light text-gray-800 rounded-tl-none border border-gray-200"
        )}
      >
        <ul className="list-none">{formattedMessage}</ul> {/* Use ul for better bullet rendering */}
        
        {timestamp && (
          <div 
            className={cn(
              "text-xs mt-1", 
              type === 'user' ? "text-blue-100" : "text-gray-500"
            )}
          >
            {timestamp}
          </div>
        )}
      </div>
      
      {type === 'user' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-medical-blue flex items-center justify-center text-white">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;