import requests
import json
from admins import CS_toolkit
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ForceReply
from codeforces import Codeforces

bot = CS_toolkit("config.cfg")
codeforces = Codeforces()

class Register():
    def __init__(self):
        self.platforms = ["Codeforces", "Codechef"]

    def chosen_platform(self, chat_id, update_id):
        callback = bot.getUpdates(offset=update_id)
        callback = callback["result"][0]["callback_query"]["data"]
        if(callback == "cf"):
            codeforces.show_options(chat_id, update_id+1)

    def show_options(self, chat_id, update_id):
        keyBoard = { "inline_keyboard": [
                [
                    {"text": self.platforms[0], "callback_data": "cf"},
                    {"text": self.platforms[1], "callback_data": "chef"}
                ],
            ]
        }
        bot.sendMessage("Please select one of the following:", chat_id, reply_markup=json.dumps(keyBoard))
        self.chosen_platform(chat_id, update_id)
