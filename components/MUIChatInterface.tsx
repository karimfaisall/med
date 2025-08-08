import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Stack,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Typography,
  Chip,
  Menu,
  MenuItem,
  Divider,
  Button,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Badge,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Zoom,
  Fade,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Send,
  EmojiEmotions,
  AttachFile,
  MoreVert,
  Reply,
  Edit,
  Delete,
  ContentCopy,
  Star,
  Share,
  Warning,
  GetApp,
  ThumbUp,
  Favorite,
  Celebration,
  CheckCircle,
  HelpOutline,
} from '@mui/icons-material';
import { Message, User } from '../types';

interface MUIChatInterfaceProps {
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  onReactToMessage?: (messageId: string, emoji: string) => void;
  onReplyToMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
  placeholder?: string;
}

// Common emoji reactions
const commonEmojis = [
  { emoji: '👍', label: 'Gefällt mir' },
  { emoji: '❤️', label: 'Herz' },
  { emoji: '😊', label: 'Lächeln' },
  { emoji: '👏', label: 'Applaus' },
  { emoji: '🎉', label: 'Feier' },
  { emoji: '✅', label: 'Erledigt' },
  { emoji: '⚠️', label: 'Warnung' },
  { emoji: '❓', label: 'Frage' },
];

// Mock users for message authors
const mockUsers: { [key: string]: User } = {
  'dr-weber': {
    id: 'dr-weber',
    name: 'Dr. Hans Weber',
    email: 'h.weber@klinik.de',
    role: 'doctor',
    status: 'online',
    title: 'Kardiologe',
    department: 'Kardiologie',
  },
  'dr-mueller': {
    id: 'dr-mueller',
    name: 'Dr. Anna Müller',
    email: 'a.mueller@klinik.de',
    role: 'doctor',
    status: 'online',
    title: 'Allgemeinmedizinerin',
    department: 'Allgemeinmedizin',
  },
};

