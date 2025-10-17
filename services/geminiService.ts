import { GoogleGenAI, Chat } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const initializeChat = (): Chat => {
  const model = 'gemini-2.5-flash';
  return ai.chats.create({
    model,
    config: {
      systemInstruction: "You are WhatsMARK, a friendly and witty AI assistant that communicates in Azerbaijani. You're chatting within a user interface that looks like WhatsApp. Keep your responses conversational and helpful.",
    },
  });
};
