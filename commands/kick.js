const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    //kick name reason

    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("You do not have the perms to kick someone.");

    if(!message.guild.me.permissions.has("KICK_MEMBER")) return message.reply("No perms");

    if(!args[0]) return message.reply("You need to mention a member");

    if(!args[1]) return message.reply("You need to give a reason.");

    var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if(!kickUser) return message.reply("Sorry, could not find the member.");

    if(kickUser.permissions.has("MANAGE_MESSAGES")) return message.reply('Sorry, could not kick this person.');

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle ("Respond within 30 seconds.")
    .setDescription(`Do you want to kick ${kickUser}?`);

    var embed = new discord.MessageEmbed()
    .setColor("#D5232F")
    .setDescription(`**Kicked:** ${kickUser} (${kickUser.id})
    **Kicked by:** ${message.author}
    **Reason:** ${reason}`)
    .setFooter(message.member.displayName)
    .setTimestamp();


    message.channel.send({ embeds: [embedPrompt] }).then(async msg => {
 
        let authorID = message.author.id;
        let time = 30;
        let reactions = ["✅", "❌"];
     
        // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
        time *= 1000;
     
        // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
        for (const reaction of reactions) {
            await msg.react(reaction);
        }
     
        // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
        // dan kunnen we een bericht terug sturen.
        const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === authorID;
        };
     
        // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
        // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
        msg.awaitReactions({ filter, max: 1, time: time }).then(collected => {
            var emojiDetails = collected.first();
     
            if(emojiDetails.emoji.name === "✅") {

                msg.delete();

                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send(`Something went wrong.`);

                });

                message.channel.send({ embeds: [embed] });

            } else if (emojiDetails.emoji.name === "❌") {

                msg.delete();

                message.channel.send("Kick is cancelled.").then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000);

                });

            }
            
        });
    });

}

module.exports.help = {
    name: "kick",
    catagory: "general",
    description: "Kicks a member from the discord server."
}