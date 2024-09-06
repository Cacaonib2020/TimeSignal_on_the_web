const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // 使用するポート番号

// 静的ファイルを提供
app.use(express.static(path.join(__dirname)));

// サーバーの起動
app.listen(port, () => {
  console.log(`Web app running at http://localhost:${port}`);
});
