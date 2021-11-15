const { Client, Collection, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const client = new Client();
const { readdirSync } = require('fs');
const { Player } = require('discord-player');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://quockhanh:quckhnh05@cluster0.2v8gp.mongodb.net/test', {

}).then(console.log('connected to mongo!'))

const Levels = require('discord-xp');
Levels.setURL("mongodb+srv://quockhanh:quckhnh05@cluster0.2v8gp.mongodb.net/test")

const player = new Player(client, {
    ytdlDownloadOptions: { filter: "audioonly" },
});

client.player = player;
client.on('ready', () => {
    console.log(`${client.user.username} online`);

    client.user.setPresence({
        activity: {
            name: 'bủ bủ lmao',
            type: 'LISTENING'
        },
        status: 'online'
    })
})

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
    if (message.author.bot) return;

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Chúc mừng ${message.author} đã lên level **${user.level}**!`);
    }
    if (!message.guild) return;
    const prefix = 'bua'
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.category === 'music' && !message.member.voice.channel) return message.channel.send('bạn chưa vào kênh thoại');
        command.run(client, message, args);
    }
})

client.player.on('trackStart', (message, track) => {
    const playEmbed = new MessageEmbed()
    .setTitle('Đang phát bài:')
    .setDescription(`\`${track.title}\``)
    .setColor('#D899F1')
    .setFooter(message.author.username, message.author.displayAvatarURL())
    message.channel.send(playEmbed);
});
client.player.on('trackAdd', (message, queue, track) => {
    const trackEmbed = new MessageEmbed()
    .setTitle('Đã thêm:')
    .setDescription(`\`${track.title}\``)
    .setColor('#D899F1')
    .setFooter(message.author.username, message.author.displayAvatarURL())
    message.channel.send(trackEmbed);
});

client.player.on('playlistAdd', (message, queue, playlist) => {
    const playlistEmbed = new MessageEmbed()
    .setTitle('Đã thêm:')
    .setDescription(`\`${playlist.tracks.length}\`bài hát`)
    .setColor('#D899F1')
    .setFooter(message.author.username, message.author.displayAvatarURL())
    message.channel.send(playlistEmbed);
});

client.login(token)