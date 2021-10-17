const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

// !review aantal reden

const amountStars = args [0];

if(!amountStars || amountStars < 1 || amountStars > 5) return message.reply("Give a star between 1 and 5.");

    const messageReview = args.splice(1,args.length).join(" ") || '**No message provided**';

    const reviewChannel = message.member.guild.channels.cache.get("899090060039827528");

    if(!reviewChannel) return message.reply("Could not find the channel.");

    var stars = "";

    for(var i = 0; i < amountStars; i++) {

        stars += ":star: ";
    }

    message.delete();

    const review = new discord.MessageEmbed()
        .setTitle(`${message.author.username} wrote a review! 🎉`)
        .setColor("#D5232F")
        .setThumbnail("https://pbs.twimg.com/media/EImXs7XXYAE9f6P?format=jpg&name=large")
        .addField("Stars:", `${stars}`)
        .addField("Review:", `${messageReview}`);

    message.channel.send("✅ Succesfully placed your review!");

    return reviewChannel.send({ embeds: [review] });

}

module.exports.help = {
    name: "review",
    catagory: "general",
    description: "Gives a server review."
}