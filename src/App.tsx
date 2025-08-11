import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { medTheme } from './theme';
import { MUILayout } from '../components/MUILayout';
import { MUIChatInterface } from '../components/MUIChatInterface';
import { LoginScreen } from '../components/LoginScreen';
import { InboxScreen } from '../components/InboxScreen';
import { ComposeScreen } from '../components/ComposeScreen';
import { PatientProfileScreen } from '../components/PatientProfileScreen';
import {
  Screen,
  User,
  Team,
  Message,
  Conversation,
  Patient
} from '../types';

// Mock data
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
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'dr-weber',
    senderName: 'Dr. Weber',
    content: 'Die Laborergebnisse von Anna Schmidt sind eingetroffen. Alle Werte liegen im Normalbereich. 📊',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    attachments: [
      { name: 'Labor_Schmidt_2024.pdf', type: 'pdf', size: '2.3 MB' }
    ],
    isRead: true,
    reactions: [
      { emoji: '👍', users: ['dr-mueller'], count: 1 }
    ]
  },
  {
    id: '2',
    senderId: 'dr-mueller',
    senderName: 'Dr. Müller',
    content: 'Danke für die schnelle Übermittlung! 🙏\n\nKönnen Sie mir noch die Röntgenaufnahmen senden?',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    isRead: true
  },
  {
    id: '3',
    senderId: 'dr-weber',
    senderName: 'Dr. Weber',
    content: 'Selbstverständlich. Die Aufnahmen sind im Anhang.\n\n⚠️ **Wichtig:** Patient sollte in 2 Wochen zur Nachkontrolle.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isUrgent: true,
    attachments: [
      { name: 'Roentgen_Schmidt_Thorax.jpg', type: 'image', size: '4.1 MB' },
      { name: 'Roentgen_Schmidt_Abdomen.jpg', type: 'image', size: '3.8 MB' }
    ],
    isRead: false,
    reactions: [
      { emoji: '✅', users: ['dr-mueller'], count: 1 },
      { emoji: '👨‍⚕️', users: ['nurse-maria'], count: 1 }
    ]
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Hans Weber',
    email: 'h.weber@klinik.de',
    role: 'doctor',
    status: 'online',
    title: 'Kardiologe',
    department: 'Kardiologie',
    kimAddress: 'h.weber@kim.de'
  },
  {
    id: '2',
    name: 'Dr. Sarah Fischer',
    email: 's.fischer@klinik.de',
    role: 'doctor',
    status: 'away',
    title: 'Radiologin',
    department: 'Radiologie',
    kimAddress: 's.fischer@kim.de'
  },
  {
    id: '3',
    name: 'Maria Schneider',
    email: 'm.schneider@klinik.de',
    role: 'nurse',
    status: 'online',
    title: 'Krankenschwester',
    department: 'Station 3A'
  },
];

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Kardiologie Team',
    description: 'Alle Mitarbeiter der Kardiologie',
    members: mockUsers.filter(u => u.department === 'Kardiologie'),
    isPrivate: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Notaufnahme',
    description: 'Notaufnahme und Erste Hilfe',
    members: mockUsers.slice(0, 3),
    isPrivate: false,
    createdAt: new Date('2024-01-15')
  },
];

