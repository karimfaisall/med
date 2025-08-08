import { Conversation } from '../../src/App';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    patientId: 'anna-mueller',
    patientName: 'Anna Müller',
    providerName: 'Dr. Weber (Kardiologie)',
    lastMessage: 'Laborwerte sind eingetroffen. Cholesterin leicht erhöht, bitte Rücksprache.',
    timestamp: new Date('2024-12-15T14:30:00'),
    unreadCount: 2,
    isUrgent: true,
    aiSuggestions: ['Fasse zusammen', 'Antwort vorschlagen'],
    messages: [
      {
        id: '1',
        senderId: 'dr-weber',
        senderName: 'Dr. Weber',
        content: 'Laborwerte sind eingetroffen. Cholesterin leicht erhöht, bitte Rücksprache.',
        timestamp: new Date('2024-12-15T14:30:00'),
        attachments: [{ name: 'Laborbefund_Müller.pdf', type: 'pdf', size: '245 KB' }],
        isUrgent: true,
        kimStatus: 'delivered',
        complianceFlags: ['Einverständnis erforderlich']
      }
    ]
  },
  {
    id: '2',
    patientId: 'klaus-weber',
    patientName: 'Klaus Weber',
    providerName: 'Apotheke Stadtmitte',
    lastMessage: 'Rezept wurde eingelöst. Patient hat Fragen zur Dosierung.',
    timestamp: new Date('2024-12-15T11:45:00'),
    unreadCount: 0,
    isUrgent: false,
    aiSuggestions: ['Dosierungsinfo erstellen'],
    messages: [
      {
        id: '2',
        senderId: 'apotheke-stadtmitte',
        senderName: 'Apotheke Stadtmitte',
        content: 'Rezept wurde eingelöst. Patient hat Fragen zur Dosierung.',
        timestamp: new Date('2024-12-15T11:45:00'),
        kimStatus: 'delivered'
      }
    ]
  },
  {
    id: '3',
    patientId: 'maria-schmidt',
    patientName: 'Maria Schmidt',
    providerName: 'Labor Nord',
    lastMessage: 'Notfall-Labor: Verdacht auf Herzinfarkt. Sofortige Rücksprache erforderlich!',
    timestamp: new Date('2024-12-15T09:15:00'),
    unreadCount: 1,
    isUrgent: true,
    aiSuggestions: ['Notfallprotokoll', 'Sofort eskalieren'],
    messages: [
      {
        id: '3',
        senderId: 'labor-nord',
        senderName: 'Labor Nord',
        content: 'Notfall-Labor: Verdacht auf Herzinfarkt. Sofortige Rücksprache erforderlich!',
        timestamp: new Date('2024-12-15T09:15:00'),
        isUrgent: true,
        kimStatus: 'delivered',
        complianceFlags: ['Notfallmeldung']
      }
    ]
  },
  {
    id: '4',
    patientId: 'thomas-klein',
    patientName: 'Thomas Klein',
    providerName: 'Physiotherapie Zentrum',
    lastMessage: 'Behandlungsplan aktualisiert. Nächster Termin: 18.12.2024',
    timestamp: new Date('2024-12-14T16:20:00'),
    unreadCount: 0,
    isUrgent: false,
    messages: [
      {
        id: '4',
        senderId: 'physio-zentrum',
        senderName: 'Physiotherapie Zentrum',
        content: 'Behandlungsplan aktualisiert. Nächster Termin: 18.12.2024',
        timestamp: new Date('2024-12-14T16:20:00'),
        kimStatus: 'delivered'
      }
    ]
  }
];

export const filterOptions = [
  { value: 'all', label: 'Alle Nachrichten', tooltip: 'All messages' },
  { value: 'unread', label: 'Ungelesen', tooltip: 'Unread messages' },
  { value: 'urgent', label: 'Dringend', tooltip: 'Urgent messages' }
];

export const tabOptions = [
  { value: 'all', label: 'Alle', tooltip: 'All conversations' },
  { value: 'urgent', label: 'Dringend', tooltip: 'Urgent conversations' },
  { value: 'today', label: 'Heute', tooltip: 'Today\'s conversations' }
];
