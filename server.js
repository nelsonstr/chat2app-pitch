const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store for live sales demo customization
let demoData = {
  clientName: "Chat2App",
  solutionTitle: "Zero to Hero: Chat-Driven Autonomous App Factory",
  metrics: [
    { label: "Idea to Live URL", value: "< 3 Minutes", detail: "Scaffold, test, commit, and deploy instantly from chat instructions" },
    { label: "Client Collaboration", value: "Real-Time", detail: "Dedicated Telegram/WhatsApp channels bridging clients, Sales, and PO" },
    { label: "Deployment Reliability", value: "100%", detail: "Automated Vercel staging preview branches & production gates" }
  ],
  testimonial: {
    quote: "We described what we wanted directly in chat, and a production-grade app was live before our meeting even finished.",
    author: "Enterprise Client Stakeholder"
  }
};

app.get('/api/config', (req, res) => {
  res.json(demoData);
});

app.get('/api/topic-link', (req, res) => {
  res.json({ url: process.env.CLIENT_TOPIC_URL || "" });
});

app.post('/api/config', (req, res) => {
  const { clientName, solutionTitle, metrics } = req.body;
  if (clientName) demoData.clientName = clientName;
  if (solutionTitle) demoData.solutionTitle = solutionTitle;
  if (metrics) demoData.metrics = metrics;
  res.json({ success: true, demoData });
});

app.listen(PORT, () => {
  console.log(`Sales Accelerator running on port ${PORT}`);
});
