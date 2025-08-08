import { Inbox, MessageSquarePlus, Bell, Settings } from 'lucide-react';
import { Screen } from '../src/App';

interface MobileBottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function MobileBottomNav({ currentScreen, onNavigate }: MobileBottomNavProps) {
  const navItems = [
    {
      id: 'inbox' as Screen,
      icon: Inbox,
      label: 'Posteingang',
      tooltip: 'Inbox',
      badge: 5 // Unread count
    },
    {
      id: 'compose' as Screen,
      icon: MessageSquarePlus,
      label: 'Verfassen',
      tooltip: 'New Message',
      badge: null
    },
    {
      id: 'notifications' as Screen,
      icon: Bell,
      label: 'Mitteilungen',
      tooltip: 'Alerts',
      badge: 2 // Alert count
    },
    {
      id: 'admin' as Screen,
      icon: Settings,
      label: 'Einstellungen',
      tooltip: 'Settings',
      badge: null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 safe-area-inset-bottom z-50">
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1 relative touch-manipulation
                ${isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 active:text-gray-700'
                } 
                transition-colors duration-150 min-h-[44px]`}
              title={item.tooltip}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 mb-1 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} />
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </div>
                )}
              </div>
              <span className={`text-xs truncate max-w-[64px] transition-all duration-150 ${
                isActive ? 'font-medium' : 'font-normal'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
