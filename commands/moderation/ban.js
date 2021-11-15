const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ban",
    description: "Cấm người dùng khỏi server của bạn",

    async run (client, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Bạn không thể sử dụng lệnh này!")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Không có lý do";

        const embed = new MessageEmbed()
        .setTitle(`Bạn đã bị cấm khỏi **${message.guild.name}**`)
        .setDescription(`Lý do: ${reason}`)
        .setColor("#ffffff")
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())

        if (!args[0]) return message.channel.send("Hãy đề cập đến người muốn ban!");

        if(!mentionMember) return message.channel.send("Người dùng không có trong server!");

        if(!mentionMember.bannable) return message.channel.send("Tôi không thể ban người dùng này! Sorry...");

        await mentionMember.send(embed);

        const ban = new MessageEmbed()
			.setTitle(`Đã ban người dùng khỏi server`)
			.setFooter(message.author.username, message.author.displayAvatarURL())
			.setColor('#f2f2f2')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        await mentionMember.ban({
            reason: reason
        }).then(() => message.channel.send(ban));
    }
}