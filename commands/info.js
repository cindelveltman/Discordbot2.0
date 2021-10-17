const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("Title")
    .setDescription("Note")
    .setColor("RED")
    .addField("Bot name", client.user.username)
    .addFields(
        {name: "Bot name", value: "note"}
        )
    .setThumbnail('')
    .setImage('')
    .setTimestamp()
    .setFooter("Footer text", '');

    return message.channel.send({ embeds: [botEmbed], files: [''] });


}

module.exports.help = {
    name: "info",
    category: "info",
    description: "Gives bot information."
}