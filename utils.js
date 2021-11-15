const checkSameRoom = (message) => {
    if (!message.member.voice) return message.reply('bạn chưua vào kênh thoại');
    if (!message.guild.me.voice.channelID || message.guild.me.voice.channelID == message.member.voice.channelID) return;
    return message.reply('bạn cần phải chung phòng với bot để sủ dụng lệnh này');
}

module.exports = {
    checkSameRoom,
}