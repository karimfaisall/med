import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Typography,
  Divider,
  Collapse,
  Badge,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  AvatarGroup,
} from '@mui/material';
import {
  Inbox,
  SmartToy,
  Forum,
  Warning,
  People,
  Assignment,
  Groups,
  Settings,
  ExpandLess,
  ExpandMore,
  Add,
  Search,
  Close,
  PersonAdd,
  Tag,

  Circle,
} from '@mui/icons-material';
import { Screen, User, Team, UserStatus } from '../types';

interface LeftDrawerProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  users: User[];
  teams: Team[];
  currentUser: User;
  isMobile?: boolean;
  onCloseDrawer?: () => void;
}

// Navigation items configuration
const navigationItems = [
  {
    id: 'inbox' as Screen,
    label: 'Posteingang',
    tooltip: 'Inbox',
    icon: Inbox,
    badge: 5,
  },
  {
    id: 'ai-assistant' as Screen,
    label: 'KI-Assistent',
    tooltip: 'AI Assistant',
    icon: SmartToy,
    badge: null,
  },
  {
    id: 'threads' as Screen,
    label: 'Threads',
    tooltip: 'Threads',
    icon: Forum,
    badge: null,
  },
  {
    id: 'alerts' as Screen,
    label: 'Warnungen',
    tooltip: 'Alerts & Escalations',
    icon: Warning,
    badge: 2,
  },
  {
    id: 'patients' as Screen,
    label: 'Patienten',
    tooltip: 'Patients',
    icon: People,
    badge: null,
  },
  {
    id: 'referrals' as Screen,
    label: 'Überweisungen',
    tooltip: 'Referrals',
    icon: Assignment,
    badge: 1,
  },
  {
    id: 'team' as Screen,
    label: 'Team',
    tooltip: 'Team & Users',
    icon: Groups,
    badge: null,
  },
  {
    id: 'admin' as Screen,
    label: 'Einstellungen',
    tooltip: 'Settings',
    icon: Settings,
    badge: null,
  },
];

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Hans Weber',
    email: 'h.weber@klinik.de',
    role: 'doctor',
    status: 'online',
    title: 'Kardiologe',
    department: 'Kardiologie',
  },
  {
    id: '2',
    name: 'Dr. Sarah Fischer',
    email: 's.fischer@klinik.de',
    role: 'doctor',
    status: 'away',
    title: 'Radiologin',
    department: 'Radiologie',
  },
  {
    id: '3',
    name: 'Maria Schneider',
    email: 'm.schneider@klinik.de',
    role: 'nurse',
    status: 'online',
    title: 'Krankenschwester',
    department: 'Station 3A',
  },
  {
    id: '4',
    name: 'Dr. Michael Klein',
    email: 'm.klein@klinik.de',
    role: 'doctor',
    status: 'offline',
    title: 'Orthopäde',
    department: 'Orthopädie',
  },
];

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Kardiologie Team',
    description: 'Kardiologie-Abteilung',
    members: [mockUsers[0]],
    isPrivate: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Notaufnahme',
    description: 'Notfall- und Akutmedizin',
    members: mockUsers.slice(0, 3),
    isPrivate: false,
    createdAt: new Date(),
  },
];

