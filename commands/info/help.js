const { MessageEmbed } = require('discord.js');
const { stripIndent } =require('common-tags');

module.exports = {
    name: 'help',
    category: 'info',
    description: 'Các lệnh của bot!',
    usage: ',help [tên lệnh]',
    run: async (client, message, args) => {
        if (!args[0]) return getAll(client,message);
    },
};

function getAll(client, message) {
    const helpEmbed = new MessageEmbed()
        .setColor('#ffffff')
    
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(',')
    }

    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(helpEmbed.setDescription(info));
}