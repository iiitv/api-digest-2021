import requests
import json
from admins import CS_toolkit


bot = CS_toolkit("config.cfg")

class StackOverflow():

    def __init__(self):
        self.base = "https://api.stackexchange.com/2.2/"

    def get_question_by_tag(self, tag):
        url = self.base + "questions?site=stackoverflow&tagged={}&sort=votes&order=desc".format(tag)
        r = requests.get(url)
        content = json.loads(r.content)
        content = content["items"][0]["link"]
        return content
