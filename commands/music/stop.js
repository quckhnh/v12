const { checkSameRoom } = require('../../utils');

module.exports = {
    name: 'stop',
    category: 'music',
    description: 'Dừng phát nhạc',
    run: async (client, message, args) => {
        if (!client.player.isPlaying(message)) return message.channel.send(noMusicEmbed());
        if (checkSameRoom(message)) return;
        await client.player.stop(message);
        await message.react('⛔')
    }
}