import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Card,
  CardContent,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Send,
  AttachFile,
  Person,
  Groups,
  Info,
} from '@mui/icons-material';

interface ComposeScreenProps {
  onBackToInbox: () => void;
  isMobileView?: boolean;
}

export function ComposeScreen({ onBackToInbox, isMobileView }: ComposeScreenProps) {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [recipientType, setRecipientType] = useState('patient');

  const handleSend = () => {
    console.log('Sending message:', { recipient, subject, message, priority });
    onBackToInbox();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={onBackToInbox}
            color="inherit"
          >
            Zurück
          </Button>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Neue Nachricht
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Compose new message
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Compose Form */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Card sx={{ maxWidth: 800, mx: 'auto' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Nachricht verfassen
            </Typography>
            
            <Stack spacing={3}>
              {/* Recipient Type and Priority */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Empfänger-Typ</InputLabel>
                  <Select
                    value={recipientType}
                    onChange={(e) => setRecipientType(e.target.value)}
                    label="Empfänger-Typ"
                  >
                    <MenuItem value="patient">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Person />
                        <span>Patient</span>
                      </Stack>
                    </MenuItem>
                    <MenuItem value="team">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Groups />
                        <span>Team/Kollege</span>
                      </Stack>
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Priorität</InputLabel>
                  <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    label="Priorität"
                  >
                    <MenuItem value="low">Niedrig</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="high">Hoch</MenuItem>
                    <MenuItem value="urgent">Dringend</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {/* Recipient */}
              <TextField
                fullWidth
                label="An"
                placeholder={recipientType === 'patient' ? 'Patientenname oder KIM-Adresse' : 'Kollege oder Team auswählen'}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />

              {/* Subject */}
              <TextField
                fullWidth
                label="Betreff"
                placeholder="Betreff der Nachricht"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              {/* Message */}
              <TextField
                fullWidth
                label="Nachricht"
                placeholder="Ihre Nachricht..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={8}
              />

              {/* Attachments */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Anhänge
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    border: '2px dashed',
                    borderColor: 'divider',
                    bgcolor: 'grey.50',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  <AttachFile sx={{ fontSize: 32, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Dateien hier ablegen oder{' '}
                    <Button variant="text" sx={{ p: 0, textTransform: 'none' }}>
                      durchsuchen
                    </Button>
                  </Typography>
                </Paper>
              </Box>

              {/* Compliance Notice */}
              <Alert severity="info" icon={<Info />}>
                <Typography variant="body2">
                  <strong>Compliance-Hinweis:</strong> Alle Nachrichten werden KIM-verschlüsselt übertragen und sind DSGVO-konform. 
                  Bitte achten Sie auf die korrekte Klassifizierung sensibler Patientendaten.
                </Typography>
              </Alert>

              <Divider />

              {/* Actions */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="KIM-verschlüsselt"
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                  {priority === 'urgent' && (
                    <Chip
                      label="Dringend"
                      color="error"
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Stack>
                
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={onBackToInbox}>
                    Abbrechen
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Send />}
                    onClick={handleSend}
                    disabled={!recipient || !message}
                  >
                    Senden
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}