const { MessageEmbed } = require('discord.js');

module.exports = async (bot, message) => {
  let logs = await message.guild.fetchAuditLogs({type: 72});
  let entry = await logs.entries.first();

  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author.username
  }

  let embed = new MessageEmbed()
    .setTitle("**DELETED MESSAGE**")
    .setColor("#fc3c3c")
    .addField("Author", message.author.tag, true)
    .addField("Channel", message.channel, true)
    .addField("Message", message.content)
    .addField("Deleted by", user)
    .setFooter(`Message ID: ${message.id} | Author ID: ${message.author.id}`);

  let logsChannel = message.guild.channels.cache.find(x => x.name === 'logs');
  logsChannel.send({embed});
}