const { Client, Intents, Collection } = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] 
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(filer => filer.endsWith(".js"));

for(const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`De file ${command.help.name}.js is geladen`);

}


client.once("ready", () => {
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("Testing", {type: "PLAYING" });

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get("898609240661446726")

    if(!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get("898611231089385512");

    if(!channel) return;

    channel.send(`
    Welcome to the server ${member}. 
Make sure to check out the rules in the laws channel! 
    
To be whitelisted go to the 「✅」whitelisting channel and answer the questions in the ticket.`);
});


client.on("messageCreate", async message => {

        if (message.author.bot) return;

        var prefix = botConfig.prefix;

        var messageArray = message.content.split(" ");

        var command = messageArray[0];

        if (!message.content.startsWith(prefix)) return;

        const commandData = client.commands.get(command.slice(prefix.length));

        if (!commandData) return;

        var arguments = messageArray.slice(1);

        try {

            await commandData.run(client, message, arguments);

        } catch (error) {
            console.log(error);
            await message.reply("There is a problem with this command.")
        }

});



client.login(process.env.token);