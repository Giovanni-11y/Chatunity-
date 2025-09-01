let cooldowns = {};

const rcanal = "default_value"; // Replace "default_value" with the appropriate value

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let points = 300;
    let waitTime = 5 * 1000;
    let user = global.db.data.users[m.sender];

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < waitTime) {
        let timeLeft = secondsToHMS(Math.ceil((cooldowns[m.sender] + waitTime - Date.now()) / 1000));
        return conn.reply(
            m.chat,
            `[ ✰ ] You already started a game recently, wait *⏱ ${timeLeft}* to play again.`,
            m,
            rcanal
        );
    }

    cooldowns[m.sender] = Date.now();

    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `[ ✰ ] Choose an option to start the game:`,
            buttons: [
                { buttonId: `${usedPrefix + command} rock`, buttonText: { displayText: "🪨 Rock" }, type: 1 },
                { buttonId: `${usedPrefix + command} paper`, buttonText: { displayText: "📄 Paper" }, type: 1 },
                { buttonId: `${usedPrefix + command} scissors`, buttonText: { displayText: "✂️ Scissors" }, type: 1 }
            ]
        }, { quoted: m });
    }

    let options = ['rock', 'paper', 'scissors'];
    let botChoice = options[Math.floor(Math.random() * options.length)];

    if (!options.includes(text)) {
        return conn.sendMessage(m.chat, {
            text: `[ ✰ ] Choose a valid option (rock/paper/scissors) to start the game:`,
            buttons: [
                { buttonId: `${usedPrefix + command} rock`, buttonText: { displayText: "🪨 Rock" }, type: 1 },
                { buttonId: `${usedPrefix + command} paper`, buttonText: { displayText: "📄 Paper" }, type: 1 },
                { buttonId: `${usedPrefix + command} scissors`, buttonText: { displayText: "✂️ Scissors" }, type: 1 }
            ]
        }, { quoted: m });
    }

    let result = '';
    let pointsEarned = 0;

    if (text === botChoice) {
        result = `[ ✿ ] It's a tie!! You receive *100 🪙 UnityCoins* as a reward.`;
        pointsEarned = 100;
    } else if (
        (text === 'rock' && botChoice === 'scissors') ||
        (text === 'scissors' && botChoice === 'paper') ||
        (text === 'paper' && botChoice === 'rock')
    ) {
        result = `[ ✰ ] YOU WON!! You just earned *300 🪙 UnityCoins*.`;
        pointsEarned = points;
    } else {
        result = `[ ✿ ] YOU LOST!! You just lost *300 🪙 UnityCoins*.`;
        pointsEarned = -points;
    }

    user.limit += pointsEarned;
    conn.sendMessage(m.chat, {
        text: result,
        buttons: [
            { buttonId: `${usedPrefix + command}`, buttonText: { displayText: "🔄 Try Again" }, type: 1 }
        ]
    }, { quoted: m });
};

handler.help = ['rps'];
handler.tags = ['game'];
handler.command = ['rps', 'rockpaperscissors'];
//handler.group = true
handler.register = true;

export default handler;

function secondsToHMS(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;
    return `${minutes}m ${secondsLeft}s`;
}
