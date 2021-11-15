const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'unban',
    description:'Bỏ cấm người dùng khỏi server của bạn',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Bạn không đủ quyền dùng lệnh này').then((m) => m.delete({ timeout: 5000 }));

		if (!args[0]) return message.channel.send('Nhập id người dùng cần bỏ cấm').then((m) => m.delete({ timeout: 5000 }));

		let member;

		try {
			member = await client.users.fetch(args[0]);
		} catch (e) {
			console.log(e);
			return message.channel.send('người dùng không hợp lệ').then((m) => m.delete({ timeout: 5000 }));
		}

		const reason = args[1] ? args.slice(1).join(' ') : 'Không có lý do';

		const embed = new MessageEmbed()
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

		return message.guild.fetchBans().then((bans) => {
			const user = bans.find((ban) => ban.user.id === member.id);

			if (user) {
				embed.setTitle(`Đã bỏ cấm ${user.user.tag}`)
					.setColor('#ffffff')
				message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed));
			} else {
				embed.setTitle(`${member.tag} không bị cấm`)
					.setColor('#ffffff');
				message.channel.send(embed);
			}
		}).catch((e) => {
			console.log(e);
			message.channel.send('Đã xảy ra lỗi');
		});
	},
};