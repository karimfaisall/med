export interface KIMMessage {
  id: string;
  from: string;
  subject: string;
  timestamp: Date;
  status: 'delivered' | 'pending' | 'failed';
  encrypted: boolean;
}

export interface Partner {
  id: string;
  name: string;
  type: 'clinic' | 'pharmacy' | 'lab';
  kimAddress: string;
  status: 'connected' | 'pending' | 'error';
  lastContact: Date;
}

// Mock KIM messages
export const mockKIMMessages: KIMMessage[] = [
  {
    id: '1',
    from: 'dr.weber@herzzentrum.kim.de',
    subject: 'Laborergebnisse Patient Schmidt',
    timestamp: new Date('2024-01-20T14:30:00'),
    status: 'delivered',
    encrypted: true
  },
  {
    id: '2',
    from: 'labor@nord-lab.kim.de',
    subject: 'Dringende Rücksprache Befund',
    timestamp: new Date('2024-01-20T11:15:00'),
    status: 'delivered',
    encrypted: true
  },
  {
    id: '3',
    from: 'apotheke@stadtapotheke.kim.de',
    subject: 'Medikamentenverfügbarkeit',
    timestamp: new Date('2024-01-20T09:45:00'),
    status: 'pending',
    encrypted: true
  }
];

// Mock partner directory
export const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Herzzentrum München',
    type: 'clinic',
    kimAddress: 'kontakt@herzzentrum-muenchen.kim.de',
    status: 'connected',
    lastContact: new Date('2024-01-20T14:30:00')
  },
  {
    id: '2',
    name: 'Nord-Labor GmbH',
    type: 'lab',
    kimAddress: 'empfang@nord-labor.kim.de',
    status: 'connected',
    lastContact: new Date('2024-01-20T11:15:00')
  },
  {
    id: '3',
    name: 'Stadtapotheke',
    type: 'pharmacy',
    kimAddress: 'info@stadtapotheke.kim.de',
    status: 'pending',
    lastContact: new Date('2024-01-19T16:20:00')
  }
];