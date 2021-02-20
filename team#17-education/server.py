from admins import CS_toolkit


bot = CS_toolkit("config.cfg")


def reply(msg):
	if msg == "/start":
		return "This is your one-stop bot for all CS related things.\nType /help to see all commands."
	if msg is None:
		return
	if msg is not None:
		return "Okay!"

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
		reply_msg = reply(msg)
		bot.sendMessage(reply_msg, sender)