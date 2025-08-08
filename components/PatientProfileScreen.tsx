import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  CalendarToday,
  Security,
  Description,
  AccessTime,
  Assignment,
  PersonAdd,
} from '@mui/icons-material';
import { Patient } from '../types';

interface PatientProfileScreenProps {
  patient: Patient;
  onBackToInbox: () => void;
  isMobileView?: boolean;
}

export function PatientProfileScreen({ patient, onBackToInbox, isMobileView }: PatientProfileScreenProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getConsentStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'success';
      case 'missing': return 'error';
      case 'expired': return 'warning';
      default: return 'default';
    }
  };

  const getConsentStatusLabel = (status: string) => {
    switch (status) {
      case 'received': return 'Einverständnis erhalten';
      case 'missing': return 'Einverständnis fehlt';
      case 'expired': return 'Einverständnis abgelaufen';
      default: return 'Unbekannt';
    }
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
              Patientenakte
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Patient Profile
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Stack spacing={3}>
            {/* Patient Header */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'primary.main',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {getInitials(patient.name)}
                  </Avatar>
                  
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                          {patient.name}
                        </Typography>
                        <Stack direction="row" spacing={3} color="text.secondary">
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <CalendarToday sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                              Geb. {new Date(patient.dateOfBirth).toLocaleDateString('de-DE')}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Person sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                              {patient.insuranceId}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                      
                      <Chip
                        icon={<Security />}
                        label={getConsentStatusLabel(patient.consentStatus)}
                        color={getConsentStatusColor(patient.consentStatus) as any}
                        variant="outlined"
                      />
                    </Stack>
                    
                    {patient.kimAddress && (
                      <Card variant="outlined" sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', p: 2 }}>
                        <Typography variant="body2">
                          <strong>KIM-Adresse:</strong> {patient.kimAddress}
                        </Typography>
                      </Card>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Patient Timeline */}
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <AccessTime />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Behandlungsverlauf
                  </Typography>
                </Stack>
                
                <List>
                  {patient.timeline.map((event, index) => (
                    <React.Fragment key={event.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: event.urgent ? 'error.light' : 'primary.light',
                              color: event.urgent ? 'error.main' : 'primary.main',
                            }}
                          >
                            <Description sx={{ fontSize: 16 }} />
                          </Avatar>
                        </ListItemIcon>
                        
                        <ListItemText
                          primary={
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {event.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                  {event.description}
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                  <Typography variant="caption" color="text.disabled">
                                    {event.provider}
                                  </Typography>
                                  <Typography variant="caption" color="text.disabled">
                                    {event.timestamp.toLocaleDateString('de-DE')}
                                  </Typography>
                                </Stack>
                              </Box>
                              
                              <Stack direction="row" spacing={1}>
                                <Chip
                                  label={event.type}
                                  size="small"
                                  variant="outlined"
                                />
                                {event.urgent && (
                                  <Chip
                                    label="Dringend"
                                    size="small"
                                    color="error"
                                  />
                                )}
                              </Stack>
                            </Stack>
                          }
                        />
                      </ListItem>
                      {index < patient.timeline.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Schnellaktionen
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Description />}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Neue Notiz
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<CalendarToday />}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Termin planen
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Assignment />}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Überweisung
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}