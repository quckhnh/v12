const { checkSameRoom } = require('../../utils');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    description: 'Phát nhạc từ Youtube, Spotify và Sound Cloud',
    run: async (client, message, args) => {
        if (checkSameRoom(message)) return;
        await client.player.play(message,args.join(' '), true);
    }
}