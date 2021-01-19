const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const utf8 = require('utf8');
const stdin = process.stdin;

client.on('ready', () => {
console.log(`${client.user.tag} is ready!`);
});

client.login(auth.token);

// Willkommen nachricht wenn neue Mitglieder dazu kommen
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'willkommen');
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Willkommen in der Drachenhoehle, ${member}`);
});

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'byebye');
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Der Drache wurde entfernt aus der Hoehle, ${member}`);
});

client.on('message', msg => {
if (msg.content === '!intro') {
msg.reply('Hallo!');
}
});

client.on('message', message => {
    // If the message is "how to embed"
    if (message.content === 'how to embed') {
        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
        const embed = new MessageEmbed()
            // Set the title of the field
            .setTitle('A slick little embed')
            // Set the color of the embed
            .setColor(0xff0000)
            // Set the main content of the embed
            .setDescription('Hello, this is a slick embed!');
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
});

client.on('message', msg => {
  if (msg.content
  === '!Wie ist das wetter?')
  {
      msg.reply(utf8.encode('In der Drachenhöhle ist es schön!'));
  }
});

stdin.on('keypress', function (letter, key) {
  if (key
  && key.ctrl
  && key.name
  == 'c')
  {
    process.exit();
  }
});