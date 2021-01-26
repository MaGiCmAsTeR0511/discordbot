const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const utf8 = require('utf8');
const stdin = process.stdin;
const cf = require('./config.json');
const prefix = cf.prefix;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

client.on('ready', () => {
console.log(`${client.user.tag} is ready!`);
});

client.login(auth.token);


client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
    else if (command === "intro") {
        message.reply('Hello');
    }
    else if (command === "codcw") {
        message.reply('Hier ist mein battleTag für COD-COLDWAR:');
    }
    else if (command === "anmeldung") {
        if (args !== '') {
            var user = message.member;
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("discord");
                var myobj = { _user:user.toString() , datum: args[0]};
                dbo.collection("discord").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                });
            });
            message.reply(`Deine Anmeldung wurde bestätigt 🤩`);
        } else {
            message.reply('Du hast kein Datum für die ANmeldung eingegeben');
        }
    }
});

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

stdin.on('keypress', function (letter, key) {
  if (key
  && key.ctrl
  && key.name
  === 'c')
  {
    process.exit();
  }
});