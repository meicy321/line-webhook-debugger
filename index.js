const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// 讓根目錄也可以正常顯示
app.get('/', (req, res) => {
  res.send('LINE Webhook is running!');
});

app.post('/', (req, res) => {
  console.log("🚀 Webhook 被觸發！");
  
  const events = req.body.events;
  if (!events || !Array.isArray(events)) {
    console.log("⚠️ 沒有有效的事件資料！");
    return res.status(200).end();
  }

  events.forEach(event => {
    console.log("📥 收到事件：", JSON.stringify(event, null, 2));

    if (event.source) {
      if (event.source.type === 'user') {
        console.log("✅ userId:", event.source.userId);
      } else if (event.source.type === 'group') {
        console.log("👥 groupId:", event.source.groupId);
      } else if (event.source.type === 'room') {
        console.log("🧑‍🤝‍🧑 roomId:", event.source.roomId);
      }
    } else {
      console.log("❌ 沒有來源資料");
    }

    if (event.type === 'message' && event.message && event.message.text) {
      console.log("💬 使用者傳來的訊息：", event.message.text);
    }
  });

  // LINE 需要你一定要回應 200 OK，不然會一直重送
  res.status(200).send('OK');
});

// 啟動伺服器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🌐 Server is running on port ${port}`);
});
