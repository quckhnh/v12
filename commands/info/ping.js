const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    description: "Độ trễ của bot",

    async run (client, message, args) {

        const ping = new MessageEmbed()
        .setDescription(`🏓\`${client.ws.ping} ms\``);

        message.channel.send(ping)
    }
}