const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "weather",
    description: "xem thời tiết",

    async run (client, message, args) {
        weather.find({search: args.join(" "), degreeType: `C`}, function (error, result) {
            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Vui lòng nhập vị trí của bạn!')

            if(result === undefined || result.length === 0) return message.channel.send('Vị trí không hợp lệ!!')

            var current = result[0].current;
            var location = result[0].location;

            const weatherEmbed = new MessageEmbed()
            .setColor(0x111111)
            .setAuthor(`Thời tiết ${current.observationpoint} hôm nay`)
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addField('Nhiệt độ:', `${current.temperature}°`, true) 
            .addField('Độ ẩm:', `${current.humidity}%`, true)
            .addField('Feels Like:', `${current.feelslike}°`, true)
            .addField('Gió:', `${current.winddisplay}`, true)

            message.channel.send(weatherEmbed)
        })
    }
}