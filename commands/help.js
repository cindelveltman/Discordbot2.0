const botConfig = require("../botConfig.json");

module.exports.run = async (client, message, args) => {

try{

    var prefix = botConfig.prefix;

    var response = "**Bod commands**\r\n\n";
    var general = "**__General__**\n";
    var info = "\n**__Information__**\n";

    client.commands.forEach(command => {

        switch(command.help.category) {

            case "general":
                general += `${prefix}${command.help.name} - ${command.help.description}\r\n` ;
            break;
        case "info":
            general += `${prefix}${command.help.name} - ${command.help.description}\r\n` ;

        break;
        }

    });

    response += general + info;

    message.author.send(response).then(() => {
        return message.reply("You can find all the commands in your dms.");
    }).catch(() => {
        return message.reply("Your dms are turned off, so you cannot get a message.")
    })

} catch (error) {
    message.reply("Something went wrong");
}

}

module.exports.help = {
    name: "help",
    catagory: "info",
    description: "Gives a menu"
}