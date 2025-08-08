import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Divider,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Security,
  SmartToy,
  Groups,
  Lock,
} from '@mui/icons-material';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    onLogin();
  };

  const features = [
    {
      icon: Security,
      title: 'KIM-verschlüsselt',
      description: 'Sichere Kommunikation nach TI-Standards',
    },
    {
      icon: SmartToy,
      title: 'KI-unterstützt',
      description: 'Intelligente Assistenz für medizinische Kommunikation',
    },
    {
      icon: Groups,
      title: 'Teamwork',
      description: 'Nahtlose Zusammenarbeit zwischen Fachbereichen',
    },
    {
      icon: Lock,
      title: 'DSGVO-konform',
      description: 'Vollständige Einhaltung aller Datenschutzbestimmungen',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e3f2fd 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Branding */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ textAlign: { xs: 'center', lg: 'left' }, mb: { xs: 4, lg: 0 } }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3, justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: 'primary.main',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  M
                </Avatar>
                <Box>
                  <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                    Med
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Healthcare Communication Platform
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                Sichere medizinische
                <Box component="span" sx={{ color: 'primary.main', display: 'block' }}>
                  Kommunikation
                </Box>
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
                Die professionelle Lösung für KIM-verschlüsselte Kommunikation im Gesundheitswesen mit KI-Unterstützung.
              </Typography>

              {/* Features */}
              <Grid container spacing={2}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: 'primary.light',
                              color: 'primary.main',
                            }}
                          >
                            <feature.icon sx={{ fontSize: '1rem' }} />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Compliance Badges */}
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 3, flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', lg: 'flex-start' } }}
              >
                <Chip
                  icon={<Security />}
                  label="TI-zertifiziert"
                  color="success"
                  variant="outlined"
                />
                <Chip
                  label="DSGVO-konform"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="ISO 27001"
                  color="warning"
                  variant="outlined"
                />
              </Stack>
            </Box>
          </Grid>

          {/* Right side - Login Form */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  width: '100%',
                  maxWidth: 400,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" component="h2" sx={{ mb: 1, textAlign: 'center', fontWeight: 600 }}>
                  Anmelden
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                  Geben Sie Ihre Zugangsdaten ein, um fortzufahren
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="E-Mail-Adresse"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                    placeholder="ihre.email@klinik.de"
                  />

                  <TextField
                    fullWidth
                    label="Passwort"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                    placeholder="••••••••"
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          Angemeldet bleiben
                        </Typography>
                      }
                    />
                    <Link href="#" variant="body2" color="primary">
                      Passwort vergessen?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{ mb: 2, py: 1.5 }}
                  >
                    {isLoading ? 'Anmeldung läuft...' : 'Anmelden'}
                  </Button>

                  {isLoading && (
                    <LinearProgress sx={{ mb: 2 }} />
                  )}

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Noch kein Konto?{' '}
                    <Link href="#" color="primary" sx={{ fontWeight: 500 }}>
                      Registrieren
                    </Link>
                  </Typography>
                </Box>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mt: 3,
                    bgcolor: 'grey.50',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    <strong>Demo-Zugang:</strong> Verwenden Sie beliebige E-Mail und Passwort
                  </Typography>
                </Paper>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
