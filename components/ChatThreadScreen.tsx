import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { SlackChatInterface } from './SlackChatInterface';
import { Conversation, Message, User } from '../types';

interface ChatThreadScreenProps {
  conversation: Conversation;
  messages: Message[];
  currentUser: User;
  onBackToInbox: () => void;
  onSendMessage: (content: string) => void;
  onReactToMessage: (messageId: string, emoji: string) => void;
  onEditMessage: (messageId: string, newContent: string) => void;
  onViewPatient?: (patientId: string) => void;
}

export function ChatThreadScreen({ 
  conversation, 
  messages, 
  currentUser, 
  onBackToInbox, 
  onSendMessage,
  onReactToMessage,
  onEditMessage,
  onViewPatient
}: ChatThreadScreenProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={onBackToInbox}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="font-semibold text-foreground">{conversation.name}</h2>
            <p className="text-sm text-foreground-secondary">
              {conversation.type === 'patient' ? 'Patient' : 'Team'} • {conversation.participants.length} Teilnehmer
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {conversation.patientId && onViewPatient && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewPatient(conversation.patientId!)}
            >
              Patientenakte →
            </Button>
          )}
        </div>
      </div>
      
      {/* Chat Interface */}
      <SlackChatInterface
        messages={messages}
        currentUser={currentUser}
        onSendMessage={onSendMessage}
        onReactToMessage={onReactToMessage}
        onReplyToMessage={(messageId) => console.log('Reply to:', messageId)}
        onEditMessage={onEditMessage}
        placeholder={`Nachricht an ${conversation.name}...`}
        className="flex-1"
      />
    </div>
  );
}