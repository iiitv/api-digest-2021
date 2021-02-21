import requests
import json
from admins import CS_toolkit

bot = CS_toolkit("config.cfg")

class Image():
    
    def take_image(self, sender, update_id):
        bot.sendMessage("Please send your image: ", sender, None)
        image = bot.getUpdates(offset=update_id)
        update_id += 1
        image_id = image["result"][0]["message"]["photo"][0]["file_id"]
        url = bot.base + "getFile?file_id={}".format(image_id)
        r = requests.get(url)
        file_path = r["result"]["file_path"]
        print(file_path)
        url = "api.telegram.org/file/{}/{}".format(bot.token, file_path)
        bot.sendMessage(url, sender, None)