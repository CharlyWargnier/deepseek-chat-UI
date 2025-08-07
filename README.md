# 🧠 DeepSeek Chat Interface

*Built by Charlie Warnier to showcase DeepSeek's advanced reasoning capabilities and Render's powerful deployment features.*

**📱 Full Twitter Thread:** [See the complete development process and showcase](#) <!-- Replace with actual Twitter thread link -->

A modern chat interface for DeepSeek AI models with advanced reasoning capabilities and collapsible thinking sections.

## ✨ Key Features

- **DeepSeek-R1** integration with visible reasoning process
- **Modern UI** with glassmorphism design and responsive layout
- **Multiple models** support (DeepSeek, Llama, Mixtral, WizardLM)
- **Export functionality** (JSON, TXT, Markdown)
- **Temperature control** for response creativity

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ and Python 3.10+
- **DeepInfra API key** → [Create account here](https://deepinfra.com)

> 📝 **Note:** After creating your DeepInfra account, go to your dashboard to generate an API key. You'll need this for the next steps.

### Installation Steps

1. **Clone and setup backend**
```bash
git clone https://github.com/CharlyWargnier/deepseek-chat-UI.git
cd deepseek-chat-UI
pip install -r requirements.txt
```

2. **Configure API key in `.env` file**
```bash
# The .env file is already in the repository
# Simply open it and add your DeepInfra API key:
DEEPINFRA_API_KEY=your_actual_api_key_here
```

> 📝 **Note:** Replace `your_actual_api_key_here` with your actual DeepInfra API key (no quotes needed)

3. **Start the application**
```bash
# Terminal 1 - Backend (from project root directory)
python -m uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend (open new terminal, from project root)
cd cursor-chat-app
npm install
npm run dev
```

4. **Open** `http://localhost:3000`

> ⚠️ **Important:** Keep both terminals running. The backend (port 8000) and frontend (port 3000) must both be active.

## 📦 Tech Stack

**Frontend:** Next.js 15, shadcn/ui, Tailwind CSS, React Markdown  
**Backend:** FastAPI, OpenAI SDK

## 🚀 Deploy on Render

1. Fork this repository to your own GitHub account
2. Connect your GitHub repository to Render
3. Create **Web Service** (FastAPI backend) and **Static Site** (Next.js frontend)
4. In Render dashboard, set the environment variable:
   - Key: `DEEPINFRA_API_KEY`
   - Value: Your actual DeepInfra API key
5. Deploy both services

> 💡 **Tip:** The Web Service should point to the root directory (main.py), and the Static Site should point to the `cursor-chat-app` folder.


---
