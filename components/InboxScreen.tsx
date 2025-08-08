import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  Chip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  PushPin,
  Warning,
} from '@mui/icons-material';
import { Conversation, Screen } from '../types';

interface InboxScreenProps {
  onSelectConversation: (conversation: Conversation) => void;
  onCompose: () => void;
  onNavigateToScreen: (screen: Screen) => void;
  isMobileView?: boolean;
}

// Mock conversations for inbox
const mockConversations: Conversation[] = [
  {
    id: '1',
    type: 'patient',
    name: 'Anna Schmidt',
    participants: [],
    patientId: 'patient-1',
    patientName: 'Anna Schmidt',
    lastMessage: {
      id: 'msg-1',
      senderId: 'dr-weber',
      senderName: 'Dr. Weber',
      content: 'Die Laborergebnisse sind eingetroffen. Alle Werte im Normalbereich.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false
    },
    unreadCount: 2,
    isUrgent: false,
    messages: [],
    isPinned: false,
    isMuted: false
  },
  {
    id: '2',
    type: 'patient',
    name: 'Michael Weber',
    participants: [],
    patientId: 'patient-2',
    patientName: 'Michael Weber',
    lastMessage: {
      id: 'msg-2',
      senderId: 'dr-fischer',
      senderName: 'Dr. Fischer',
      content: 'Röntgenaufnahmen zeigen keine Auffälligkeiten. Termin zur Nachkontrolle in 4 Wochen.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true
    },
    unreadCount: 0,
    isUrgent: true,
    messages: [],
    isPinned: true,
    isMuted: false
  },
  {
    id: '3',
    type: 'team',
    name: 'Kardiologie Team',
    participants: [],
    lastMessage: {
      id: 'msg-3',
      senderId: 'dr-mueller',
      senderName: 'Dr. Müller',
      content: 'Wer kann heute die Visite in Zimmer 205 übernehmen?',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isRead: false
    },
    unreadCount: 3,
    isUrgent: false,
    messages: [],
    isPinned: false,
    isMuted: false
  }
];

export function InboxScreen({ onSelectConversation, onCompose, onNavigateToScreen, isMobileView }: InboxScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [conversations] = useState<Conversation[]>(mockConversations);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'unread' && conv.unreadCount > 0) ||
                         (filterStatus === 'urgent' && conv.isUrgent);
                         
    return matchesSearch && matchesFilter;
  });

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

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Alle Nachrichten
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredConversations.length} Gespräche
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onCompose}
            sx={{ minWidth: 'auto' }}
          >
            Verfassen
          </Button>
        </Stack>

        {/* Search and Filter */}
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            placeholder="Nachrichten durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Filter"
            >
              <MenuItem value="all">Alle</MenuItem>
              <MenuItem value="unread">Ungelesen</MenuItem>
              <MenuItem value="urgent">Dringend</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* Conversations List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {filteredConversations.length > 0 ? (
          <List sx={{ p: 0 }}>
            {filteredConversations.map((conversation) => (
              <React.Fragment key={conversation.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => onSelectConversation(conversation)}
                    sx={{
                      py: 2,
                      px: 2,
                      '&:hover': {
                        bgcolor: 'grey.50',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          width: 48,
                          height: 48,
                        }}
                      >
                        {getInitials(conversation.name)}
                      </Avatar>
                    </ListItemAvatar>
                    
                    <ListItemText
                      sx={{ ml: 1 }}
                      primary={
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: conversation.unreadCount > 0 ? 600 : 400,
                              color: conversation.unreadCount > 0 ? 'text.primary' : 'text.secondary',
                            }}
                          >
                            {conversation.name}
                          </Typography>
                          {conversation.isUrgent && (
                            <Chip
                              label="Dringend"
                              size="small"
                              color="error"
                              icon={<Warning />}
                              sx={{ height: 20 }}
                            />
                          )}
                          {conversation.isPinned && (
                            <PushPin sx={{ fontSize: 16, color: 'warning.main' }} />
                          )}
                          <Box sx={{ flexGrow: 1 }} />
                          <Typography variant="caption" color="text.disabled">
                            {getTimeString(conversation.lastMessage.timestamp)}
                          </Typography>
                          {conversation.unreadCount > 0 && (
                            <Badge
                              badgeContent={conversation.unreadCount}
                              color="primary"
                              sx={{
                                '& .MuiBadge-badge': {
                                  right: -3,
                                  top: -3,
                                },
                              }}
                            >
                              <Box sx={{ width: 8 }} />
                            </Badge>
                          )}
                        </Stack>
                      }
                      secondary={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography
                            variant="body2"
                            color={conversation.unreadCount > 0 ? 'text.primary' : 'text.secondary'}
                            sx={{
                              fontWeight: conversation.unreadCount > 0 ? 500 : 400,
                              flex: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {conversation.lastMessage.senderName}:
                            </Box>{' '}
                            {conversation.lastMessage.content}
                          </Typography>
                          <Chip
                            label={conversation.type === 'patient' ? 'Patient' : 'Team'}
                            size="small"
                            variant="outlined"
                            color={conversation.type === 'patient' ? 'primary' : 'secondary'}
                            sx={{ fontSize: '0.75rem' }}
                          />
                        </Stack>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'grey.100',
                color: 'grey.400',
                mb: 2,
              }}
            >
              <Search sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Keine Nachrichten gefunden
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
              {searchQuery || filterStatus !== 'all'
                ? 'Versuchen Sie andere Suchkriterien oder Filter.'
                : 'Sie haben noch keine Nachrichten erhalten.'
              }
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={onCompose}
            >
              Erste Nachricht senden
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}