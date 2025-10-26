# Prometheus - AI Agent Firewall Security Platform

![Prometheus Logo](https://img.shields.io/badge/Prometheus-AI%20Firewall-orange?style=for-the-badge&logo=fire)

A sophisticated AI-powered firewall security platform designed to protect vector databases from malicious embeddings, prompt injection attacks, jailbreaking attempts, and sensitive information exposure.

## 🔥 Features

### Core Security Features
- **Advanced Threat Detection**: Identifies prompt injection attempts, jailbreaking, and obfuscation techniques
- **Sensitive Information Protection**: Detects and blocks exposure of credentials, API tokens, and confidential data
- **Real-time Analysis**: Instant file analysis with comprehensive threat reporting
- **Multi-format Support**: Handles text files, images, and various document formats
- **Visual Threat Highlighting**: Interactive highlighting of suspicious patterns with detailed explanations

### User Interface Features
- **Role-based Access Control**: Different user roles with appropriate permissions
- **Interactive File Upload**: Drag-and-drop file upload with progress indicators
- **Image Preview**: Visual display of uploaded images with analysis results
- **Analysis History**: Complete audit trail of all file analyses
- **Statistics Dashboard**: Real-time overview of security metrics
- **AI Chatbot Integration**: Contextual assistance for security analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd firewall-gatekeeper-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to access the application.

## 📖 How It Works

### 1. File Upload & Analysis

The platform supports multiple file types for security analysis:

#### Supported File Types
- **Text Files**: `.txt`, `.json`, `.csv`, `.md`, `.log`
- **Image Files**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`, `.svg`

#### Upload Methods
- **Drag & Drop**: Simply drag files onto the upload area
- **File Browser**: Click "Choose File" to browse your system
- **Demo Mode**: Load a pre-configured demo file with sample threats

### 2. Security Analysis Process

When a file is uploaded, the system performs comprehensive analysis:

1. **File Type Detection**: Identifies the file format and applies appropriate analysis methods
2. **Content Scanning**: Analyzes file contents for suspicious patterns
3. **Threat Classification**: Categorizes detected threats by severity and type
4. **Pattern Highlighting**: Marks suspicious content with interactive tooltips
5. **Result Generation**: Creates detailed analysis report with recommendations

### 3. Threat Detection Capabilities

#### Prompt Injection Detection
- Identifies attempts to override system instructions
- Detects malicious prompt manipulation techniques
- Flags suspicious command injections

#### Sensitive Information Exposure
- Detects leaked credentials and passwords
- Identifies exposed API tokens and secrets
- Flags confidential data in unexpected contexts

#### Jailbreaking Attempts
- Recognizes attempts to bypass safety restrictions
- Detects system prompt extraction attempts
- Identifies unauthorized access requests

### 4. User Interface Components

#### Role Selector
Choose your user role to access appropriate features:
- **Administrator**: Full access to all features and settings
- **Security Analyst**: Analysis and reporting capabilities
- **Standard User**: Basic file upload and viewing

#### Statistics Overview
Real-time dashboard showing:
- Total files analyzed
- Approved files count
- Blocked files count
- Security trends and patterns

#### Analysis History
Complete audit trail featuring:
- File name and upload timestamp
- Analysis status (Approved/Blocked/Warning)
- Detected threats with detailed explanations
- File content preview with threat highlighting
- Image previews for uploaded images

#### File Content Display
Interactive content viewer with:
- **Text Files**: Syntax highlighting with threat markers
- **Image Files**: Visual preview with analysis metadata
- **Threat Tooltips**: Hover over highlighted text for detailed threat information
- **Expandable Sections**: Collapsible content areas for better organization

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with comprehensive interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: High-quality, accessible UI components

### Key Components

#### FileUpload Component
- Handles file selection and drag-and-drop functionality
- Supports multiple file types with appropriate processing
- Generates image previews for uploaded images
- Provides demo mode for testing and demonstration

#### AnalysisResults Component
- Displays analysis history in chronological order
- Shows file status, threats, and metadata
- Integrates with FileContentDisplay for detailed content viewing
- Provides role-based access control

#### FileContentDisplay Component
- Renders file content with threat highlighting
- Supports both text and image file types
- Interactive threat tooltips with detailed explanations
- Expandable/collapsible content sections

#### StatsOverview Component
- Real-time statistics dashboard
- Visual representation of security metrics
- Responsive grid layout for different screen sizes

### Data Flow

1. **File Upload**: User uploads file via drag-drop or file browser
2. **Processing**: File is analyzed based on type (text/image)
3. **Analysis**: Content is scanned for threats and suspicious patterns
4. **Storage**: Results are stored in application state
5. **Display**: Analysis results are rendered in the UI
6. **History**: All analyses are maintained in the history view

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Security Settings
VITE_MAX_FILE_SIZE=10485760  # 10MB
VITE_ALLOWED_FILE_TYPES=.txt,.json,.csv,.md,.log,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg

# Feature Flags
VITE_ENABLE_DEMO_MODE=true
VITE_ENABLE_IMAGE_PREVIEW=true
```

### Customization

#### Adding New File Types
1. Update the `accept` attribute in `FileUpload.tsx`
2. Add processing logic in the `analyzeFile` function
3. Update the `FileContentDisplay` component for proper rendering

#### Modifying Threat Detection
1. Update the `suspiciousPatterns` array in demo data
2. Modify threat detection logic in the analysis functions
3. Update threat highlighting styles in `FileContentDisplay`

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Deploy the `dist` folder to any static hosting service
- **Docker**: Use the provided Dockerfile for containerized deployment
- **Cloud Platforms**: Deploy to Vercel, Netlify, or AWS S3

### Environment Setup
1. Configure production environment variables
2. Set up API endpoints for backend integration
3. Configure CDN for static asset delivery
4. Set up monitoring and logging

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Maintain consistent naming conventions
- Add proper error handling and loading states
- Write comprehensive component documentation

## 📝 API Integration

### Backend Integration
The frontend is designed to integrate with a backend API for actual threat detection:

```typescript
// Example API integration
const analyzeFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
};
```

### Expected API Endpoints
- `POST /api/analyze` - File analysis endpoint
- `GET /api/history` - Analysis history retrieval
- `GET /api/stats` - Statistics and metrics
- `POST /api/feedback` - User feedback submission

## 🔒 Security Considerations

### Client-Side Security
- Input validation for all file uploads
- File type verification and size limits
- XSS protection through proper content sanitization
- CSRF protection for API calls

### Data Privacy
- No sensitive data stored in browser storage
- Secure handling of file contents
- Proper cleanup of temporary data
- User consent for data processing

## 📊 Performance Optimization

### Optimization Strategies
- Lazy loading of analysis results
- Image compression and optimization
- Efficient re-rendering with React.memo
- Debounced search and filtering
- Virtual scrolling for large datasets

### Monitoring
- Performance metrics tracking
- Error boundary implementation
- User interaction analytics
- Resource usage monitoring

## 🐛 Troubleshooting

### Common Issues

#### File Upload Issues
- **Problem**: Files not uploading
- **Solution**: Check file size limits and supported formats

#### Image Display Problems
- **Problem**: Images not showing
- **Solution**: Verify image format support and file integrity

#### Performance Issues
- **Problem**: Slow analysis or rendering
- **Solution**: Check file size limits and browser performance

### Debug Mode
Enable debug mode by setting `VITE_DEBUG=true` in your environment variables.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, email support@prometheus-firewall.com or join our community Discord server.

---

**Prometheus** - Protecting your data with the fire of intelligence 🔥