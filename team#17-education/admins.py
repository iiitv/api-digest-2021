import requests
import json
import configparser as cfg

class CS_toolkit():

    def __init__(self, config):
        self.token = self.read_token_from_config_file(config)
        self.base = "https://api.telegram.org/bot{}/".format(self.token)

    def getUpdates(self, offset=None):
        url = self.base + "getUpdates?timeout=100" #Timeout = 100 to avoid requesting endpoint again and again
        if offset:
            url += "&offset={}".format(offset + 1)

        r = requests.get(url)
        return json.loads(r.content)

    def sendMessage(self, msg, chat_id):
        url = self.base + "sendMessage?chat_id={}&text={}".format(chat_id, msg)
        if msg is not None:
            requests.get(url)

    def read_token_from_config_file(self, config):
        parser = cfg.ConfigParser()
        parser.read(config)
        return parser.get('creds', 'token')