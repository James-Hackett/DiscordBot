const Command = require("../../base/Command.js"),
  Discord = require("discord.js"),
  fetch = require("node-fetch");

class Tweet extends Command {

  constructor(client) {
    super(client, {
      name: "tweet",
      description: "Generates a \"tweet\" image using Nekobot API",
      usage: "[@twitter_username] [content]",
      examples: ["{{p}}tweet @ElonMusk Hello"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["twitter"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 5000
    });
  }

  async run(message, args) {
    const user = args[0];
    const text = args.slice(1).join(" ");

    if (!user) {
      return message.error("Please include a twitter handle");
    }

    if (!text) {
      return message.error("EMPTY");
    }

    const m = await message.sendM("Please wait...", { prefixEmoji: "loading" });

    try {
      const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
      const json = await res.json();
      const attachment = new Discord.MessageAttachment(json.message, "tweet.png");
      m.delete();
      message.channel.send(attachment);
    } catch (e) {
      console.log(e);
      message.error(`Error occured: ${e}`);
    }
  }
}

module.exports = Tweet;