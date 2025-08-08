import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  TextField,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  LinearProgress,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  ExpandMore,
  SmartToy,
  Person,
  AttachFile,
  PushPin,
  Send,
  ThumbUp,
  ThumbDown,
  ContentCopy,
  Security,
  Warning,
  CheckCircle,
  Schedule,
  Close,
  Description,
  Image,
  PictureAsPdf,
} from '@mui/icons-material';
import { Conversation, Patient, Message } from '../types';

interface RightContextPanelProps {
  conversation?: Conversation;
  patient?: Patient;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

// Mock AI insights
const aiInsights = [
  {
    id: '1',
    type: 'summary',
    title: 'Gesprächszusammenfassung',
    content: 'Patient Anna Schmidt: Laborergebnisse zeigen Normalwerte. Röntgenaufnahmen wurden übertragen. Nachkontrolle in 2 Wochen empfohlen.',
    confidence: 0.95,
    actions: ['Termin vorschlagen', 'In Akte eintragen'],
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'Antwortvorschlag',
    content: 'Danke für die Übermittlung. Die Röntgenaufnahmen wurden gesichtet. Ich stimme der Empfehlung zur Nachkontrolle in 2 Wochen zu.',
    confidence: 0.92,
    actions: ['Verwenden', 'Bearbeiten'],
  },
  {
    id: '3',
    type: 'compliance',
    title: 'Compliance-Prüfung',
    content: 'Alle DSGVO-Anforderungen erfüllt. KIM-Verschlüsselung aktiv. Hinweis: Behandlungsentscheidungen dokumentieren.',
    confidence: 0.98,
    actions: ['Dokumentieren'],
  },
];

// Mock shared files
const sharedFiles = [
  {
    id: '1',
    name: 'Labor_Schmidt_2024.pdf',
    type: 'pdf',
    size: '2.3 MB',
    uploadedBy: 'Dr. Weber',
    uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'Roentgen_Thorax.jpg',
    type: 'image',
    size: '4.1 MB',
    uploadedBy: 'Dr. Weber',
    uploadedAt: new Date(Date.now() - 30 * 60 * 1000),
  },
];

export function RightContextPanel({
  conversation,
  patient,
  messages,
  onSendMessage,
  onClose,
  isMobile = false,
}: RightContextPanelProps) {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedPanels, setExpandedPanels] = useState<string[]>([
    'ai-insights',
    'patient-info',
    'compliance',
  ]);

  const handlePanelChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanels(prev =>
      isExpanded ? [...prev, panel] : prev.filter(p => p !== panel)
    );
  };

  const handleAIPrompt = async () => {
    if (!aiPrompt.trim()) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setAiPrompt('');
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdf color="error" />;
      case 'image':
        return <Image color="primary" />;
      default:
        return <Description />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'summary':
        return <SmartToy color="primary" />;
      case 'suggestion':
        return <SmartToy color="primary" />;
      case 'compliance':
        return <Security color="success" />;
      default:
        return <SmartToy />;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Mobile Header */}
      {isMobile && (
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <SmartToy sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              KI-Assistent
            </Typography>
            <IconButton edge="end" onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SmartToy />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              KI-Assistent
            </Typography>
            <Typography variant="caption" color="text.secondary">
              AI Assistant
            </Typography>
          </Box>
        </Box>
      )}

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {/* AI Insights */}
        <Accordion
          expanded={expandedPanels.includes('ai-insights')}
          onChange={handlePanelChange('ai-insights')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToy color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                KI-Einblicke
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {aiInsights.map((insight) => (
                <Paper key={insight.id} sx={{ p: 2 }} variant="outlined">
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                    {getInsightIcon(insight.type)}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {insight.title}
                      </Typography>
                      <Chip
                        label={`${Math.round(insight.confidence * 100)}%`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {insight.content}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                    <Button
                      size="small"
                      startIcon={<ContentCopy />}
                      onClick={() => navigator.clipboard.writeText(insight.content)}
                    >
                      Kopieren
                    </Button>
                    {insight.actions[0] && (
                      <Button size="small" variant="contained" color="primary">
                        {insight.actions[0]}
                      </Button>
                    )}
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
                      <IconButton size="small">
                        <ThumbUp fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <ThumbDown fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Patient Information */}
        {patient && (
          <Accordion
            expanded={expandedPanels.includes('patient-info')}
            onChange={handlePanelChange('patient-info')}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Patienteninformation
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {patient.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Geb. {new Date(patient.dateOfBirth).toLocaleDateString('de-DE')}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Versicherung:
                      </Typography>
                      <Typography variant="body2">{patient.insuranceId}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Einverständnis:
                      </Typography>
                      <Chip
                        label={patient.consentStatus === 'received' ? 'Erhalten' : 'Ausstehend'}
                        size="small"
                        color={patient.consentStatus === 'received' ? 'success' : 'warning'}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                    startIcon={<Person />}
                  >
                    Patientenakte öffnen
                  </Button>
                </CardContent>
              </Card>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Shared Files */}
        <Accordion
          expanded={expandedPanels.includes('files')}
          onChange={handlePanelChange('files')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AttachFile color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Geteilte Dateien
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {sharedFiles.map((file) => (
                <ListItem
                  key={file.id}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>{getFileIcon(file.type)}</ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={`${file.size} • ${file.uploadedBy}`}
                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                    secondaryTypographyProps={{ fontSize: '0.75rem' }}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Compliance Status */}
        <Accordion
          expanded={expandedPanels.includes('compliance')}
          onChange={handlePanelChange('compliance')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Security color="success" />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Compliance-Status
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">KIM-Verschlüsselung</Typography>
                <Chip
                  label="Aktiv"
                  size="small"
                  color="success"
                  icon={<CheckCircle />}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">DSGVO-konform</Typography>
                <Chip
                  label="Erfüllt"
                  size="small"
                  color="success"
                  icon={<CheckCircle />}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Dokumentationspflicht</Typography>
                <Chip
                  label="Ausstehend"
                  size="small"
                  color="warning"
                  icon={<Schedule />}
                />
              </Box>
              
              <Paper sx={{ p: 2, bgcolor: 'warning.light', color: 'warning.dark' }} variant="outlined">
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Warning />
                  <Typography variant="body2">
                    <strong>Hinweis:</strong> Behandlungsentscheidungen sollten in der Patientenakte dokumentiert werden.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Quick Actions */}
        <Accordion
          expanded={expandedPanels.includes('actions')}
          onChange={handlePanelChange('actions')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Schnellaktionen
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined" startIcon={<Warning />} fullWidth>
                Eskalation einleiten
              </Button>
              <Button variant="outlined" startIcon={<AttachFile />} fullWidth>
                Überweisung erstellen
              </Button>
              <Button variant="outlined" startIcon={<Schedule />} fullWidth>
                Termin vorschlagen
              </Button>
              <Button variant="outlined" startIcon={<Person />} fullWidth>
                Patientenakte öffnen
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* AI Chat Input */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToy color="primary" />
          KI-Assistent fragen
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            multiline
            rows={3}
            placeholder="Frage eingeben..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            disabled={isProcessing}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            startIcon={isProcessing ? null : <Send />}
            onClick={handleAIPrompt}
            disabled={!aiPrompt.trim() || isProcessing}
            fullWidth
          >
            {isProcessing ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinearProgress sx={{ width: 40, height: 2 }} />
                Verarbeite...
              </Box>
            ) : (
              'Senden'
            )}
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
            KI kann Fehler machen. Medizinische Informationen prüfen.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}