const mockCurrentUser: User = {
  id: 'current',
  name: 'Dr. Anna Müller',
  email: 'a.mueller@klinik.de',
  role: 'doctor',
  status: 'online',
  title: 'Allgemeinmedizinerin',
  department: 'Allgemeinmedizin',
  kimAddress: 'a.mueller@kim.de'
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleLogin = () => {
    setCurrentScreen('inbox');
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setCurrentScreen('chat');
  };

  const handleViewPatient = (patientId: string) => {
    const mockPatient: Patient = {
      id: patientId,
      name: selectedConversation?.patientName || 'Anna Schmidt',
      dateOfBirth: '1985-03-15',
      insuranceId: 'AOK-12345678',
      kimAddress: 'schmidt.anna@kim.de',
      consentStatus: 'received',
      timeline: [
        {
          id: '1',
          type: 'lab',
          title: 'Laborergebnisse',
          description: 'Blutwerte - alle Werte im Normbereich',
          timestamp: new Date('2024-12-01'),
          provider: 'Dr. Weber',
          urgent: false
        },
        {
          id: '2',
          type: 'prescription',
          title: 'Rezept ausgestellt',
          description: 'Ibuprofen 600mg, 20 Stück',
          timestamp: new Date('2024-11-28'),
          provider: 'Dr. Schmidt',
          urgent: false
        }
      ]
    };
    setSelectedPatient(mockPatient);
    setCurrentScreen('patient');
  };

  const handleBackToInbox = () => {
    setCurrentScreen('inbox');
    setSelectedConversation(null);
    setSelectedPatient(null);
  };

  const handleNavigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'dr-mueller',
      senderName: 'Dr. Müller',
      content,
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleReactToMessage = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);

        if (existingReaction) {
          if (existingReaction.users.includes('dr-mueller')) {
            existingReaction.users = existingReaction.users.filter(u => u !== 'dr-mueller');
            existingReaction.count--;
            if (existingReaction.count === 0) {
              return { ...msg, reactions: reactions.filter(r => r.emoji !== emoji) };
            }
          } else {
            existingReaction.users.push('dr-mueller');
            existingReaction.count++;
          }
        } else {
          reactions.push({ emoji, users: ['dr-mueller'], count: 1 });
        }

        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? { ...msg, content: newContent, isEdited: true, editedAt: new Date() }
        : msg
    ));
  };

  // Placeholder component for development screens
  const PlaceholderScreen = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;

      case 'inbox':
        return (
          <InboxScreen
            onSelectConversation={handleSelectConversation}
            onCompose={() => setCurrentScreen('compose')}
            onNavigateToScreen={handleNavigateToScreen}
            isMobileView={false}
          />
        );

      case 'chat':
        if (!selectedConversation) return null;
        return (
          <MUIChatInterface
            messages={messages}
            currentUser={mockCurrentUser}
            onSendMessage={handleSendMessage}
            onReactToMessage={handleReactToMessage}
            onReplyToMessage={(messageId) => console.log('Reply to:', messageId)}
            onEditMessage={handleEditMessage}
            placeholder={`Nachricht an ${selectedConversation.name}...`}
          />
        );

      case 'compose':
        return (
          <ComposeScreen
            onBackToInbox={handleBackToInbox}
            isMobileView={false}
          />
        );

      case 'patient':
        if (!selectedPatient) return null;
        return (
          <PatientProfileScreen
            patient={selectedPatient}
            onBackToInbox={handleBackToInbox}
            isMobileView={false}
          />
        );

      case 'ai-assistant':
        return <PlaceholderScreen title="KI-Assistent" subtitle="In Entwicklung" />;

      case 'threads':
        return <PlaceholderScreen title="Threads" subtitle="In Entwicklung" />;

      case 'alerts':
        return <PlaceholderScreen title="Warnungen" subtitle="In Entwicklung" />;

      case 'patients':
        return <PlaceholderScreen title="Patienten" subtitle="In Entwicklung" />;

      case 'referrals':
        return <PlaceholderScreen title="Überweisungen" subtitle="In Entwicklung" />;

      case 'team':
        return <PlaceholderScreen title="Team" subtitle="In Entwicklung" />;

      case 'admin':
        return <PlaceholderScreen title="Einstellungen" subtitle="In Entwicklung" />;

      default:
        return <PlaceholderScreen title="Bildschirm nicht gefunden" />;
    }
  };

  if (currentScreen === 'login') {
    return (
      <ThemeProvider theme={medTheme}>
        <CssBaseline />
        <LoginScreen onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={medTheme}>
      <CssBaseline />
      <MUILayout
        currentScreen={currentScreen}
        onNavigate={handleNavigateToScreen}
        conversation={selectedConversation}
        patient={selectedPatient}
        messages={selectedConversation ? messages : undefined}
        onSendMessage={handleSendMessage}
        users={mockUsers}
        teams={mockTeams}
        currentUser={mockCurrentUser}
        showRightPanel={['chat', 'patient'].includes(currentScreen)}
      >
        {renderCurrentScreen()}
      </MUILayout>
    </ThemeProvider>
  );
}
