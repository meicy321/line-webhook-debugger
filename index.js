const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// 根目錄 GET，測試用
app.get('/', (req, res) => {
  res.send('LINE Webhook is running!');
});

// ✅ 這是 webhook 接收入口
app.post('/webhook', (req, res) => {
  console.log("🚀 Webhook 被觸發！");
  const events = req.body.events;
  if (!events || !Array.isArray(events)) {
    console.log("⚠️ 沒有有效的事件資料！");
    return res.status(200).end();
  }

  events.forEach(event => {
    const source = event.source || {};
    if (source.type === 'user') {
      console.log("✅ 來自個人 userId:", source.userId);
    } else if (source.type === 'group') {
      console.log("✅ 來自群組 groupId:", source.groupId, "userId:", source.userId);
    } else if (source.type === 'room') {
      console.log("✅ 來自聊天室 roomId:", source.roomId, "userId:", source.userId);
    }
  });

  res.status(200).end();
});

// 啟動伺服器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
