import requests
import json
from admins import CS_toolkit
from stackoverflow import StackOverflow

bot = CS_toolkit("config.cfg")
stackoverflow_ = StackOverflow()

class OCR():
    def ocr_space_url(self, url, api_key="helloworld"):
        # print(str(url))
        r = requests.get("https://api.ocr.space/parse/imageurl?apikey=helloworld&url={}&filetype=jpg".format(str(url)))
        text = json.loads(r.content.decode())
        text = text["ParsedResults"][0]["ParsedText"]
        return stackoverflow_.get_question_by_tag(text)