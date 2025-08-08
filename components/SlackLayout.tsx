import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { LeftSidebar } from './LeftSidebar';
import { RightAIPanel } from './RightAIPanel';
import { Screen, User, Team, Conversation, Patient, Message } from '../types';

interface SlackLayoutProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  children: React.ReactNode;
  conversation?: Conversation;
  patient?: Patient;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  users: User[];
  teams: Team[];
  currentUser: User;
  showRightPanel?: boolean;
}

// Mock data
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
  {
    id: '4',
    name: 'Dr. Michael Klein',
    email: 'm.klein@klinik.de',
    role: 'doctor',
    status: 'offline',
    title: 'Orthopäde',
    department: 'Orthopädie',
    kimAddress: 'm.klein@kim.de',
    lastSeen: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: '5',
    name: 'Jennifer Müller',
    email: 'j.mueller@klinik.de',
    role: 'admin',
    status: 'online',
    title: 'IT-Administrator',
    department: 'IT-Abteilung'
  }
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
  {
    id: '3',
    name: 'IT Support',
    description: 'Technischer Support und System-Updates',
    members: [mockUsers[4]],
    isPrivate: true,
    createdAt: new Date('2024-02-01')
  }
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

export function SlackLayout({
  currentScreen,
  onNavigate,
  children,
  conversation,
  patient,
  messages,
  onSendMessage,
  users = mockUsers,
  teams = mockTeams,
  currentUser = mockCurrentUser,
  showRightPanel = true
}: SlackLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(showRightPanel);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Close mobile sidebar when navigating
    setMobileSidebarOpen(false);
  }, [currentScreen]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-background safe-top">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSidebarToggle}
            className="touch-target"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <h1 className="font-semibold text-foreground">Med</h1>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRightPanelVisible(!rightPanelVisible)}
            className="touch-target"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <LeftSidebar
              currentScreen={currentScreen}
              onNavigate={onNavigate}
              isMobile={true}
              onToggleCollapse={() => setMobileSidebarOpen(false)}
              users={users}
              teams={teams}
              currentUser={currentUser}
            />
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>

        {/* Mobile Right Panel */}
        {rightPanelVisible && (conversation || patient) && (
          <div className="fixed inset-0 bg-background z-50 safe-top safe-bottom">
            <RightAIPanel
              conversation={conversation}
              patient={patient}
              messages={messages}
              isVisible={true}
              onToggleVisibility={() => setRightPanelVisible(false)}
              onSendMessage={onSendMessage}
              className="h-full"
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="slack-layout">
      {/* Left Sidebar */}
      <LeftSidebar
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        users={users}
        teams={teams}
        currentUser={currentUser}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-background">
        {children}
      </div>

      {/* Right AI Panel */}
      {showRightPanel && (
        <RightAIPanel
          conversation={conversation}
          patient={patient}
          messages={messages}
          isVisible={rightPanelVisible}
          onToggleVisibility={() => setRightPanelVisible(!rightPanelVisible)}
          onSendMessage={onSendMessage}
        />
      )}
    </div>
  );
}