export function LeftDrawer({
  currentScreen,
  onNavigate,
  users = mockUsers,
  teams = mockTeams,
  currentUser,
  isMobile = false,
  onCloseDrawer,
}: LeftDrawerProps) {
  const [teamsExpanded, setTeamsExpanded] = useState(true);
  const [dmsExpanded, setDmsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'doctor' | 'nurse' | 'admin'>('doctor');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Get status color and icon
  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'online':
        return 'success.main';
      case 'away':
        return 'warning.main';
      case 'offline':
        return 'grey.400';
      default:
        return 'grey.400';
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Abwesend';
      case 'offline':
        return 'Offline';
      default:
        return 'Unbekannt';
    }
  };

  // Handle navigation with mobile drawer close
  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    if (isMobile && onCloseDrawer) {
      onCloseDrawer();
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle add user
  const handleAddUser = () => {
    // Mock user addition
    setSnackbarMessage(`Benutzer ${newUserName} wurde hinzugefügt`);
    setSnackbarOpen(true);
    setAddUserDialogOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('doctor');
  };

  // Get user initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            M
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1 }}>
              Med
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentUser.name}
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <IconButton onClick={onCloseDrawer} size="small">
            <Close />
          </IconButton>
        )}
      </Box>

      {/* Search */}
      <Box sx={{ p: 2 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Suchen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
            },
          }}
        />
      </Box>

      {/* Main Navigation */}
      <List sx={{ px: 1 }}>
        {navigationItems.map((item) => (
          <Tooltip key={item.id} title={item.tooltip} placement="right" arrow>
            <ListItem disablePadding>
              <ListItemButton
                selected={currentScreen === item.id}
                onClick={() => handleNavigate(item.id)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon>
                  <Badge
                    badgeContent={item.badge}
                    color="error"
                    invisible={!item.badge}
                  >
                    <item.icon />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: currentScreen === item.id ? 600 : 400,
                  }}
                />
                {item.badge && (
                  <Chip
                    label={item.badge > 99 ? '99+' : item.badge}
                    size="small"
                    color="error"
                    sx={{ height: 18, fontSize: '0.75rem' }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      {/* Teams Section */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <ListItemButton
          onClick={() => setTeamsExpanded(!teamsExpanded)}
          sx={{ px: 2 }}
        >
          <ListItemText
            primary="Meine Teams"
            primaryTypographyProps={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          />
          {teamsExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={teamsExpanded} timeout="auto" unmountOnExit>
          <List sx={{ px: 1 }}>
            {teams.map((team) => (
              <ListItem key={team.id} disablePadding>
                <ListItemButton sx={{ borderRadius: 1, mx: 1, py: 0.5 }}>
                  <ListItemIcon>
                    <Tag sx={{ fontSize: '1rem' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={team.name}
                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                  />
                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 20, height: 20, fontSize: '0.75rem' } }}>
                    {team.members.map((member) => (
                      <Avatar key={member.id} sx={{ width: 20, height: 20 }}>
                        {getInitials(member.name)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ borderRadius: 1, mx: 1, py: 0.5, color: 'text.secondary' }}
              >
                <ListItemIcon>
                  <Add sx={{ fontSize: '1rem' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Team hinzufügen"
                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Direct Messages Section */}
        <ListItemButton
          onClick={() => setDmsExpanded(!dmsExpanded)}
          sx={{ px: 2, mt: 1 }}
        >
          <ListItemText
            primary="Direktnachrichten"
            primaryTypographyProps={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          />
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setAddUserDialogOpen(true);
            }}
            sx={{ mr: 1 }}
          >
            <PersonAdd sx={{ fontSize: '1rem' }} />
          </IconButton>
          {dmsExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={dmsExpanded} timeout="auto" unmountOnExit>
          <List sx={{ px: 1, maxHeight: 300, overflow: 'auto' }}>
            {filteredUsers.map((user) => (
              <ListItem key={user.id} disablePadding>
                <ListItemButton sx={{ borderRadius: 1, mx: 1, py: 0.5 }}>
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Circle
                          sx={{
                            color: getStatusColor(user.status),
                            fontSize: '0.75rem',
                            border: '2px solid white',
                            borderRadius: '50%',
                          }}
                        />
                      }
                    >
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>
                        {getInitials(user.name)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={user.status === 'online' ? 'Online' : user.title}
                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                    secondaryTypographyProps={{
                      fontSize: '0.75rem',
                      color: user.status === 'online' ? 'success.main' : 'text.secondary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>

      {/* Current User Status */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Circle
              sx={{
                color: getStatusColor(currentUser.status),
                fontSize: '0.75rem',
                border: '2px solid white',
                borderRadius: '50%',
              }}
            />
          }
        >
          <Avatar sx={{ width: 40, height: 40 }}>
            {getInitials(currentUser.name)}
          </Avatar>
        </Badge>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {currentUser.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getStatusLabel(currentUser.status)}
          </Typography>
        </Box>
      </Box>

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Neuen Benutzer hinzufügen</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="E-Mail"
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Rolle</InputLabel>
              <Select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as 'doctor' | 'nurse' | 'admin')}
                label="Rolle"
              >
                <MenuItem value="doctor">Arzt</MenuItem>
                <MenuItem value="nurse">Krankenpfleger</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserDialogOpen(false)}>Abbrechen</Button>
          <Button
            onClick={handleAddUser}
            variant="contained"
            disabled={!newUserName || !newUserEmail}
          >
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
