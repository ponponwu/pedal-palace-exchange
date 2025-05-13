
import { useTranslation } from 'react-i18next';

// Type to handle possible Supabase error responses
export type SelectQueryError<T extends string> = {
  error: true;
} & String;

// Helper function to safely transform data from Supabase
export interface RawMessage {
  id: string;
  message: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
  bicycle_id: string;
  sender: { full_name?: string } | SelectQueryError<string> | null;
  receiver: { full_name?: string } | SelectQueryError<string> | null;
  bicycle: { title?: string } | null;
}

export interface Message {
  id: string;
  message: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
  bicycle_id: string;
  sender?: { full_name?: string } | null;
  receiver?: { full_name?: string } | null;
  bicycle?: { title?: string } | null;
}

// Helper function to transform the data safely
export const transformMessageData = (msg: RawMessage): Message => {
  const transformedMsg: Message = {
    ...msg,
    // Check if sender is an error object (has 'error' property) or is null/undefined
    sender: typeof msg.sender === 'object' && msg.sender !== null && !('error' in msg.sender) 
      ? msg.sender 
      : { full_name: undefined },
    // Check if receiver is an error object (has 'error' property) or is null/undefined
    receiver: typeof msg.receiver === 'object' && msg.receiver !== null && !('error' in msg.receiver) 
      ? msg.receiver 
      : { full_name: undefined },
    // Check if bicycle exists
    bicycle: msg.bicycle || { title: undefined }
  };
  
  return transformedMsg;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Get a unique conversation ID
export const getConversationId = (bicycleId: string, senderId: string, receiverId: string): string => {
  return bicycleId + senderId + receiverId;
};
