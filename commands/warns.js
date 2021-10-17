const fs = require("fs");
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("You do not have to perms for this command");

    if(!args[0]) return message.reply("You need to mention a member.");

    if(!args[1]) return message.reply("You need to mention a reason.");

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id) || message.guild.members.get(args[0].id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Cannot find this member.");

    if (warnUser.permissions.has("MANAGE_MESSAGES")) return message.reply("You cannot give this person a warning.");

    const warns = JSON.parse(fs.readFileSync("./warnings.json","UTF8"));

    if(!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }

    warns[warnUser.id].warns++;

    var embed = new discord.MessageEmbed()
        .setColor("D5232F")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Warned:** ${warnUser.user.username} (${warnUser.id})
            **Warned by:** ${message.author}
            **Reason: ** ${reason}`)
        .addField("Number of warns", warns[warnUser.id].warns.toString());

        const channel = message.member.guild.channels.cache.get("899078237311864892");

        if(!channel) return;

        channel.send({ embeds: [embed] });

        if (warns[warnUser.id].warns == 3) {
 
            var mes = new discord.MessageEmbed()
                .setDescription("WARNING!" + warnUser.user.username)
                .setColor("D5232F")
                .addField("Message", "1 more strike and you are going to be __**banned**__!");
         
            message.channel.send({ embeds: [mes] });
         
        } else if (warns[warnUser.id].warns == 4) {
         
            message.guild.members.ban(warnUser, { reason: reason });
            message.channel.send(`${warnUser} is banned because of the 4 strike ban system.`);
         
        }

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if(err) console.log(err);
        })

}

module.exports.help = {
    name: "warn",
    catagory: "general",
    description: "Warns a person."
}