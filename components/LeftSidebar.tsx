import { useState } from 'react';
import {
  Inbox,
  Bot,
  Users,
  AlertTriangle,
  UserCheck,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  Hash,
  Search,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Screen, User, Team, UserStatus } from '../types';

interface LeftSidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isMobile?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  users: User[];
  teams: Team[];
  currentUser: User;
}


const mockNotificationCounts = {
  inbox: 5,
  alerts: 2,
  referrals: 1,
  drafts: 3
};

export function LeftSidebar({
  currentScreen,
  onNavigate,
  isMobile = false,
  isCollapsed = false,
  onToggleCollapse,
  users,
  teams,
  currentUser
}: LeftSidebarProps) {
  const [teamsExpanded, setTeamsExpanded] = useState(true);
  const [dmsExpanded, setDmsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    {
      id: 'inbox' as Screen,
      label: 'Alle Nachrichten',
      tooltip: 'All Messages',
      icon: Inbox,
      badge: mockNotificationCounts.inbox
    },
    {
      id: 'ai-assistant' as Screen,
      label: 'KI-Assistent',
      tooltip: 'AI Assistant',
      icon: Bot,
      badge: null
    },
    {
      id: 'patients' as Screen,
      label: 'Patienten',
      tooltip: 'Patients',
      icon: Users,
      badge: null
    },
    {
      id: 'alerts' as Screen,
      label: 'Warnungen & Eskalationen',
      tooltip: 'Alerts & Escalations',
      icon: AlertTriangle,
      badge: mockNotificationCounts.alerts
    },
    {
      id: 'referrals' as Screen,
      label: 'Überweisungen',
      tooltip: 'Referrals',
      icon: UserCheck,
      badge: mockNotificationCounts.referrals
    },
    {
      id: 'drafts' as Screen,
      label: 'Entwürfe',
      tooltip: 'Drafts',
      icon: FileText,
      badge: mockNotificationCounts.drafts
    },
    {
      id: 'admin' as Screen,
      label: 'Einstellungen',
      tooltip: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  const getStatusIndicator = (status: UserStatus) => {
    switch (status) {
      case 'online':
        return 'status-indicator online';
      case 'away':
        return 'status-indicator away';
      case 'offline':
        return 'status-indicator offline';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isMobile) {
    return (
      <div className="fixed inset-y-0 left-0 z-50 w-80 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">Med</h2>
              <p className="text-xs text-foreground-secondary">{currentUser.name}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-sidebar-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-tertiary" />
              <Input
                placeholder="Suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background border-input-border"
              />
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`sidebar-item w-full justify-between ${isActive ? 'active' : ''}`}
                    title={item.tooltip}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <Badge className="bg-error text-white text-xs">
                        {item.badge > 99 ? '99+' : item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Teams */}
            <div>
              <button
                onClick={() => setTeamsExpanded(!teamsExpanded)}
                className="sidebar-section w-full flex items-center justify-between"
              >
                <span>Meine Teams</span>
                {teamsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {teamsExpanded && (
                <div className="mt-2 space-y-1">
                  {filteredTeams.map((team) => (
                    <button
                      key={team.id}
                      className="sidebar-item w-full"
                      onClick={() => {/* Navigate to team */}}
                    >
                      <div className="flex items-center space-x-3">
                        <Hash className="w-4 h-4 text-foreground-secondary" />
                        <span className="truncate">{team.name}</span>
                      </div>
                    </button>
                  ))}
                  <button className="sidebar-item w-full text-foreground-secondary hover:text-foreground">
                    <div className="flex items-center space-x-3">
                      <Plus className="w-4 h-4" />
                      <span>Team hinzufügen</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Messages */}
            <div>
              <button
                onClick={() => setDmsExpanded(!dmsExpanded)}
                className="sidebar-section w-full flex items-center justify-between"
              >
                <span>Direktnachrichten</span>
                {dmsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {dmsExpanded && (
                <div className="mt-2 space-y-1">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      className="sidebar-item w-full"
                      onClick={() => {/* Navigate to DM */}}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-foreground-secondary text-background text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-0.5 -right-0.5 ${getStatusIndicator(user.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="truncate">{user.name}</p>
                          <p className="text-xs text-foreground-secondary truncate">{user.title}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  // Desktop Sidebar
  return (
    <div className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-sidebar-foreground">Med</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-sidebar-foreground p-1"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className={`p-3 space-y-4 ${isCollapsed ? 'px-2' : ''}`}>
          {/* Search */}
          {!isCollapsed && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-tertiary" />
              <Input
                placeholder="Suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background border-input-border text-sm"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`sidebar-item w-full ${isActive ? 'active' : ''} ${
                    isCollapsed ? 'justify-center px-2' : 'justify-between'
                  }`}
                  title={isCollapsed ? item.tooltip : item.label}
                >
                  <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && item.badge && item.badge > 0 && (
                    <Badge className="bg-error text-white text-xs">
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                  {isCollapsed && item.badge && item.badge > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {!isCollapsed && (
            <>
              {/* Teams */}
              <div>
                <button
                  onClick={() => setTeamsExpanded(!teamsExpanded)}
                  className="sidebar-section w-full flex items-center justify-between"
                >
                  <span>Meine Teams</span>
                  {teamsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {teamsExpanded && (
                  <div className="mt-2 space-y-1">
                    {filteredTeams.map((team) => (
                      <button
                        key={team.id}
                        className="sidebar-item w-full"
                        onClick={() => {/* Navigate to team */}}
                      >
                        <div className="flex items-center space-x-3">
                          <Hash className="w-4 h-4 text-foreground-secondary" />
                          <span className="truncate">{team.name}</span>
                        </div>
                      </button>
                    ))}
                    <button className="sidebar-item w-full text-foreground-secondary hover:text-foreground">
                      <div className="flex items-center space-x-3">
                        <Plus className="w-4 h-4" />
                        <span>Team hinzufügen</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Messages */}
              <div>
                <button
                  onClick={() => setDmsExpanded(!dmsExpanded)}
                  className="sidebar-section w-full flex items-center justify-between"
                >
                  <span>Direktnachrichten</span>
                  {dmsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {dmsExpanded && (
                  <div className="mt-2 space-y-1">
                    {filteredUsers.slice(0, 10).map((user) => (
                      <button
                        key={user.id}
                        className="sidebar-item w-full"
                        onClick={() => {/* Navigate to DM */}}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-foreground-secondary text-background text-xs">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-0.5 -right-0.5 ${getStatusIndicator(user.status)}`} />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="truncate text-sm">{user.name}</p>
                            {user.status === 'online' && (
                              <p className="text-xs text-success">Online</p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      {/* User Status */}
      {!isCollapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-0.5 -right-0.5 ${getStatusIndicator(currentUser.status)}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{currentUser.name}</p>
              <p className="text-xs text-foreground-secondary truncate">{currentUser.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
