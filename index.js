require('dotenv').config(); const express = require('express'); const bodyParser = require('body-parser'); const { MessagingResponse } = require('twilio').twiml; const { OpenAI } = require('openai');

const app = express(); app.use(bodyParser.urlencoded({ extended: false }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**

Core Logic: Handles incoming WhatsApp messages.

Decides whether the user is asking a Healthcare question or logging an Expense. */ app.post('/whatsapp', async (req, res) => { const incomingMsg = req.body.Body; const from = req.body.From; const twiml = new MessagingResponse();

try { // AI Intent Classification and Processing const aiResponse = await openai.chat.completions.create({ model: "gpt-4-turbo-preview", messages: [ { role: "system", content: You are the staqlt Healthcare & Expense AI. If the user mentions money, receipts, or purchases, treat it as an EXPENSE and extract (Amount, Category, Item). If the user mentions symptoms or health, treat it as HEALTHCARE. Always provide a concise, professional response. If healthcare, include a disclaimer. }, { role: "user", content: incomingMsg } ] });

 const botReply = aiResponse.choices[0].message.content;

 // In a production scenario, the next steps include:
 // 1. If Expense: Write extracted JSON to Google Sheets/ERP via App Integration.
 // 2. If Healthcare: Query a RAG Vector DB (Pinecone/Weaviate) for medical context before answering.

 twiml.message(botReply);


} catch (error) { console.error("AI Processing Error:", error); twiml.message("I'm sorry, I'm having trouble processing that right now. Please try again."); }

res.writeHead(200, { 'Content-Type': 'text/xml' }); res.end(twiml.toString()); });

const PORT = process.env.PORT || 3000; app.listen(PORT, () => { console.log(staqlt AI Server running on port ${PORT}); });