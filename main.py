import os
import json
import time
from firebase import Firebase
from flask import Flask, request, abort

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)

app = Flask(__name__)
firebase = Firebase()

CHANNEL_ACCESS_TOKEN =  os.environ['CHANNEL_ACCESS_TOKEN']
CHANNEL_SECRET = os.environ['CHANNEL_SECRET']

line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(CHANNEL_SECRET)

@app.route("/", methods=['GET'])
def heath():
    return "I'm fine thank you, and you?"

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)

    # saving each messages to firebase
    body = json.loads(body)
    if 'events' not in body:
        return '', 400

    for e in body['events']:
        try:
            msgType = e['message']['type']
            msgID = e['message']['id']
        except:
            pass

        if msgType == 'text':
            firebase.save({
                'type': msgType,
                'content': e['message']['text'],
                'timestamp': time.time(),
            })
        elif msgType == 'image':
            image_url = f'https://api-data.line.me/v2/bot/message/{msgID}/content'
            firebase.save({
                'type': msgType,
                'content': image_url,
                'timestamp': time.time(),
            })

    return 'OK'

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=event.message.text))


if __name__ == "__main__":
    app.run()


'''
webhook example:
    純文字 => {
        "events": [
            {
                "type": "message",
                "replyToken": "11d94dc6da0547eaba7f1f8fef8ed176",
                "source": {
                    "userId": "U8cff07d183c7a9ebf3d96b1bd4f005cc",
                    "type": "user"
                },
                "timestamp": 1618912749248,
                "mode": "active",
                "message": {
                    "type": "text",
                    "id": "13918940547944",
                    "text": "欸"
                }
            }
        ],
        "destination": "U5220eac23dd0092d9d3831896aeabc86"
    }
    圖片檔 => {
        "events": [
            {
                "type": "message",
                "replyToken": "1f82c53580414382b6b2d5a1e2896fdc",
                "source": {
                    "userId": "U8cff07d183c7a9ebf3d96b1bd4f005cc",
                    "type": "user"
                },
                "timestamp": 1618912745752,
                "mode": "active",
                "message": {
                    "type": "image",
                    "id": "13918940231982",
                    "contentProvider": {
                        "type": "line"
                    }
                }
            }
        ],
        "destination": "U5220eac23dd0092d9d3831896aeabc86"
    }
'''