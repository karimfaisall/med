import { Clock, AlertTriangle, MessageSquare, Bot, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Conversation } from '../../src/App';
import { getTimeString } from './utils';

interface ConversationCardProps {
  conversation: Conversation;
  onSelect: (conversation: Conversation) => void;
  isMobileView?: boolean;
}

export function ConversationCard({ conversation, onSelect, isMobileView }: ConversationCardProps) {
  const getKimStatusIcon = (status?: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 className="w-3 h-3 text-green-500" />;
      case 'failed': return <XCircle className="w-3 h-3 text-red-500" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const getKimStatusTooltip = (status?: string) => {
    switch (status) {
      case 'delivered': return 'KIM zugestellt';
      case 'failed': return 'KIM fehlgeschlagen';
      default: return 'KIM ausstehend';
    }
  };

  if (isMobileView) {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 active:bg-gray-50 transition-colors cursor-pointer ${
          conversation.isUrgent ? 'border-l-4 border-l-red-500' : ''
        }`}
        onClick={() => onSelect(conversation)}
      >
        <div className="p-4">
          {/* Header Row - Patient Name & Badges */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-base">
                {conversation.patientName}
              </h3>

              <div className="flex items-center space-x-1 flex-shrink-0">
                {conversation.isUrgent && (
                  <Badge className="bg-red-100 text-red-800 flex items-center space-x-1 text-xs px-2 py-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="hidden sm:inline">Dringend</span>
                  </Badge>
                )}
                {conversation.unreadCount > 0 && (
                  <Badge className="bg-blue-600 text-white text-xs px-2 py-1 font-semibold">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
          </div>

          {/* Provider Name */}
          <p className="text-sm text-gray-600 mb-2">
            {conversation.providerName}
          </p>

          {/* Last Message - More Lines on Mobile */}
          <p className="text-gray-700 mb-3 text-sm leading-relaxed line-clamp-2">
            {conversation.lastMessage}
          </p>

          {/* Bottom Row - Time & Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{getTimeString(conversation.timestamp)}</span>
              </div>

              {conversation.messages[0]?.kimStatus && (
                <div
                  className="flex items-center space-x-1"
                  title={getKimStatusTooltip(conversation.messages[0].kimStatus)}
                >
                  {getKimStatusIcon(conversation.messages[0].kimStatus)}
                  <span>KIM</span>
                </div>
              )}
            </div>

            {conversation.aiSuggestions && conversation.aiSuggestions.length > 0 && (
              <div className="flex items-center space-x-1">
                <Bot className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-blue-600 font-medium">
                  {conversation.aiSuggestions.length} KI
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout (unchanged)
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        conversation.isUrgent ? 'border-l-4 border-l-red-500' : ''
      }`}
      onClick={() => onSelect(conversation)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between space-x-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-medium text-gray-900 truncate">
                {conversation.patientName}
              </h3>
              {conversation.isUrgent && (
                <Badge className="bg-red-100 text-red-800 flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Dringend</span>
                </Badge>
              )}
              {conversation.unreadCount > 0 && (
                <Badge className="bg-blue-100 text-blue-800">
                  {conversation.unreadCount} neu
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-1 truncate">
              {conversation.providerName}
            </p>

            <p className="text-sm text-gray-700 mb-2 line-clamp-1">
              {conversation.lastMessage}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{getTimeString(conversation.timestamp)}</span>
                </div>

                {conversation.messages[0]?.kimStatus && (
                  <div
                    className="flex items-center space-x-1"
                    title={getKimStatusTooltip(conversation.messages[0].kimStatus)}
                  >
                    {getKimStatusIcon(conversation.messages[0].kimStatus)}
                    <span>KIM</span>
                  </div>
                )}
              </div>

              {conversation.aiSuggestions && conversation.aiSuggestions.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Bot className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-blue-600">
                    {conversation.aiSuggestions.length} KI-Vorschläge
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" title="Nachricht anzeigen">
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
