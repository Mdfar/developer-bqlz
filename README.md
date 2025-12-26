staqlt | Healthcare & Expense AI Assistant

This solution provides an integrated AI agent capable of handling healthcare inquiries and financial expense tracking via WhatsApp.

🚀 Features

Intent Classification: Automatically distinguishes between medical queries and financial logs using GPT-4.

WhatsApp Integration: High-accessibility interface using Twilio Messaging API.

Agentic Logic: Extracts structured data (Amount, Items) from raw text/voice messages.

🛠️ Setup

Clone this repository.

Run npm install.

Create a .env file based on .env.example.

Expose your local port (e.g., via Ngrok) and set the Twilio Sandbox URL to your-url/whatsapp.

Run npm start.

🏗️ Architecture

The system uses a Node.js Express server to handle Twilio webhooks. The orchestration layer (LLM) acts as the decision-maker for data routing between healthcare knowledge bases and financial databases.