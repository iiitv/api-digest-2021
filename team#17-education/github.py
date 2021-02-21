import requests
import json
from admins import CS_toolkit
from telegram import ForceReply
import random


bot = CS_toolkit("config.cfg")

class Github():
    def __init__(self):
        self.base = "https://api.github.com/"

    def show_options(self, chat_id, update_id):
        keyBoard = { "inline_keyboard": [
                [
                    {"text": "Profile", "callback_data": "users"},
                    {"text": "Search by Username", "callback_data": "search"}
                ],
            ]
        }
        bot.sendMessage("Please select one of the following:", chat_id, reply_markup=json.dumps(keyBoard))
        self.chosen_option(chat_id, update_id)

    def get_user_info(self, username):
        url = self.base + "users/{}".format(username)
        r = requests.get(url)
        return json.loads(r.content)

    def search_users(self, username):
        url = self.base + "search/users/{}".format(username)
        r = requests.get(url)
        return json.loads(r.content)

    def chosen_option(self, chat_id, update_id):
        callback = bot.getUpdates(offset=update_id)
        update_id += 1
        callback = callback["result"][0]["callback_query"]["data"]
        if(callback == "users"):
            bot.sendMessage("Enter your username: ", chat_id, None)
            reply = bot.getUpdates(offset = update_id)
            update_id += 1
            reply = reply["result"][0]["message"]["text"]
            profile = self.get_user_info(reply)
            profile_str = "Profile Name: {}\nCompany: {}\nFollowers: {}\nFollowing: {}\nRepos URL: {}".format(profile["name"], profile["company"], profile["followers"], profile["following"], profile["repos_url"])
            bot.sendMessage(profile_str, chat_id, None)
        if(callback == "search"):
            bot.sendMessage("Enter username: ", chat_id, None)
            reply = bot.getUpdates(offset = update_id)
            update_id += 1
            reply = reply["result"][0]["message"]["text"]
            profile = self.get_user_info(reply)
            profile_str = "Profile URL: {}\nRepos URL: {}".format(profile["html_url"], profile["repos_url"])
            bot.sendMessage(profile_str, chat_id, None)