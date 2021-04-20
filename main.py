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


CHANNEL_ACCESS_TOKEN = '6ZMTfHC3qnr+VPbuosgAoN2yPS1Q5bcX7AaVT7Jc1nmVzhdsQ7ezNyLMttvBaWxEgH6FBmrq2GBO+IjjbITCSLwooLkfnWKVZwfKj87d1WVAfjq/eoVkL+mpoiWd/XwgxiS0wG0J4Aln36lnAv4ylwdB04t89/1O/w1cDnyilFU='
CHANNEL_SECRET = 'bc285cd1a9bb77ae5c3b9a7fdadfb4bc'

line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(CHANNEL_SECRET)

@app.route("/", methods=['GET'])
def hello():
    return 'OK'

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)
    # print("Request body: " + body)

    # message_content = line_bot_api.get_message_content(body.events[0].message.id)
    # with open(file_path, 'wb') as fd:
    #     for chunk in message_content.iter_content():
    #         fd.write(chunk)

    image_url = f'https://api-data.line.me/v2/bot/message/{body.events[0].message.id}/content'
    
    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)

    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=event.message.text))

if __name__ == "__main__":
    app.run()

