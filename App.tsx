import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { initializeChat } from './services/geminiService';
import type { ChatMessage as Message } from './types';
import { MessageSender } from './types';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const newChat = initializeChat();
      setChat(newChat);
      setMessages([
        {
          sender: MessageSender.MODEL,
          text: 'Salam! Mən WhatsMARK. Necə kömək edə bilərəm?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    };
    init();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !chat || isLoading) return;

    const userMessage: Message = {
      sender: MessageSender.USER,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const modelMessagePlaceholder: Message = {
        sender: MessageSender.MODEL,
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage, modelMessagePlaceholder]);
    setIsLoading(true);

    try {
      const stream = await chat.sendMessageStream({ message: text });
      
      let accumulatedText = '';
      for await (const chunk of stream) {
        accumulatedText += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if(lastMessage && lastMessage.sender === MessageSender.MODEL) {
                newMessages[newMessages.length - 1] = {
                    ...lastMessage,
                    text: accumulatedText
                };
            }
            return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      const errorMessageText = 'Üzr istəyirəm, bir xəta baş verdi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.';
       setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
           if(lastMessage && lastMessage.sender === MessageSender.MODEL) {
              newMessages[newMessages.length - 1] = {
                  ...lastMessage,
                  text: errorMessageText,
              };
           }
          return newMessages;
      });
    } finally {
        setIsLoading(false);
    }
  }, [chat, isLoading]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-[#111b21] shadow-2xl">
        <ChatHeader />
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 chat-bg">
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
            ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
