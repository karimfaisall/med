import { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  AlertTriangle, 
  Shield, 
  FileText, 
  User, 
  Clock, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Send,
  X,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Conversation, Patient, Message } from '../types';

interface RightAIPanelProps {
  conversation?: Conversation;
  patient?: Patient;
  messages?: Message[];
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  onSendMessage?: (message: string) => void;
  className?: string;
}

interface AIInsight {
  id: string;
  type: 'summary' | 'suggestion' | 'compliance' | 'urgency' | 'action';
  title: string;
  content: string;
  confidence: number;
  timestamp: Date;
  actions?: { label: string; action: () => void }[];
}

// Mock AI insights
const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'summary',
    title: 'Gesprächszusammenfassung',
    content: 'Patient Anna Schmidt: Laborergebnisse zeigen Normalwerte. Röntgenaufnahmen wurden übertragen. Nachkontrolle in 2 Wochen empfohlen.',
    confidence: 0.95,
    timestamp: new Date(),
    actions: [
      { label: 'Termin vorschlagen', action: () => {} },
      { label: 'In Akte eintragen', action: () => {} }
    ]
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'Antwortvorschlag',
    content: 'Danke für die Übermittlung. Die Röntgenaufnahmen wurden gesichtet. Ich stimme der Empfehlung zur Nachkontrolle in 2 Wochen zu. Bitte koordinieren Sie den Termin mit der Patientin.',
    confidence: 0.92,
    timestamp: new Date(),
    actions: [
      { label: 'Verwenden', action: () => {} },
      { label: 'Bearbeiten', action: () => {} }
    ]
  },
  {
    id: '3',
    type: 'compliance',
    title: 'Compliance-Prüfung',
    content: 'Alle DSGVO-Anforderungen erfüllt. KIM-Verschlüsselung aktiv. Hinweis: Wichtige Behandlungsentscheidungen sollten in der Patientenakte dokumentiert werden.',
    confidence: 0.98,
    timestamp: new Date(),
    actions: [
      { label: 'Dokumentieren', action: () => {} }
    ]
  }
];

