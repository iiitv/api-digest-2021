import requests
import json
from admins import CS_toolkit
from telegram import ForceReply

bot = CS_toolkit("config.cfg")

class Codeforces():
    def __init__(self):
        self.base = "https://codeforces.com/api/"

    def get_user_info(self, handle):
        url = self.base + "user.info?handles={}".format(handle)
        r = requests.get(url)
        return json.loads(r.content)
    
    def problem_by_tag(self, tag):
        url = self.base + "problemset.problems?tags={}".format(tag)
        r = requests.get(url)
        return json.loads(r.content)

    def chosen_option(self, chat_id, update_id):
        callback = bot.getUpdates(offset=update_id)
        update_id+=1
        callback = callback["result"][0]["callback_query"]["data"]
        if(callback == "profile"):
            bot.sendMessage("Enter your handle: ", chat_id, None)
            reply = bot.getUpdates(offset=update_id)
            update_id+=1
            reply = reply["result"][0]["message"]["text"]
            profile = self.get_user_info(reply)
            profile_str = "Profile Name: {}\nRating: {}\nRank: {}\nMax Rating: {}\nMax Rank: {}".format(profile["result"][0]["handle"], profile["result"][0]["rating"], profile["result"][0]["rank"], profile["result"][0]["maxRating"], profile["result"][0]["maxRank"])
            bot.sendMessage(profile_str, chat_id, None)


    def show_options(self, chat_id, update_id):
        keyBoard = { "inline_keyboard": [
                [
                    {"text": "Profile", "callback_data": "profile"},
                    {"text": "Problem", "callback_data": "problem"}
                ],
            ]
        }
        bot.sendMessage("Please select one of the following:", chat_id, reply_markup=json.dumps(keyBoard))
        self.chosen_option(chat_id, update_id)