import requests
import json
from admins import CS_toolkit
from ocr import OCR


bot = CS_toolkit("config.cfg")
ocr_ = OCR()

class Image():
    
    def take_image(self, sender, update_id):
        bot.sendMessage("Please send your image: ", sender, None)
        image = bot.getUpdates(offset=update_id)
        update_id += 1
        image_id = image["result"][0]["message"]["photo"][0]["file_id"]
        url = bot.base + "getFile?file_id={}".format(image_id)
        r = requests.get(url)
        content = json.loads(r.content)
        image_file_path = content["result"]["file_path"]
        url = "api.telegram.org/file/bot{}/{}".format(bot.token, image_file_path)
        # print(url)
        return bot.sendMessage(ocr_.ocr_space_url(url), sender, None)