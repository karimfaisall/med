import { Shield, CheckCircle, AlertCircle, Clock, Server, Globe } from 'lucide-react';

export const formatDateTime = (date: Date) => {
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected':
    case 'delivered':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'error':
    case 'failed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
    case 'delivered':
      return CheckCircle;
    case 'pending':
      return Clock;
    case 'error':
    case 'failed':
      return AlertCircle;
    default:
      return AlertCircle;
  }
};

export const getPartnerTypeIcon = (type: string) => {
  switch (type) {
    case 'clinic':
      return Shield;
    case 'pharmacy':
      return Globe;
    case 'lab':
      return Server;
    default:
      return Server;
  }
};

export const getPartnerTypeName = (type: string) => {
  switch (type) {
    case 'clinic':
      return 'Klinik';
    case 'pharmacy':
      return 'Apotheke';
    case 'lab':
      return 'Labor';
    default:
      return 'Unbekannt';
  }
};