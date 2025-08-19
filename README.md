# 🚗 Vehicle Damage Detection System

A comprehensive AI-powered system for detecting and analyzing vehicle damage by comparing before and after images. Built with FastAPI backend and Next.js frontend, featuring advanced computer vision algorithms for accurate damage assessment.

## ✨ Features

- **🖼️ Dual Image Analysis**: Compare before and after images to detect changes
- **🔍 AI-Powered Detection**: Advanced computer vision algorithms using OpenCV and scikit-image
- **📊 Detailed Reports**: Comprehensive damage analysis with severity levels and damage types
- **🎯 Damage Classification**: Automatically categorizes damage (scratches, dents, paint damage)
- **📱 Modern UI**: Responsive Next.js frontend with drag-and-drop image upload
- **🚀 Fast API**: High-performance FastAPI backend with automatic API documentation
- **🔒 Secure**: CORS-enabled with proper error handling and validation

## 🏗️ Architecture

```
├── backend/                 # FastAPI Python backend
│   ├── main.py             # Main application entry point
│   ├── routers/            # API route definitions
│   ├── utils/              # Image processing utilities
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js React frontend
│   ├── app/                # Next.js 13+ app directory
│   ├── components/         # React components
│   ├── types/              # TypeScript type definitions
│   └── package.json        # Node.js dependencies
└── start_*.bat             # Windows startup scripts
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 18+** with npm
- **Git** for version control

### 1. Clone the Repository

```bash
git clone https://github.com/Abhisheknakka/VehicleDetectDamager.git
cd VehicleDetectDamager
```

### 2. Start the Backend Server

```bash
# Windows
start_backend.bat

# Or manually:
cd backend
pip install -r requirements.txt
python main.py
```

The backend will be available at: http://localhost:8000

### 3. Start the Frontend Server

```bash
# Windows
start_frontend.bat

# Or manually:
cd frontend
npm install
npm run dev
```

The frontend will be available at: http://localhost:3000

### 4. Access the Application

- **Frontend App**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **OpenCV**: Computer vision library for image processing
- **scikit-image**: Advanced image processing algorithms
- **NumPy**: Numerical computing library
- **PIL/Pillow**: Python Imaging Library
- **Uvicorn**: ASGI server for FastAPI

### Frontend
- **Next.js 14**: React framework with app directory
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Dropzone**: Drag-and-drop file upload

## 📡 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Root endpoint with API status |
| `GET` | `/health` | Health check endpoint |
| `POST` | `/api/detect-damage` | Main damage detection endpoint |
| `POST` | `/api/upload-images` | Alternative file upload endpoint |

### Damage Detection Request

```json
{
  "before_image": "base64_encoded_image_string",
  "after_image": "base64_encoded_image_string"
}
```

### Response Format

```json
{
  "damage_detected": true,
  "similarity_score": 0.85,
  "damage_percentage": 2.3,
  "damage_count": 3,
  "damage_types": ["scratch", "dent"],
  "severity": "moderate",
  "message": "Damage detected! Moderate damage found (2.3% of image). Damage types: scratch, dent."
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend Configuration
BACKEND_URL=http://localhost:8000
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Vehicle Damage Detector
```

### Next.js Configuration

The frontend is configured to proxy API calls to the backend:

```javascript
// next.config.js
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8000/api/:path*',
    },
  ];
}
```

## 📁 Project Structure

```
vehicle-damage-detector/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── routers/
│   │   └── detection.py       # Damage detection API routes
│   └── utils/
│       └── image_processing.py # Computer vision algorithms
├── frontend/
│   ├── app/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/
│   │   ├── DamageReport.tsx   # Damage results display
│   │   └── ImageUploader.tsx  # Image upload component
│   ├── types/
│   │   └── damage.ts          # TypeScript interfaces
│   ├── package.json            # Node.js dependencies
│   └── next.config.js         # Next.js configuration
├── start_backend.bat           # Windows backend startup
├── start_frontend.bat          # Windows frontend startup
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
python -m pytest tests/
```

### Frontend Testing

```bash
cd frontend
npm test
```

### Manual Testing

1. **Backend Health Check**: http://localhost:8000/health
2. **API Documentation**: http://localhost:8000/docs
3. **Frontend App**: http://localhost:3000

## 🚀 Deployment

### Backend Deployment

```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production server
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript for frontend code
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenCV** for computer vision capabilities
- **scikit-image** for advanced image processing
- **FastAPI** for the excellent backend framework
- **Next.js** for the modern React framework
- **Tailwind CSS** for the beautiful UI components

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/vehicle-damage-detector/issues) page
2. Review the [API Documentation](http://localhost:8000/docs) when running locally
3. Create a new issue with detailed information

## 🔮 Roadmap

- [ ] **Real-time Processing**: WebSocket support for live analysis
- [ ] **Mobile App**: React Native mobile application
- [ ] **Cloud Integration**: AWS/Azure deployment support
- [ ] **Advanced AI**: Machine learning model integration
- [ ] **Batch Processing**: Multiple image analysis
- [ ] **Export Reports**: PDF/Excel report generation
- [ ] **User Authentication**: Secure user management
- [ ] **Database Integration**: Persistent storage for results

---

**Made with ❤️ by [Your Name]**

*Built for accurate vehicle damage assessment using cutting-edge computer vision technology.*