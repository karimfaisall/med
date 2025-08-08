import { Conversation } from '../../src/App';

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const getTimeString = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Gerade eben';
  if (diffInMinutes < 60) return `vor ${diffInMinutes}min`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `vor ${diffInHours}h`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `vor ${diffInDays}d`;

  return date.toLocaleDateString('de-DE');
};

export const filterConversations = (
  conversations: Conversation[],
  searchQuery: string,
  filterStatus: string,
  selectedTab: string
): Conversation[] => {
  return conversations.filter(conv => {
    const matchesSearch = conv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'unread' && conv.unreadCount > 0) ||
                         (filterStatus === 'urgent' && conv.isUrgent);

    const matchesTab = selectedTab === 'all' ||
                      (selectedTab === 'urgent' && conv.isUrgent) ||
                      (selectedTab === 'today' && isToday(conv.timestamp));

    return matchesSearch && matchesFilter && matchesTab;
  });
};

export const getConversationStats = (conversations: Conversation[]) => {
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const urgentCount = conversations.filter(conv => conv.isUrgent).length;
  const todayCount = conversations.filter(conv => isToday(conv.timestamp)).length;

  return { totalUnread, urgentCount, todayCount };
};
