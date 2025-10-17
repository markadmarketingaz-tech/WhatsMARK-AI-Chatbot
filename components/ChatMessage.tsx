
import React from 'react';
import type { ChatMessage as Message } from '../types';
import { MessageSender } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ReadReceipts: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    className="w-4 h-4 ml-1 inline-block text-blue-500"
    fill="currentColor"
  >
    <path
      d="M17.394 5.035l-.57-.444a.434.434 0 00-.609.076l-6.39 8.198a.37.37 0 01-.52.065l-2.529-2.22a.435.435 0 00-.593.131l-.466.655a.434.434 0 00.124.62l3.295 2.893a.37.37 0 00.518-.056l7.08-9.086a.435.435 0 00-.07-.638z"
    />
    <path
      d="M12.502 5.035l-.57-.444a.434.434 0 00-.609.076l-6.39 8.198a.37.37 0 01-.52.065l-.8-.7a.434.434 0 00-.593.131l-.466.654a.434.434 0 00.124.62l1.55 1.357a.37.37 0 00.518-.056l7.08-9.086a.435.435 0 00-.07-.638z"
    />
  </svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;
  const isModel = message.sender === MessageSender.MODEL;

  const bubbleClasses = isUser
    ? 'bg-[#d9fdd3] dark:bg-[#005c4b] self-end rounded-lg rounded-br-none'
    : 'bg-white dark:bg-[#202c33] self-start rounded-lg rounded-bl-none';
  
  const textClasses = 'text-gray-800 dark:text-gray-100';
  const animationClass = isUser ? 'animate-fade-in-right' : 'animate-fade-in-left';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-3 py-2 max-w-[80%] sm:max-w-[70%] md:max-w-[60%] shadow ${bubbleClasses} ${animationClass}`}>
        {/* FIX: Display a typing indicator for model messages that are loading (have empty text). */}
        {isModel && !message.text ? (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        ) : (
          <p className={`text-sm ${textClasses} whitespace-pre-wrap`}>{message.text}</p>
        )}
        <div className="flex items-center justify-end mt-1">
          <p className={`text-xs ${isUser ? 'text-gray-500/70 dark:text-gray-400/70' : 'text-gray-500 dark:text-gray-400'}`}>
            {message.timestamp}
          </p>
          {isUser && <ReadReceipts />}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
