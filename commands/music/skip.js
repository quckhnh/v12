const { checkSameRoom } = require('../../utils');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['s'],
    category: 'music',
    description: 'Skip qua bài nhạc',
    run: async (client, message, args) => {
        if (checkSameRoom(message)) return;
        await client.player.skip(message);
        await message.react('⏭')
    }
}