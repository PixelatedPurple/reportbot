const Discord = require('discord.js');
const config = require("./config");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
require('dotenv').config();

client.once('ready', () => {
	console.log('ready!');
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.emoji.id === config.emojiID) {
		reaction.remove();
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.message.content.length > 0) {
			var message = reaction.message.content
		} else {
			var message = 'Embedded Content'
		}
		const reportEmbed = new Discord.MessageEmbed()
		.setColor(config.embedColor)
		.setTitle('User Report :triangular_flag_on_post:')
		.addFields(
			{name: 'Message', value: message},
			{name: 'Author', value: reaction.message.author.tag, inline: true},
			{name: 'Channel', value: `#${reaction.message.channel.name}`, inline: true},
			{name: 'Reported By', value: user.tag, inline: true},
			{name: 'Link', value: `[Go to Message](https://discordapp.com/channels/${config.guildID}/${reaction.message.channel.id}/${reaction.message.id}) :arrow_right:`},
			)
		.setTimestamp()
		.setFooter('React with 👍 to acknowledge')
		client.channels.cache.get(config.channelID).send(reportEmbed);
		user.send(config.message);
		return;
	}
});

client.login(process.env.TOKEN);
