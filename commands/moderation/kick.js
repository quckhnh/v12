const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "kick",
    description: "Đá người dùng khỏi server của bạn",

    async run (client, message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Bạn không thể sử dụng lệnh này!")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Không có lý do";

        const kickembed = new MessageEmbed()
        .setTitle(`Bạn đã bị kick khỏi **${message.guild.name}**`)
        .setDescription(`Lý do: ${reason}`)
        .setColor("#ffffff")
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())

        if (!args[0]) return message.channel.send("Hãy đề cập đến người muốn kick!");

        if(!mentionMember) return message.channel.send("Người dùng không có trong server!");

        if(!mentionMember.kickable) return message.channel.send("Tôi không thể kick người dùng này! Sorry...");

        await mentionMember.send(kickembed);

		const kick = new MessageEmbed()
			.setTitle(`Đã kick người dùng khỏi server`)
			.setFooter(message.author.username, message.author.displayAvatarURL())
			.setColor('#f2f2f2')
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        await mentionMember.kick({
			reason: reason
		}).then(() => message.channel.send(kick));
    }
}