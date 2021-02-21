import requests
import json
from admins import CS_toolkit
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ForceReply
import telegram

bot = CS_toolkit("config.cfg")

class GFG():
    def __init__(self):
        self.platforms = ["GeeksforGeeks"]
    def options(self, chat_id):
        keyBoard = { "inline_keyboard": [
                [
                    {"text": "Algorithms", "url": "https://www.geeksforgeeks.org/fundamentals-of-algorithms/"},
                    {"text": "Data Structures", "url": "https://www.geeksforgeeks.org/data-structures/"},
                ],
                [
                    {"text": "Interview Prep", "url": "https://www.geeksforgeeks.org/company-interview-corner/"},
                    {"text": "GATE Prep", "url": "https://www.geeksforgeeks.org/gate-cs-notes-gq/"}
                ]
            ]
        }
        bot.sendMessage("Please select one of the following:", chat_id, reply_markup=json.dumps(keyBoard))
