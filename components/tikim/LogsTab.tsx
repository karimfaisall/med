import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

export function LogsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Verbindungsprotokoll</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-2 font-mono text-sm">
              <div className="text-gray-600">
                <span className="text-green-600">[20.01.2024 15:30:00]</span> KIM-Nachricht erfolgreich gesendet an dr.weber@herzzentrum.kim.de
              </div>
              <div className="text-gray-600">
                <span className="text-blue-600">[20.01.2024 14:45:00]</span> Neue KIM-Nachricht empfangen von labor@nord-lab.kim.de
              </div>
              <div className="text-gray-600">
                <span className="text-green-600">[20.01.2024 14:30:00]</span> TI-Messenger Verbindung erfolgreich etabliert
              </div>
              <div className="text-gray-600">
                <span className="text-yellow-600">[20.01.2024 12:15:00]</span> SMC-B Zertifikat erneuert
              </div>
              <div className="text-gray-600">
                <span className="text-green-600">[20.01.2024 11:00:00]</span> KIM-Verbindungstest erfolgreich
              </div>
              <div className="text-gray-600">
                <span className="text-red-600">[20.01.2024 09:30:00]</span> Fehler bei Nachrichtenübertragung - Retry erfolgreich
              </div>
              <div className="text-gray-600">
                <span className="text-blue-600">[20.01.2024 08:00:00]</span> System gestartet - TI-Infrastruktur verfügbar
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}