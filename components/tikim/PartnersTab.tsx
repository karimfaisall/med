import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { mockPartners } from './constants';
import { formatDateTime, getStatusColor, getPartnerTypeIcon, getPartnerTypeName } from './utils';

export function PartnersTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>TI-Partner Verzeichnis</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Partner suchen..."
                  className="pl-10 w-64"
                />
              </div>
              <Button size="sm">
                Partner hinzufügen
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPartners.map((partner) => {
              const TypeIcon = getPartnerTypeIcon(partner.type);
              return (
                <Card key={partner.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <TypeIcon className="w-4 h-4 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{partner.name}</h4>
                          <p className="text-sm text-gray-600">{partner.kimAddress}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {getPartnerTypeName(partner.type)}
                            </Badge>
                            <Badge className={getStatusColor(partner.status)}>
                              {partner.status === 'connected' && 'Verbunden'}
                              {partner.status === 'pending' && 'Ausstehend'}
                              {partner.status === 'error' && 'Fehler'}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Letzter Kontakt: {formatDateTime(partner.lastContact)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}