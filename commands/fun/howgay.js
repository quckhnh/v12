const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "howgay",
    description: "% gay của bạn",

    async run (bot, message, args) {
        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new MessageEmbed()
        .setTitle(`${member.username} is ` + rng + "% gay🌈")
        .setColor("GREEN")

        message.channel.send(howgayembed);
    }
}