import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Inbox,
  SmartToy,
  Forum,
  Warning,
  People,
  Assignment,
  Groups,
  Settings,
  Chat,
} from '@mui/icons-material';
import { LeftDrawer } from './LeftDrawer';
import { RightContextPanel } from './RightContextPanel';
import { Screen, User, Team, Conversation, Patient, Message } from '../types';

// Layout constants
const DRAWER_WIDTH = 260;
const RIGHT_PANEL_WIDTH = 320;

interface MUILayoutProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  children: React.ReactNode;
  conversation?: Conversation;
  patient?: Patient;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  users: User[];
  teams: Team[];
  currentUser: User;
  showRightPanel?: boolean;
}

const mobileBottomNavItems = [
  { screen: 'inbox' as Screen, label: 'Posteingang', icon: Inbox },
  { screen: 'threads' as Screen, label: 'Threads', icon: Forum },
  { screen: 'ai-assistant' as Screen, label: 'KI-Assistent', icon: SmartToy },
  { screen: 'team' as Screen, label: 'Team', icon: Groups },
];

export function MUILayout({
  currentScreen,
  onNavigate,
  children,
  conversation,
  patient,
  messages,
  onSendMessage,
  users,
  teams,
  currentUser,
  showRightPanel = false,
}: MUILayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(showRightPanel && !isMobile);
  const [mobileBottomValue, setMobileBottomValue] = useState(currentScreen);

  // Update mobile bottom nav when screen changes
  useEffect(() => {
    setMobileBottomValue(currentScreen);
  }, [currentScreen]);

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Handle right panel toggle
  const handleRightPanelToggle = () => {
    setRightPanelOpen(!rightPanelOpen);
  };

  // Handle mobile bottom navigation
  const handleMobileBottomNavChange = (event: React.SyntheticEvent, newValue: Screen) => {
    setMobileBottomValue(newValue);
    onNavigate(newValue);
  };

  // Calculate main content width based on panels
  const getMainContentStyles = () => {
    if (isMobile) {
      return {
        width: '100%',
        marginLeft: 0,
        paddingBottom: '56px', // Space for bottom navigation
      };
    }

    let marginLeft = DRAWER_WIDTH;
    let width = `calc(100% - ${DRAWER_WIDTH}px)`;

    if (rightPanelOpen && showRightPanel) {
      width = `calc(100% - ${DRAWER_WIDTH + RIGHT_PANEL_WIDTH}px)`;
    }

    return {
      width,
      marginLeft: `${marginLeft}px`,
    };
  };

  const drawer = (
    <LeftDrawer
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      users={users}
      teams={teams}
      currentUser={currentUser}
      isMobile={isMobile}
      onCloseDrawer={() => setMobileDrawerOpen(false)}
    />
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: 'background.paper',
            color: 'text.primary',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menü öffnen"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Med
            </Typography>
            {showRightPanel && (
              <IconButton
                color="inherit"
                aria-label="AI Panel"
                onClick={handleRightPanelToggle}
              >
                <SmartToy />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      )}

      {/* Left Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                backgroundColor: 'grey.50',
              },
            }}
          >
            {drawer}
          </Drawer>
        )}

        {/* Desktop Permanent Drawer */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                backgroundColor: 'grey.50',
                borderRight: `1px solid ${theme.palette.divider}`,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...getMainContentStyles(),
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          backgroundColor: 'background.default',
          overflow: 'hidden',
          ...(isMobile && {
            marginTop: '64px', // Space for mobile app bar
          }),
        }}
      >
        {children}
      </Box>

      {/* Right Context Panel */}
      {showRightPanel && (
        <>
          {/* Desktop Right Panel */}
          {!isMobile && (
            <Drawer
              variant={rightPanelOpen ? 'permanent' : 'temporary'}
              anchor="right"
              open={rightPanelOpen}
              onClose={handleRightPanelToggle}
              sx={{
                width: RIGHT_PANEL_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: RIGHT_PANEL_WIDTH,
                  boxSizing: 'border-box',
                  borderLeft: `1px solid ${theme.palette.divider}`,
                },
              }}
            >
              <RightContextPanel
                conversation={conversation}
                patient={patient}
                messages={messages}
                onSendMessage={onSendMessage}
                onClose={handleRightPanelToggle}
                isMobile={false}
              />
            </Drawer>
          )}

          {/* Mobile Right Panel */}
          {isMobile && (
            <Drawer
              variant="temporary"
              anchor="right"
              open={rightPanelOpen}
              onClose={handleRightPanelToggle}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '100%',
                  boxSizing: 'border-box',
                },
              }}
            >
              <RightContextPanel
                conversation={conversation}
                patient={patient}
                messages={messages}
                onSendMessage={onSendMessage}
                onClose={handleRightPanelToggle}
                isMobile={true}
              />
            </Drawer>
          )}

          {/* Mobile FAB for AI Panel */}
          {isMobile && !rightPanelOpen && (
            <Fab
              color="primary"
              aria-label="KI-Assistent öffnen"
              onClick={handleRightPanelToggle}
              sx={{
                position: 'fixed',
                bottom: 72, // Above bottom navigation
                right: 16,
                zIndex: theme.zIndex.speedDial,
              }}
            >
              <SmartToy />
            </Fab>
          )}
        </>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <BottomNavigation
          value={mobileBottomValue}
          onChange={handleMobileBottomNavChange}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.drawer + 1,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          {mobileBottomNavItems.map((item) => (
            <BottomNavigationAction
              key={item.screen}
              label={item.label}
              value={item.screen}
              icon={<item.icon />}
            />
          ))}
        </BottomNavigation>
      )}
    </Box>
  );
}
