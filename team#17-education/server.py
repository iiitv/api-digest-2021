from admins import CS_toolkit
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from register import Register


bot = CS_toolkit("config.cfg")
register_ = Register()


def reply(msg, sender, update_id):
	if msg is None:
		return
	elif msg == "/start":
		return bot.sendMessage("This is your one-stop bot for all CS related things.\nType /help to see all commands.", sender, None)
	elif msg == "/help":
		return bot.sendMessage("""You can use the following commands:
		/start : to start the bot.
		/help : to get a list of commands.
		/register : to register with your username on a given Competitive programming platform.
		""",
		sender, None)
	elif msg == "/register":
		return register_.show_options(sender, update_id)
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