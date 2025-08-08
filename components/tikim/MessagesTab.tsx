import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Download, Shield } from 'lucide-react';
import { mockKIMMessages } from './constants';
import { formatDateTime, getStatusColor } from './utils';

export function MessagesTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Empfangene KIM-Nachrichten</span>
            <Badge variant="secondary">{mockKIMMessages.length} Nachrichten</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {mockKIMMessages.map((message) => (
                <Card key={message.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{message.subject}</h4>
                          <Badge className={getStatusColor(message.status)}>
                            {message.status === 'delivered' && 'Zugestellt'}
                            {message.status === 'pending' && 'Ausstehend'}
                            {message.status === 'failed' && 'Fehlgeschlagen'}
                          </Badge>
                          {message.encrypted && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <Shield className="w-3 h-3 mr-1" />
                              Verschlüsselt
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">von {message.from}</p>
                        <p className="text-xs text-gray-500">
                          {formatDateTime(message.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}