export function MUIChatInterface({
  messages,
  currentUser,
  onSendMessage,
  onReactToMessage,
  onReplyToMessage,
  onEditMessage,
  placeholder = 'Nachricht eingeben...',
}: MUIChatInterfaceProps) {
  const theme = useTheme();
  const [messageInput, setMessageInput] = useState('');
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const [emojiAnchor, setEmojiAnchor] = useState<null | HTMLElement>(null);
  const [actionsAnchor, setActionsAnchor] = useState<null | HTMLElement>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
      inputRef.current?.focus();
    }
  };

  // Handle message editing
  const handleEditMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setEditingMessage(messageId);
      setEditContent(message.content);
    }
    setActionsAnchor(null);
  };

  const handleSaveEdit = () => {
    if (editingMessage && editContent.trim() && onEditMessage) {
      onEditMessage(editingMessage, editContent.trim());
    }
    setEditingMessage(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditContent('');
  };

  // Handle emoji reactions
  const handleEmojiClick = (emoji: string) => {
    if (selectedMessageId && onReactToMessage) {
      onReactToMessage(selectedMessageId, emoji);
    }
    setEmojiAnchor(null);
    setSelectedMessageId('');
  };

  // Get time string
  const getTimeString = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    }
  };

  // Get user initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Check if message is from current user
  const isOwnMessage = (message: Message) => {
    return message.senderId === currentUser.id;
  };

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    return <AttachFile />;
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Messages Container */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Stack spacing={1}>
          {messages.map((message, index) => {
            const user = mockUsers[message.senderId] || {
              id: message.senderId,
              name: message.senderName,
              email: '',
              role: 'doctor' as const,
              status: 'offline' as const,
            };
            
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const showAvatar = !prevMessage || 
              prevMessage.senderId !== message.senderId || 
              (message.timestamp.getTime() - prevMessage.timestamp.getTime()) > 300000; // 5 minutes
            
            const isOwn = isOwnMessage(message);
            const isEditing = editingMessage === message.id;

            return (
              <Box
                key={message.id}
                onMouseEnter={() => setHoveredMessage(message.id)}
                onMouseLeave={() => setHoveredMessage(null)}
                sx={{
                  position: 'relative',
                  '&:hover .message-actions': {
                    opacity: 1,
                  },
                }}
              >
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  {/* Avatar */}
                  <Box sx={{ width: 40, display: 'flex', justifyContent: 'center' }}>
                    {showAvatar ? (
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: 'primary.main',
                          fontSize: '0.875rem',
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                    ) : (
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{
                          opacity: hoveredMessage === message.id ? 1 : 0,
                          transition: 'opacity 0.2s',
                          fontSize: '0.75rem',
                          mt: 0.5,
                        }}
                      >
                        {getTimeString(message.timestamp)}
                      </Typography>
                    )}
                  </Box>

                  {/* Message Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Header */}
                    {showAvatar && (
                      <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.title}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {getTimeString(message.timestamp)}
                        </Typography>
                        {message.isUrgent && (
                          <Chip
                            label="Dringend"
                            size="small"
                            color="error"
                            icon={<Warning />}
                            sx={{ height: 20 }}
                          />
                        )}
                      </Stack>
                    )}

                    {/* Message Text */}
                    {isEditing ? (
                      <Box sx={{ mt: 1 }}>
                        <TextField
                          fullWidth
                          multiline
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSaveEdit();
                            }
                            if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          }}
                          autoFocus
                          size="small"
                        />
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          <Button size="small" variant="contained" onClick={handleSaveEdit}>
                            Speichern
                          </Button>
                          <Button size="small" onClick={handleCancelEdit}>
                            Abbrechen
                          </Button>
                        </Stack>
                      </Box>
                    ) : (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            lineHeight: 1.5,
                          }}
                        >
                          {message.content}
                        </Typography>
                        
                        {message.isEdited && (
                          <Typography variant="caption" color="text.disabled">
                            (bearbeitet)
                          </Typography>
                        )}

                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <Stack spacing={1} sx={{ mt: 1 }}>
                            {message.attachments.map((attachment, idx) => (
                              <Card key={idx} variant="outlined" sx={{ maxWidth: 300 }}>
                                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    {getFileIcon(attachment.type)}
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                      <Typography variant="body2" noWrap>
                                        {attachment.name}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        {attachment.size}
                                      </Typography>
                                    </Box>
                                    <IconButton size="small">
                                      <GetApp />
                                    </IconButton>
                                  </Stack>
                                </CardContent>
                              </Card>
                            ))}
                          </Stack>
                        )}

                        {/* Reactions */}
                        {message.reactions && message.reactions.length > 0 && (
                          <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap' }}>
                            {message.reactions.map((reaction, idx) => (
                              <Chip
                                key={idx}
                                label={`${reaction.emoji} ${reaction.count}`}
                                size="small"
                                variant="outlined"
                                onClick={() => handleEmojiClick(reaction.emoji)}
                                sx={{
                                  height: 24,
                                  borderRadius: 3,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                  },
                                }}
                              />
                            ))}
                          </Stack>
                        )}

                        {/* Thread replies */}
                        {message.replyCount && message.replyCount > 0 && (
                          <Button
                            size="small"
                            startIcon={<Reply />}
                            onClick={() => onReplyToMessage?.(message.id)}
                            sx={{ mt: 1 }}
                          >
                            {message.replyCount} Antworten
                          </Button>
                        )}
                      </Box>
                    )}
                  </Box>

                  {/* Message Actions */}
                  {!isEditing && hoveredMessage === message.id && (
                    <Fade in timeout={200}>
                      <Stack
                        direction="row"
                        className="message-actions"
                        sx={{
                          opacity: 0,
                          transition: 'opacity 0.2s',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            setEmojiAnchor(e.currentTarget);
                            setSelectedMessageId(message.id);
                          }}
                        >
                          <EmojiEmotions />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            setActionsAnchor(e.currentTarget);
                            setSelectedMessageId(message.id);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Stack>
                    </Fade>
                  )}
                </Stack>
              </Box>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'grey.300' }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 0.5,
                    '& > div': {
                      width: 3,
                      height: 3,
                      bgcolor: 'grey.600',
                      borderRadius: '50%',
                      animation: 'typing 1.4s infinite ease-in-out',
                      '&:nth-of-type(1)': { animationDelay: '-0.32s' },
                      '&:nth-of-type(2)': { animationDelay: '-0.16s' },
                    },
                    '@keyframes typing': {
                      '0%, 80%, 100%': { transform: 'scale(0)' },
                      '40%': { transform: 'scale(1)' },
                    },
                  }}
                >
                  <Box />
                  <Box />
                  <Box />
                </Box>
              </Avatar>
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                Dr. Weber schreibt...
              </Typography>
            </Stack>
          )}
          
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      {/* Message Input */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box component="form" onSubmit={handleSendMessage}>
          <Stack direction="row" spacing={1} alignItems="flex-end">
            <IconButton color="primary" sx={{ mb: 0.5 }}>
              <AttachFile />
            </IconButton>
            
            <TextField
              ref={inputRef}
              fullWidth
              multiline
              maxRows={4}
              placeholder={placeholder}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.default',
                },
              }}
            />
            
            <IconButton color="primary" sx={{ mb: 0.5 }}>
              <EmojiEmotions />
            </IconButton>
            
            <IconButton
              type="submit"
              disabled={!messageInput.trim()}
              color="primary"
              sx={{
                bgcolor: messageInput.trim() ? 'primary.main' : 'transparent',
                color: messageInput.trim() ? 'primary.contrastText' : 'primary.main',
                '&:hover': {
                  bgcolor: messageInput.trim() ? 'primary.dark' : alpha(theme.palette.primary.main, 0.04),
                },
                mb: 0.5,
              }}
            >
              <Send />
            </IconButton>
          </Stack>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              🔒 KIM-verschlüsselt
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Strg + Enter zum Senden
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Emoji Menu */}
      <Menu
        anchorEl={emojiAnchor}
        open={Boolean(emojiAnchor)}
        onClose={() => setEmojiAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.5 }}>
          {commonEmojis.map((emoji) => (
            <Button
              key={emoji.emoji}
              onClick={() => handleEmojiClick(emoji.emoji)}
              sx={{ minWidth: 40, height: 40 }}
            >
              {emoji.emoji}
            </Button>
          ))}
        </Box>
      </Menu>

      {/* Actions Menu */}
      <Menu
        anchorEl={actionsAnchor}
        open={Boolean(actionsAnchor)}
        onClose={() => setActionsAnchor(null)}
      >
        <MenuItem onClick={() => onReplyToMessage?.(selectedMessageId)}>
          <Reply sx={{ mr: 1 }} /> Antworten
        </MenuItem>
        <MenuItem onClick={() => navigator.clipboard.writeText(
          messages.find(m => m.id === selectedMessageId)?.content || ''
        )}>
          <ContentCopy sx={{ mr: 1 }} /> Kopieren
        </MenuItem>
        <MenuItem>
          <Star sx={{ mr: 1 }} /> Markieren
        </MenuItem>
        <MenuItem>
          <Share sx={{ mr: 1 }} /> Weiterleiten
        </MenuItem>
        {isOwnMessage(messages.find(m => m.id === selectedMessageId) || {} as Message) && (
          <>
            <Divider />
            <MenuItem onClick={() => handleEditMessage(selectedMessageId)}>
              <Edit sx={{ mr: 1 }} /> Bearbeiten
            </MenuItem>
            <MenuItem sx={{ color: 'error.main' }}>
              <Delete sx={{ mr: 1 }} /> Löschen
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}