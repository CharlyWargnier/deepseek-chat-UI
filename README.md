# 🧠 DeepSeek Chat Interface

A modern, feature-rich chat interface for DeepSeek AI models with advanced reasoning capabilities.

## ✨ Features

### 🎨 Modern UI Design
- **Gradient backgrounds** with glassmorphism effects
- **Branded header** with DeepSeek logo
- **Sidebar navigation** with intuitive controls
- **Responsive design** that works on all devices

### 🤖 AI Capabilities  
- **DeepSeek-R1** integration with reasoning model support
- **Collapsible thinking sections** to view AI reasoning process
- **Multiple model support** (DeepSeek, Llama, Mixtral, WizardLM)
- **Temperature control** for response creativity

### 🛠️ Advanced Features
- **Markdown rendering** for properly formatted responses
- **Export functionality** (JSON, TXT, Markdown formats)
- **Chat history management** with clear/reset options
- **Real-time settings** with model switching

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.10+
- DeepInfra API key ([get one here](https://deepinfra.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/deepseek-chat-interface.git
cd deepseek-chat-interface
```

2. **Setup Backend (FastAPI)**
```bash
pip install -r requirements.txt
# Edit main.py and add your DeepInfra API key
python -m uvicorn main:app --reload --port 8000
```

3. **Setup Frontend (Next.js)**
```bash
cd cursor-chat-app
npm install
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 🔧 Configuration

### API Key Setup
Replace the API key in `main.py`:
```python
openai = OpenAI(
    api_key="YOUR_DEEPINFRA_API_KEY_HERE",
    base_url="https://api.deepinfra.com/v1/openai",
)
```

### Available Models
- DeepSeek-R1-0528-Turbo (reasoning)
- Meta-Llama-3.1-70B-Instruct  
- Meta-Llama-3.1-8B-Instruct
- Microsoft/WizardLM-2-8x22B
- Mistral/Mixtral-8x7B-Instruct

## 📦 Tech Stack

### Frontend
- **Next.js 15** - React framework
- **shadcn/ui** - Modern component library  
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **React Markdown** - Markdown rendering

### Backend  
- **FastAPI** - Modern Python web framework
- **OpenAI Python SDK** - API integration
- **CORS middleware** - Cross-origin support

## 🎯 Architecture

```
├── main.py                 # FastAPI backend server
├── requirements.txt        # Python dependencies  
└── cursor-chat-app/        # Next.js frontend
    ├── src/
    │   ├── app/            # Next.js app router
    │   └── components/     # React components
    │       ├── chat-interface.tsx
    │       ├── reasoning-message.tsx
    │       ├── settings-panel.tsx
    │       ├── sidebar.tsx
    │       └── ui/         # shadcn/ui components
    └── package.json
```

## 🌟 Key Components

- **ReasoningMessage**: Displays collapsible thinking sections for reasoning models
- **SettingsPanel**: Temperature and model selection controls
- **ExportMenu**: Multiple export format options
- **BrandedHeader**: Professional header with DeepSeek branding
- **Sidebar**: Navigation and chat management

## 🚀 Deployment

### Render.com (Recommended)
1. Connect your GitHub repository to Render
2. Create a **Web Service** for the backend (FastAPI)
3. Create a **Static Site** for the frontend (Next.js)
4. Set environment variables in Render dashboard

### Environment Variables
- `DEEPINFRA_TOKEN`: Your DeepInfra API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **DeepSeek AI** for the amazing reasoning models
- **shadcn/ui** for the beautiful component library
- **Vercel** for Next.js framework
- **FastAPI** for the excellent Python web framework

---

Made with ❤️ for the AI community 