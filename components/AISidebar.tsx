import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  X,
  Bot,
  AlertTriangle,
  Clock,
  Shield,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  FileCheck,
  ArrowLeft
} from 'lucide-react';
import { Conversation, Message } from '../src/App';

interface AISidebarProps {
  conversation: Conversation;
  messages: Message[];
  onClose: () => void;
  isMobile?: boolean;
}

export function AISidebar({ conversation, messages, onClose, isMobile = false }: AISidebarProps) {
  const handleCopyDraft = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isMobile) {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">KI-Assistent</h3>
                <p className="text-xs text-gray-500">AI Assistant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Thread Summary */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <span>Zusammenfassung</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Patient:</strong> {conversation.patientName}
                </p>
                <p>
                  <strong>Hauptthema:</strong> Laborergebnisse und Röntgenaufnahmen
                </p>
                <p>
                  <strong>Status:</strong> Normalwerte, Nachkontrolle in 2 Wochen empfohlen
                </p>
                <p>
                  <strong>Anlagen:</strong> 3 Dateien (Labor-PDF, 2 Röntgenbilder)
                </p>
              </CardContent>
            </Card>

            {/* Urgency Analysis */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span>Dringlichkeit</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Priorität</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    Mittel
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Antwortzeit</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>2-4 Stunden</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  Routine-Kommunikation mit Nachkontrolle-Empfehlung. Keine sofortige Behandlung erforderlich.
                </p>
              </CardContent>
            </Card>

            {/* Draft Reply Suggestions */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  <span>Antwortvorschläge</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-3">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                      Danke für die Übermittlung. Die Röntgenaufnahmen wurden gesichtet.
                      Ich stimme der Empfehlung zur Nachkontrolle in 2 Wochen zu.
                      Bitte koordinieren Sie den Termin mit der Patientin.
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyDraft("Danke für die Übermittlung...")}
                        className="h-8 text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Kopieren
                      </Button>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                      Erhalten und zur Kenntnis genommen. Patientin ist über die Ergebnisse informiert worden.
                      Termin für Nachkontrolle wird vereinbart.
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyDraft("Erhalten und zur Kenntnis genommen...")}
                        className="h-8 text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Kopieren
                      </Button>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Reminder */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Compliance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-3">
                <div className="flex items-start space-x-2">
                  <FileCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">DSGVO-konform</p>
                    <p className="text-xs text-green-700">
                      Alle Daten werden verschlüsselt übertragen
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>KIM-Verschlüsselung</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      Aktiv
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Aufbewahrungspflicht</span>
                    <span>10 Jahre</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dokumentationspflicht</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      Erfüllt
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                  <strong>Hinweis:</strong> Bitte dokumentieren Sie wichtige Behandlungsentscheidungen
                  in der Patientenakte.
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-base">Schnellaktionen</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 space-y-2">
                <Button variant="outline" size="sm" className="w-full h-10 text-sm justify-start">
                  Termin vorschlagen
                </Button>
                <Button variant="outline" size="sm" className="w-full h-10 text-sm justify-start">
                  Überweisung erstellen
                </Button>
                <Button variant="outline" size="sm" className="w-full h-10 text-sm justify-start">
                  Archivieren
                </Button>
              </CardContent>
            </Card>

            {/* Bottom Padding for Mobile */}
            <div className="h-6" />
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout (unchanged)
  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white border-l border-gray-200 shadow-xl z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">KI-Assistent</h3>
              <p className="text-xs text-gray-500">AI Assistant</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* Thread Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  Gesprächszusammenfassung
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Patient:</strong> {conversation.patientName}
                </p>
                <p>
                  <strong>Hauptthema:</strong> Laborergebnisse und Röntgenaufnahmen
                </p>
                <p>
                  <strong>Status:</strong> Normalwerte, Nachkontrolle in 2 Wochen empfohlen
                </p>
                <p>
                  <strong>Anlagen:</strong> 3 Dateien (Labor-PDF, 2 Röntgenbilder)
                </p>
              </CardContent>
            </Card>

            {/* Urgency Analysis */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Dringlichkeitsanalyse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Priorität</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    Mittel
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Antwortzeit</span>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-3 h-3" />
                    2-4 Stunden
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Routine-Kommunikation mit Nachkontrolle-Empfehlung. Keine sofortige Behandlung erforderlich.
                </p>
              </CardContent>
            </Card>

            {/* Draft Reply Suggestions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-500" />
                  Antwortvorschläge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-800 mb-2">
                      Danke für die Übermittlung. Die Röntgenaufnahmen wurden gesichtet.
                      Ich stimme der Empfehlung zur Nachkontrolle in 2 Wochen zu.
                      Bitte koordinieren Sie den Termin mit der Patientin.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyDraft("Danke für die Übermittlung...")}
                          className="h-6 text-xs"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Kopieren
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-800 mb-2">
                      Erhalten und zur Kenntnis genommen. Patientin ist über die Ergebnisse informiert worden.
                      Termin für Nachkontrolle wird vereinbart.
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyDraft("Erhalten und zur Kenntnis genommen...")}
                        className="h-6 text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Kopieren
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Reminder */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  Compliance-Erinnerung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <FileCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">DSGVO-konform</p>
                    <p className="text-xs text-green-700">
                      Alle Daten werden verschlüsselt übertragen
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>KIM-Verschlüsselung</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      Aktiv
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Aufbewahrungspflicht</span>
                    <span>10 Jahre</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dokumentationspflicht</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      Erfüllt
                    </Badge>
                  </div>
                </div>

                <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                  <strong>Hinweis:</strong> Bitte dokumentieren Sie wichtige Behandlungsentscheidungen
                  in der Patientenakte.
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Schnellaktionen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start">
                  Termin vorschlagen
                </Button>
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start">
                  Überweisung erstellen
                </Button>
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start">
                  Archivieren
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
