from admins import CS_toolkit
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from register import Register
import json
from gfg import GFG
from image import Image


gfg_links = """{
	"Search": "https://www.geeksforgeeks.org/searching-algorithms/",
	"Sort": "https://www.geeksforgeeks.org/sorting-algorithms/",
	"DP": "https://www.geeksforgeeks.org/dynamic-programming/",
	"DnC": "https://www.geeksforgeeks.org/divide-and-conquer/"
	}"""
bot = CS_toolkit("config.cfg")
register_ = Register()
gfg_ = GFG()
image_ = Image()

def displayLink(key):
	links = json.loads(gfg_links)
	if key in links:
		return bot.sendMessage(links[key], sender, None)
	else:
		return bot.sendMessage("Ehh.. maybe a wrong spelling or command, check again.", sender, None)

def reply(msg, sender, update_id):
	if msg is None:
		return
	elif msg == "/start":
		return bot.sendMessage("Hey There!\nThis is your one-stop bot for all CS related things.\nType /help to see all commands.", sender, None)
	elif msg == "/help":
		return bot.sendMessage("""You can use the following commands:
		/start : to start the bot.
		/help : to get a list of commands.
		/gfg : to fetch categories of articles from GeeksforGeeks.
		/search_algos : to fetch the link to learn about searching algorithms.
		/sort_algos : to fetch the link to learn about sorting algorithms.
		/dp : to fetch the link to learn about dynamic programming.
		/dnc : to fetch the link to learn about divide and conquer.
		/platform : to access different online platforms through this bot.
		/error : to take an image of your error and search it on stackoverflow.
		""",
		sender, None)
	elif msg == "/gfg":
		return gfg_.options(sender)
	elif msg == "/search_algos":
		key = "Search"
		return displayLink(key)
	elif msg == "/sort_algos":
		key = "Sort"
		return displayLink(key)
	elif msg == "/dp":
		key = "DP"
		return displayLink(key)
	elif msg == "/dnc":
		key = "DnC"
		return displayLink(key)
	elif msg == "/platform":
		return register_.show_options(sender, update_id)
	elif msg == "/error":
		return image_.take_image(sender, update_id)
	elif msg is not None:
		return bot.sendMessage("Okay!", sender, None)

update_id = None
while True:
	updates = bot.getUpdates(offset=update_id)
	updates = updates["result"]
	if updates:
		for item in updates:
			update_id = item["update_id"]
			try:
				msg = item["message"]["text"]
				sender = item["message"]["from"]["id"]
			except:
				msg = None
				sender = None
		reply(msg, sender, update_id)