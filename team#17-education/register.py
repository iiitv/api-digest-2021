import requests
import json
from admins import CS_toolkit
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ForceReply
import telegram

bot = CS_toolkit("config.cfg")

class Register():
    def __init__(self):
        self.platforms = ["Codeforces", "Codechef"]

    def show_options(self, chat_id):
        keyBoard = { "inline_keyboard": [
                [
                    {"text": "CodeForces", "url": "https://codeforces.com"},
                    {"text": "CodeChef", "url": "https://codechef.com"}
                ],
            ]
        }
        bot.sendMessage("Please select one of the following:", chat_id, reply_markup=json.dumps(keyBoard))
