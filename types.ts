
export enum MessageSender {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  sender: MessageSender;
  text: string;
  timestamp: string;
}
