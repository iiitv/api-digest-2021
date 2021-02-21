import requests
import json
from admins import CS_toolkit


bot = CS_toolkit("config.cfg")


class OCR():
    def ocr_space_url(self, url, api_key="helloworld"):
        # print(str(url))
        r = requests.get("https://api.ocr.space/parse/imageurl?apikey=helloworld&url={}".format(str(url)))
        return r.content.decode()