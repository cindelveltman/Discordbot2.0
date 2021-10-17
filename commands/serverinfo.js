const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("Title")
    .setDescription("Note")
    .setColor("RED")
    .addFields(
        {name: "Bot name", value:client.user.username},
        {name: "You joined the server on", value: message.member.joinedAt.toString()},
        {name: "Total members", value: message.guild.memberCount.toString() }
        );
    

    return message.channel.send({ embeds: [botEmbed]});


}

module.exports.help = {
    name: "serverinfo",
    category: "info",
    description: "Gives server information."
}