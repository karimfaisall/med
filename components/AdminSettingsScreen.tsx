import { ArrowLeft, Settings, Users, Shield, Database } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AdminSettingsScreenProps {
  onBackToInbox: () => void;
}

export function AdminSettingsScreen({ onBackToInbox }: AdminSettingsScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={onBackToInbox}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Einstellungen</h1>
            <p className="text-sm text-foreground-secondary">System Administration</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Benutzerverwaltung</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary">Benutzer, Rollen und Berechtigungen verwalten</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Sicherheit</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary">Sicherheitsrichtlinien und Compliance-Einstellungen</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Datenbank</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary">Backup, Archivierung und Datenmanagement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>System</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary">Allgemeine Systemkonfiguration</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}