export function RightAIPanel({ 
  conversation, 
  patient, 
  messages, 
  isVisible = true,
  onToggleVisibility,
  onSendMessage,
  className = ""
}: RightAIPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    aiInsights: true,
    patientInfo: true,
    attachments: true,
    compliance: true,
    quickActions: true
  });
  const [aiPrompt, setAiPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'summary': return <Sparkles className="w-4 h-4 text-primary" />;
      case 'suggestion': return <Bot className="w-4 h-4 text-primary" />;
      case 'compliance': return <Shield className="w-4 h-4 text-success" />;
      case 'urgency': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'action': return <CheckCircle className="w-4 h-4 text-success" />;
      default: return <Bot className="w-4 h-4 text-foreground-secondary" />;
    }
  };

  const handleAIPrompt = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setAiPrompt('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleVisibility}
        className="fixed top-4 right-4 z-40 bg-background shadow-lg"
      >
        <Bot className="w-4 h-4 mr-2" />
        KI-Panel öffnen
      </Button>
    );
  }

  return (
    <div className={`w-80 bg-background border-l border-border flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">KI-Assistent</h3>
            <p className="text-xs text-foreground-secondary">AI Assistant</p>
          </div>
        </div>
        {onToggleVisibility && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVisibility}
            className="text-foreground-secondary"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* AI Insights */}
          <Card>
            <CardHeader className="pb-3">
              <button
                onClick={() => toggleSection('aiInsights')}
                className="flex items-center justify-between w-full text-left"
              >
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <span>KI-Einblicke</span>
                </CardTitle>
                {expandedSections.aiInsights ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </button>
            </CardHeader>
            {expandedSections.aiInsights && (
              <CardContent className="pt-0 space-y-3">
                {mockInsights.map((insight) => (
                  <div key={insight.id} className="p-3 bg-background-secondary rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getInsightIcon(insight.type)}
                        <h4 className="text-sm font-medium">{insight.title}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(insight.confidence * 100)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-secondary mb-3 leading-relaxed">
                      {insight.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(insight.content)}
                          className="h-7 px-2 text-xs"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Kopieren
                        </Button>
                        {insight.actions && insight.actions[0] && (
                          <Button
                            size="sm"
                            onClick={insight.actions[0].action}
                            className="h-7 px-2 text-xs bg-primary hover:bg-primary-hover"
                          >
                            {insight.actions[0].label}
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* Patient Information */}
          {patient && (
            <Card>
              <CardHeader className="pb-3">
                <button
                  onClick={() => toggleSection('patientInfo')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <User className="w-4 h-4 text-primary" />
                    <span>Patienteninfo</span>
                  </CardTitle>
                  {expandedSections.patientInfo ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </button>
              </CardHeader>
              {expandedSections.patientInfo && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-foreground-secondary">
                          Geb. {new Date(patient.dateOfBirth).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground-secondary">Versicherung:</span>
                        <span>{patient.insuranceId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-secondary">Einverständnis:</span>
                        <Badge 
                          className={`text-xs ${
                            patient.consentStatus === 'received' 
                              ? 'bg-success-light text-success' 
                              : 'bg-warning-light text-warning'
                          }`}
                        >
                          {patient.consentStatus === 'received' ? 'Erhalten' : 'Ausstehend'}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => {/* Navigate to patient profile */}}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Patientenakte öffnen
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Attachments & Files */}
          <Card>
            <CardHeader className="pb-3">
              <button
                onClick={() => toggleSection('attachments')}
                className="flex items-center justify-between w-full text-left"
              >
                <CardTitle className="text-sm flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Anhänge & Dateien</span>
                </CardTitle>
                {expandedSections.attachments ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </button>
            </CardHeader>
            {expandedSections.attachments && (
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {messages && messages
                    .filter(m => m.attachments && m.attachments.length > 0)
                    .slice(0, 5)
                    .map((message) => 
                      message.attachments?.map((attachment, idx) => (
                        <div key={`${message.id}-${idx}`} className="flex items-center space-x-2 p-2 hover:bg-background-secondary rounded cursor-pointer">
                          <FileText className="w-4 h-4 text-primary" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{attachment.name}</p>
                            <p className="text-xs text-foreground-secondary">{attachment.size}</p>
                          </div>
                        </div>
                      ))
                    )}
                  {(!messages || messages.filter(m => m.attachments?.length).length === 0) && (
                    <p className="text-sm text-foreground-secondary text-center py-4">
                      Keine Anhänge vorhanden
                    </p>
                  )}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Compliance Status */}
          <Card>
            <CardHeader className="pb-3">
              <button
                onClick={() => toggleSection('compliance')}
                className="flex items-center justify-between w-full text-left"
              >
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Compliance-Status</span>
                </CardTitle>
                {expandedSections.compliance ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </button>
            </CardHeader>
            {expandedSections.compliance && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">KIM-Verschlüsselung</span>
                    <Badge className="bg-success-light text-success text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Aktiv
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">DSGVO-konform</span>
                    <Badge className="bg-success-light text-success text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Erfüllt
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dokumentationspflicht</span>
                    <Badge className="bg-warning-light text-warning text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Ausstehend
                    </Badge>
                  </div>
                  
                  <div className="mt-3 p-3 bg-warning-light rounded-lg">
                    <p className="text-xs text-warning">
                      <strong>Hinweis:</strong> Behandlungsentscheidungen sollten in der Patientenakte dokumentiert werden.
                    </p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <button
                onClick={() => toggleSection('quickActions')}
                className="flex items-center justify-between w-full text-left"
              >
                <CardTitle className="text-sm">Schnellaktionen</CardTitle>
                {expandedSections.quickActions ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </button>
            </CardHeader>
            {expandedSections.quickActions && (
              <CardContent className="pt-0 space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Eskalation einleiten
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Überweisung erstellen
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Termin vorschlagen
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Patientenakte öffnen
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      </ScrollArea>

      {/* AI Chat Input */}
      <div className="p-4 border-t border-border">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">KI-Assistent fragen</span>
          </div>
          <div className="flex space-x-2">
            <Textarea
              placeholder="Frage eingeben..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="flex-1 min-h-[80px] text-sm"
              disabled={isProcessing}
            />
          </div>
          <Button
            onClick={handleAIPrompt}
            disabled={!aiPrompt.trim() || isProcessing}
            className="w-full bg-primary hover:bg-primary-hover"
            size="sm"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verarbeite...</span>
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Senden
              </>
            )}
          </Button>
          <p className="text-xs text-foreground-secondary text-center">
            KI kann Fehler machen. Medizinische Informationen prüfen.
          </p>
        </div>
      </div>
    </div>
  );
}