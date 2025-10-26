# VecSec - AI Agent Firewall Security Platform

![VecSec Logo](https://img.shields.io/badge/VecSec-AI%20Firewall-orange?style=for-the-badge&logo=fire)

VecSec is an AI-powered security platform that protects vector databases from malicious embeddings, prompt injection attacks, and sensitive data exposure. It provides real-time monitoring and interactive file analysis to ensure your AI systems remain secure.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone and install**
   ```bash
   git clone <YOUR_GIT_URL>
   cd firewall-gatekeeper-ui
   npm install
   ```

2. **Start the application**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 How to Use

### Dashboard
The main dashboard provides real-time security monitoring:
- **Metrics Overview**: Response time, detection accuracy, active threats, and total requests
- **Charts**: Visual trends for request volume and threat detection over 24 hours
- **System Status**: Security and performance summaries

### Demo Page
Interactive file analysis and testing:
1. **Select Role**: Choose Admin, Security Analyst, or Guest
2. **Upload File**: Drag & drop or click to browse (supports text files and images)
3. **View Results**: See file contents with threat highlighting
4. **Chat**: Ask questions about the analysis using the AI assistant
5. **Review Threats**: Expand the threats section to see detailed security issues

## 🔧 Features

### Security Analysis
- **Threat Detection**: Identifies prompt injection, jailbreaking, and obfuscation attempts
- **Sensitive Data Protection**: Detects exposed credentials, API tokens, and confidential information
- **Multi-format Support**: Handles text files (.txt, .json, .csv, .md, .log) and images (.jpg, .png, .gif, etc.)
- **Visual Highlighting**: Interactive threat markers with detailed explanations

### Dashboard Analytics
- **Real-time Metrics**: Live monitoring of system performance
- **Interactive Charts**: Request volume and threat detection trends
- **Export Capabilities**: Data export for reporting
- **Auto-refresh**: Updates every 30 seconds

### User Experience
- **Role-based Access**: Different permission levels for different users
- **Clean Interface**: Simple, intuitive design
- **Fresh Analysis**: Each file upload starts with a clean slate
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Technical Details

### Built With
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality UI components
- **Recharts**: Interactive data visualization
- **Vite**: Fast build tool

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── FileUpload.tsx  # File upload and analysis
│   ├── FileContentDisplay.tsx # File content viewer
│   ├── Chatbot.tsx     # AI assistant
│   └── Navigation.tsx  # App navigation
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Analytics dashboard
│   └── Demo.tsx        # File analysis demo
└── lib/                # Utilities and helpers
```

### API Integration
The frontend is designed to work with a backend API. Key endpoints:
- `POST /api/analyze` - File analysis
- `GET /api/metrics` - Dashboard metrics
- `GET /api/history` - Analysis history

## 🎯 Use Cases

### Security Teams
- Monitor system performance and threat levels
- Analyze suspicious files before they enter the system
- Get real-time alerts on security issues

### Developers
- Test file uploads for security vulnerabilities
- Understand how different file types are processed
- Debug security analysis results

### Administrators
- Oversee system health and performance
- Export data for compliance reporting
- Manage user access and permissions

## 🔒 Security Features

### Threat Detection
- **Prompt Injection**: Detects attempts to override system instructions
- **Jailbreaking**: Identifies attempts to bypass safety restrictions
- **Data Exposure**: Finds leaked credentials and sensitive information
- **Obfuscation**: Recognizes hidden malicious content

### File Analysis
- **Content Scanning**: Deep analysis of file contents
- **Pattern Recognition**: Identifies suspicious text patterns
- **Image Processing**: Analyzes uploaded images for metadata
- **Real-time Results**: Instant analysis and feedback

## 📊 Dashboard Metrics

### Key Performance Indicators
- **Response Time**: Average processing time in milliseconds
- **Detection Accuracy**: Percentage of threats correctly identified
- **Active Threats**: Number of threats detected in the current period
- **Total Requests**: Files processed today

### Visual Analytics
- **Request Volume**: 24-hour trend of file processing
- **Threat Detection**: Timeline of blocked threats
- **System Status**: Security and performance summaries

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Deploy `dist` folder to any static host
- **Docker**: Use provided Dockerfile for containerized deployment
- **Cloud Platforms**: Deploy to Vercel, Netlify, or AWS

### Environment Configuration
Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MAX_FILE_SIZE=10485760
VITE_ENABLE_DEMO_MODE=true
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow React best practices
- Maintain consistent naming conventions
- Add proper error handling
- Write component documentation

## 📞 Support

- **Email**: support@vecsec-firewall.com
- **Documentation**: Check this README for common questions
- **Issues**: Report bugs via GitHub Issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**VecSec** - Protecting your data with the fire of intelligence 🔥