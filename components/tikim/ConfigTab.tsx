import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { CheckCircle, Upload, Mail, Server } from 'lucide-react';

interface ConfigTabProps {
  kimAddress: string;
  setKimAddress: (address: string) => void;
  autoKIMEnabled: boolean;
  setAutoKIMEnabled: (enabled: boolean) => void;
  certificateUploaded: boolean;
}

export function ConfigTab({ 
  kimAddress, 
  setKimAddress, 
  autoKIMEnabled, 
  setAutoKIMEnabled, 
  certificateUploaded 
}: ConfigTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              KIM-Konfiguration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                KIM-Adresse
              </label>
              <Input 
                value={kimAddress}
                onChange={(e) => setKimAddress(e.target.value)}
                placeholder="praxis@beispiel.kim.de"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ihre offizielle KIM-Adresse für sichere Kommunikation
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">KIM für ausgehende Dateien verwenden</p>
                <p className="text-sm text-gray-600">Automatisch über KIM versenden</p>
              </div>
              <Switch 
                checked={autoKIMEnabled}
                onCheckedChange={setAutoKIMEnabled}
              />
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium mb-2 block">
                Praxisausweis (SMC-B)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {certificateUploaded ? (
                  <div className="space-y-2">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                    <p className="text-sm font-medium text-green-700">Zertifikat hochgeladen</p>
                    <p className="text-xs text-gray-500">SMC-B_Praxis_Mueller.p12</p>
                    <Button variant="outline" size="sm">
                      Neues Zertifikat hochladen
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-600">SMC-B Zertifikat hochladen</p>
                    <Button variant="outline" size="sm">
                      Datei auswählen
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-600" />
              TI-Messenger Konfiguration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                TI-Messenger Server
              </label>
              <Input 
                defaultValue="messenger.ti-dienste.de"
                placeholder="Server-Adresse"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Organisations-ID
              </label>
              <Input 
                defaultValue="12345678901234567890"
                placeholder="20-stellige Telematik-ID"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">TI-Messenger aktiviert</p>
                <p className="text-sm text-gray-600">Instant Messaging für Notfälle</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm font-medium text-blue-800 mb-1">Status</p>
              <p className="text-xs text-blue-700">
                Verbindung zur Telematikinfrastruktur erfolgreich etabliert
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sicherheitseinstellungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ende-zu-Ende Verschlüsselung</p>
                <p className="text-sm text-gray-600">Obligatorisch für alle Nachrichten</p>
              </div>
              <Switch defaultChecked disabled />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Digitale Signatur</p>
                <p className="text-sm text-gray-600">Nachrichten automatisch signieren</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Empfangsbestätigung</p>
                <p className="text-sm text-gray-600">Automatische Lesebestätigung</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Archivierung</p>
                <p className="text-sm text-gray-600">10 Jahre Aufbewahrung</p>
              </div>
              <Switch defaultChecked disabled />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}