import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface PatientTimelineScreenProps {
  onBackToInbox: () => void;
}

export function PatientTimelineScreen({ onBackToInbox }: PatientTimelineScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={onBackToInbox}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Patienten-Timeline</h1>
            <p className="text-sm text-foreground-secondary">Patient Timeline</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-foreground-secondary">Patient Timeline Screen - In Development</p>
      </div>
    </div>
  );
}