const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const event = req.body.events?.[0];
  if (event && event.source && event.source.userId) {
    console.log("🔍 userId:", event.source.userId);
  } else {
    console.log("❌ 沒有抓到 userId");
  }
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("🚀 Server running on port", port);
});
