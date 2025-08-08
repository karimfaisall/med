# Med - Healthcare Communication Platform

A modern, Slack-inspired healthcare communication platform designed for German medical professionals, featuring KIM encryption, AI assistance, and GDPR compliance.


###  Slack-Style 3-Column Layout
- **Left Sidebar**: Navigation with Teams, Direct Messages, and user presence indicators
- **Main Panel**: Threaded messaging with reactions, file attachments, and real-time chat
- **Right AI Panel**: Contextual AI assistance, patient information, and compliance monitoring

###  Modern Chat Interface
- Slack-style threaded messages with sender avatars and timestamps
- Emoji reactions with click-to-add functionality
- Message editing, replying, copying, and deletion
- File attachments with preview cards
- Typing indicators and real-time message grouping

###  AI-Powered Assistance
- Automatic conversation summaries
- Intelligent reply suggestions
- Compliance monitoring and alerts
- Medical documentation assistance
- Context-aware patient information

###  Healthcare Compliance
- KIM (Kommunikation im Medizinwesen) encryption
- GDPR (DSGVO) compliant data handling
- TI (Telematikinfrastruktur) integration ready
- Audit trails and compliance reporting

###  Mobile-First Design
- Responsive layout for all devices (iPhone 13-17, Pixel 6/8, Samsung Galaxy)
- Touch-optimized interface with proper tap targets
- Collapsible sidebar with hamburger menu
- Safe area support for modern devices

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Tailwind CSS v4 + Radix UI
- **Icons**: Lucide React
- **Styling**: Custom design system inspired by Slack
- **State Management**: React hooks and context

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd med-slack-interface
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Access
Use any email and password combination to access the demo application.

## 📁 Project Structure

```
├── App.tsx                 # Main application component
├── types/                  # TypeScript type definitions
│   └── index.ts
├── components/            # React components
│   ├── ui/               # Reusable UI components (Radix UI + Tailwind)
│   ├── SlackLayout.tsx   # Main 3-column layout
│   ├── LeftSidebar.tsx   # Navigation sidebar
│   ├── RightAIPanel.tsx  # AI assistance panel
│   ├── SlackChatInterface.tsx # Chat messaging interface
│   └── [other screens]   # Individual screen components
└── styles/
    └── globals.css       # Global styles and Tailwind configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: #1264a3 (Slack Blue)
- **Success**: #2eb67d (Medical Green) 
- **Warning**: #ecb22e (Alert Yellow)
- **Error**: #e01e5a (Urgent Red)
- **Background**: #ffffff (Clean White)

### Typography
- **Font**: Inter (Google Fonts)
- **Base Size**: 14px (16px on mobile to prevent zoom)
- **Headings**: Semibold (600)
- **Body**: Regular (400) and Medium (500)

### Components
- **Radius**: 6px (standard), 12px (large cards)
- **Shadows**: Subtle layering with CSS custom properties
- **Touch Targets**: Minimum 44px for accessibility
- **Safe Areas**: Full support for device notches and home indicators

## 🌐 Internationalization

The application is designed for German healthcare professionals:

- **Primary Language**: German (Deutsch)
- **Tooltips**: English for technical terms
- **Medical Terms**: German medical terminology
- **Date/Time**: German locale formatting (DD.MM.YYYY, 24h time)

## 🔒 Security & Compliance

### GDPR/DSGVO Compliance
- Explicit consent management
- Data minimization principles
- Right to erasure implementation
- Audit logging for all actions

### KIM Integration
- End-to-end encryption for all messages
- Secure file transfer protocols
- Medical-grade authentication
- TI infrastructure compatibility

## 🧪 Development

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏥 Healthcare Notice

This application is designed for healthcare communication and includes features for medical data handling. Always ensure compliance with local healthcare regulations and data protection laws in your jurisdiction.

## 🚀 Deployment

The application is ready for deployment to:

- **Vercel**: Zero-config deployment with automatic optimization
- **Netlify**: JAMstack deployment with edge functions
- **AWS S3 + CloudFront**: Enterprise-grade CDN deployment
- **Docker**: Containerized deployment for on-premise hosting

## 📞 Support

For technical support or medical compliance questions, please contact:
- Email: support@med.de
- Documentation: https://docs.med.de
- Status Page: https://status.med.de

---

**Built with ❤️ for healthcare professionals in Germany**
