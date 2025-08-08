export type Screen = 
  | 'login'
  | 'inbox'
  | 'chat'
  | 'compose'
  | 'patient'
  | 'ai-assistant'
  | 'threads'
  | 'alerts'
  | 'patients'
  | 'referrals'
  | 'team'
  | 'admin'
  | 'tikim'
  | 'notifications'
  | 'ehr'
  | 'mobile'
  | 'ai-prompts'
  | 'patient-timeline'
  | 'consent'
  | 'escalation'
  | 'billing';

export type UserRole = 'doctor' | 'nurse' | 'admin';
export type UserStatus = 'online' | 'away' | 'offline';
export type ConversationType = 'patient' | 'team' | 'referral';
export type ConsentStatus = 'received' | 'missing' | 'expired';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  title?: string;
  department?: string;
  kimAddress?: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: User[];
  isPrivate: boolean;
  createdAt: Date;
}

export interface MessageAttachment {
  name: string;
  type: string;
  size: string;
  url?: string;
}

export interface MessageReaction {
  emoji: string;
  users: string[];
  count: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  attachments?: MessageAttachment[];
  reactions?: MessageReaction[];
  isRead: boolean;
  isUrgent?: boolean;
  isEdited?: boolean;
  editedAt?: Date;
  replyCount?: number;
  parentId?: string;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isUrgent: boolean;
  messages: Message[];
  isPinned: boolean;
  isMuted: boolean;
  patientId?: string;
  patientName?: string;
}

export interface TimelineEvent {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: Date;
  provider: string;
  urgent: boolean;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  insuranceId: string;
  kimAddress?: string;
  consentStatus: ConsentStatus;
  timeline: TimelineEvent[];
}

// AI Assistant types
export interface AIInsight {
  id: string;
  type: 'summary' | 'suggestion' | 'compliance' | 'warning';
  title: string;
  content: string;
  confidence: number;
  actions: string[];
  timestamp: Date;
}

export interface AIPrompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  description: string;
  isCustom: boolean;
  createdBy?: string;
  createdAt: Date;
}

// TI/KIM Integration types
export interface KIMAddress {
  address: string;
  displayName: string;
  organization: string;
  verified: boolean;
  lastSeen?: Date;
}

export interface KIMMessage {
  id: string;
  from: string;
  to: string[];
  subject: string;
  content: string;
  timestamp: Date;
  encrypted: boolean;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  attachments?: MessageAttachment[];
}

// File and Document types
export interface FileAnnotation {
  id: string;
  fileId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
}

export interface AnnotatedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  annotations: FileAnnotation[];
  patientId?: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// Settings and Configuration types
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  urgentOnly: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface EscalationRule {
  id: string;
  name: string;
  conditions: {
    timeWithoutResponse: number;
    messageTypes: ConversationType[];
    urgentOnly: boolean;
  };
  actions: {
    notifyUsers: string[];
    escalateToManager: boolean;
    sendEmail: boolean;
  };
  isActive: boolean;
}

export interface SystemStatus {
  kim: 'connected' | 'disconnected' | 'error';
  ehr: 'connected' | 'disconnected' | 'error';
  ai: 'active' | 'inactive' | 'error';
  lastSync: Date;
  uptime: number;
}