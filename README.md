Show Me
===

**投個給我我看看** 讓用戶使用 line 發送訊息、圖片，會自動投放到大螢幕上以文字彈幕、圖片輪播的模式投放～～

## Getting Started
準備好 Line Bot，並將你的 bot service web hook 掛上去
```
python -m venv venv
source venv/bin/activate

# check that you already filled .env file
source .env
pip install -r requirements.txt
python main.py
```

準備好 Firebase Firestore 前後端的實時推播就靠它
```
npm install
yarn start
```

## 寫給自己看 TODO
### 前端仔
- 隨機文字顏色
- 彈幕樣式設計
- 彈幕數量以及顯示規則
- 收到圖片的情況還沒做，需要一個輪播排程設計 (照片播 3 遍)
- 進入房間後從 Header 中取得 line access key，這才能得到權限讀取聊天室訊息 (圖片)
- (Option) Line UI 選取 `我要留言`/`上傳圖片`，增加互動感不然我怕用戶不知道自己在幹嘛

### 後端仔
- 文字長度限制 (Maybe 25 個中文字)
- 我希望後端可以收 `/new` 來開新房間，bot 會回覆房間的網址給你
- 呈上，網址是由後端做 Redirect with Header: X-Line-Access-Key
