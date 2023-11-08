const {Client, IntentsBitField} = require("discord.js");
const TokenFile = require("../token.json");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const prefix = "$";

let money = {};

client.on('ready', (c) => {
    console.log("test");
});

function createMoney(author){
    money[author] = 0;
    console.log(money);
}

client.on("messageCreate", (m) => {
    switch(m.content){
        case prefix + "money":{
            if(!(m.author.id in money)) createMoney(m.author.id);
            m.reply("Twój balans to: "+money[m.author.id]);
            break;
        }
        case prefix + "work":{
            if(!(m.author.id in money)) createMoney(m.author.id);
            m.reply("dodano 200");
            money[m.author.id] += 200;
            break;
        }
        case prefix + "ranking":{
            let _temp = "--------\n";
            const moneyList = Object.entries(money).sort((x,y) => {x[1] > y[1]});
            let it = 1;
            for([author, moneyo] of moneyList){
                _temp += `${it}. <@${author}> -> ${moneyo} \n`;
                it += 1;
            }
            _temp += "--------\n";
            m.reply(_temp);
            break;
        }
        default:{
            if(!(m.content.startsWith(prefix))) return;
            m.reply("brak takiej komendy")
            break;
        }

    }

});

client.login(
    TokenFile.token
);