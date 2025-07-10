from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Pour le dev, à restreindre en prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create an OpenAI client with DeepInfra token and endpoint (official implementation)
openai = OpenAI(
    api_key="YOUR_DEEPINFR_API_KEY",
    base_url="https://api.deepinfra.com/v1/openai",
)

@app.get("/")
def home():
    return {"message": "✅ FastAPI + DeepSeek is running!"}

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    user_input = body.get("message", "")

    try:
        chat_completion = openai.chat.completions.create(
            model="deepseek-ai/DeepSeek-R1-0528-Turbo",
            messages=[{"role": "user", "content": user_input}],
        )

        return {"response": chat_completion.choices[0].message.content}
    except Exception as e:
        return {"response": f"Erreur: {str(e)}"} 