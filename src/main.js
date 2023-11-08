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
            const kwota = Math.round(Math.random() * 1000 + 100);
            m.reply(`Zarobiłeś ${kwota}`);
            money[m.author.id] += kwota;
            break;
        }
        case m.content.startsWith(prefix+"setmoney") ? m.content : "gowno":{
            const args = m.content.substring((prefix+"setmoney").length).split(" ");
            console.log(args);
            if(args.length != 3){
                m.reply(`poprawny format: ${prefix}setmoney <uzytkownik> <ilosc>`);
                break;
            }
            args[1] = args[1].substring(2, args[1].length-1);
            if(!(args[1] in money)) createMoney(args[1]);
            money[args[1]] = Number(args[2]);
            m.reply("dodano");
            break;
        }
        case prefix + "ranking":{
            let _temp = "--------\n";
            const moneyList = Object.entries(money).sort((x,y) => {return y[1] - x[1]});
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