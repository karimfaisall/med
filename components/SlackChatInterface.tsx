import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Plus, 
  MoreVertical,
  Reply,
  Star,
  Share,
  Copy,
  Edit,
  Trash,
  AlertTriangle
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { Message, User } from '../types';

interface SlackChatInterfaceProps {
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  onReactToMessage?: (messageId: string, emoji: string) => void;
  onReplyToMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
  placeholder?: string;
  className?: string;
}

interface MessageWithUser extends Message {
  user?: User;
}

// Mock user data for message authors
const mockUsers: { [key: string]: User } = {
  'dr-weber': {
    id: 'dr-weber',
    name: 'Dr. Hans Weber',
    email: 'h.weber@klinik.de',
    role: 'doctor',
    status: 'online',
    title: 'Kardiologe',
    department: 'Kardiologie'
  },
  'dr-mueller': {
    id: 'dr-mueller',
    name: 'Dr. Anna Müller',
    email: 'a.mueller@klinik.de',
    role: 'doctor',
    status: 'online',
    title: 'Allgemeinmedizinerin',
    department: 'Allgemeinmedizin'
  }
};

const commonEmojis = ['👍', '❤️', '😊', '👏', '🎉', '✅', '⚠️', '❓'];

export function SlackChatInterface({ 
  messages, 
  currentUser, 
  onSendMessage,
  onReactToMessage,
  onReplyToMessage,
  onEditMessage,
  placeholder = "Nachricht eingeben...",
  className = ""
}: SlackChatInterfaceProps) {
  const [messageInput, setMessageInput] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
      inputRef.current?.focus();
    }
  };

  const handleEditMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setEditingMessage(messageId);
      setEditContent(message.content);
    }
  };

  const handleSaveEdit = () => {
    if (editingMessage && editContent.trim()) {
      onEditMessage?.(editingMessage, editContent.trim());
      setEditingMessage(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditContent('');
  };

  const handleReaction = (messageId: string, emoji: string) => {
    onReactToMessage?.(messageId, emoji);
  };

  const getTimeString = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isOwnMessage = (message: Message) => {
    return message.senderId === currentUser.id;
  };

  const getFileIcon = (type: string) => {
    // Return appropriate file icon based on type
    return <Paperclip className="w-4 h-4" />;
  };

  return (
    <div className={`flex flex-col h-full bg-background ${className}`}>
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const user = mockUsers[message.senderId] || {
              id: message.senderId,
              name: message.senderName,
              email: '',
              role: 'doctor' as const,
              status: 'offline' as const
            };
            
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const showAvatar = !prevMessage || 
              prevMessage.senderId !== message.senderId || 
              (message.timestamp.getTime() - prevMessage.timestamp.getTime()) > 300000; // 5 minutes
            
            const isOwn = isOwnMessage(message);
            const isEditing = editingMessage === message.id;

            return (
              <div 
                key={message.id} 
                className={`chat-message group relative ${showAvatar ? 'mt-4' : 'mt-1'}`}
                onMouseEnter={() => setSelectedMessage(message.id)}
                onMouseLeave={() => setSelectedMessage(null)}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="w-10 flex justify-center">
                    {showAvatar ? (
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <span className="text-xs text-foreground-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                        {getTimeString(message.timestamp)}
                      </span>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header (only show for first message in group) */}
                    {showAvatar && (
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="font-semibold text-foreground">{user.name}</span>
                        <span className="text-xs text-foreground-secondary">{user.title}</span>
                        <span className="text-xs text-foreground-tertiary">
                          {getTimeString(message.timestamp)}
                        </span>
                        {message.isUrgent && (
                          <Badge className="bg-error text-white text-xs px-1.5 py-0.5">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Dringend
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Message Text */}
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit();
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                          className="text-sm"
                          autoFocus
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handleSaveEdit} className="h-7 px-3 text-xs">
                            Speichern
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancelEdit} className="h-7 px-3 text-xs">
                            Abbrechen
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                        
                        {message.isEdited && (
                          <span className="text-xs text-foreground-tertiary">(bearbeitet)</span>
                        )}

                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {message.attachments.map((attachment, idx) => (
                              <div key={idx} className="flex items-center space-x-2 p-2 bg-background-secondary rounded-md border">
                                {getFileIcon(attachment.type)}
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{attachment.name}</p>
                                  <p className="text-xs text-foreground-secondary">{attachment.size}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reactions */}
                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.reactions.map((reaction, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleReaction(message.id, reaction.emoji)}
                                className="flex items-center space-x-1 px-2 py-1 bg-background-secondary hover:bg-background-tertiary rounded-full text-xs transition-colors"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="font-medium">{reaction.count}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Thread reply count */}
                        {message.replyCount && message.replyCount > 0 && (
                          <button
                            onClick={() => onReplyToMessage?.(message.id)}
                            className="flex items-center space-x-1 text-xs text-primary hover:underline mt-1"
                          >
                            <Reply className="w-3 h-3" />
                            <span>{message.replyCount} Antworten</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Message Actions */}
                  {selectedMessage === message.id && !isEditing && (
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Quick reaction */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Smile className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <div className="grid grid-cols-4 gap-1 p-2">
                            {commonEmojis.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleReaction(message.id, emoji)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-background-secondary rounded"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* More actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onReplyToMessage?.(message.id)}>
                            <Reply className="w-4 h-4 mr-2" />
                            Antworten
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(message.content)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Kopieren
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="w-4 h-4 mr-2" />
                            Markieren
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="w-4 h-4 mr-2" />
                            Weiterleiten
                          </DropdownMenuItem>
                          {isOwn && (
                            <>
                              <DropdownMenuItem onClick={() => handleEditMessage(message.id)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Bearbeiten
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-error">
                                <Trash className="w-4 h-4 mr-2" />
                                Löschen
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-message">
              <div className="flex items-start space-x-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-foreground-secondary text-background">
                    <div className="flex space-x-0.5">
                      <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-foreground-secondary italic">
                    Dr. Weber schreibt...
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-border p-4 bg-background">
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="flex items-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="touch-target flex-shrink-0"
            >
              <Plus className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder={placeholder}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="pr-20 min-h-[44px] bg-chat-input-background border-chat-input-border focus:border-input-focus"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={!messageInput.trim()}
              className="bg-primary hover:bg-primary-hover touch-target flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between text-xs text-foreground-secondary">
            <span>🔒 KIM-verschlüsselt</span>
            <span>Strg + Enter zum Senden</span>
          </div>
        </form>
      </div>
    </div>
  );
}