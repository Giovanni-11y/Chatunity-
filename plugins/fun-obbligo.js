let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { 
        text: `*┌────「 ‼TRUTH OR DARE‼ 」─*\n*"${pickRandom(global.dare)}"*\n*└────「 © ChatUnity 」─*`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
};

handler.help = ['dare'];
handler.tags = ['fun'];
handler.command = /^dare/i;
export default handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

global.dare = [
    "Create a fake OnlyFans account with your cousin's photos and share the link in class/work group",
    "Text a random contact 'Sorry about last night, hope you didn't catch anything' and block them immediately",
    "Send a voice message to a friend faking epic orgasms (like 'OH FUCK YES, RICE YES!') and say 'sorry, pocket dial'",
    "Post an Instagram story saying 'Looking for sugar daddy/mommy, crypto accepted' and tag a relative",
    "Go to a store and ask seriously: 'Do you have Nutella-flavored condoms? For a friend.'",
    "Pretend to be a ghost and send whispered audio messages to your ex with phrases like 'WHY DID YOU ABANDON ME...'",
    "Write in the family group 'Guys, I booked a butt tattoo, need a witness'",
    "Order a pizza with 'HELP I'M BEING HELD HOSTAGE BY DOMINOS' written on it and film the delivery",
    "Make a TikTok video dancing in underwear with grandpa white socks and hashtag #SexyGrandpa",
    "Send to all your contacts 'I came in your sandwich. Sorry. Won't do it again.' then 'Test message, ignore'",
    "Go to a pharmacy and ask 'Do you have anything for dick addiction syndrome?'",
    "Change your home WiFi name to 'FBI Surveillance Van #4587' and wait for neighbors' reactions",
    "Pretend to be a hacker and text a friend 'I HAVE ACCESS TO YOUR PC. PAY ME $10 IN AMAZON OR I LEAK YOUR BAD MEMES'",
    "Post on Facebook: 'Selling blessed water from OnlyFans, 100% holy guaranteed'",
    "Set WhatsApp status: 'Single. Close relatives also accepted. #NoJudgement'",
    "Take a selfie with your face in the toilet (clean, I hope) and send it to a friend with 'NEW BOYFRIEND/GIRLFRIEND'",
    "Text your boss 'Not coming tomorrow, need to take my grandma to a rave'",
    "Walk into McDonald's and yell 'WHO WANTS TO BE MY SUGAR BABY? I'LL BUY MCNUGGETS'",
    "Send an audio to a random number saying 'HELLO? YES, I FINISHED DIGGING THE GRAVE. WHERE DO I PUT THE BODY?'",
    "Make a Tinder profile with Silvio Berlusconi photos and bio: 'Looking for âme sœur for bunga bunga'",
    "Go to a pet store and ask if they have pythons trained for 'other things besides hunting'",
    "Fake a demonic possession at the emergency room, screaming 'MARGHERITA PIZZA HAS TOO MUCH PINEAPPLE'",
    "Text your mom 'Mom, I decided: I'm becoming an escort for retirees. Do you support my career?'",
    "Like all 2012 posts of a random person and comment 'RIP, you're always in our hearts'",
    "Do a Twitch live stream where you 'read' the Bible, but every 2 minutes whisper '...anyway your mom is a hoe'"
];

global.trollChallenge = [
    "Create a fake OnlyFans account with your cousin's photos and share the link in class/work group",
    "Text a random contact 'Sorry about last night, hope you didn't catch anything' and block them immediately",
    "Send a voice message to a friend faking epic orgasms (like 'OH FUCK YES, RICE YES!') and say 'sorry, pocket dial'",
    "Post an Instagram story saying 'Looking for sugar daddy/mommy, crypto accepted' and tag a relative",
    "Go to a store and ask seriously: 'Do you have Nutella-flavored condoms? For a friend.'",
    "Pretend to be a ghost and send whispered audio messages to your ex with phrases like 'WHY DID YOU ABANDON ME...'",
    "Write in the family group 'Guys, I booked a butt tattoo, need a witness'",
    "Order a pizza with 'HELP I'M BEING HELD HOSTAGE BY DOMINOS' written on it and film the delivery",
    "Make a TikTok video dancing in underwear with grandpa white socks and hashtag #SexyGrandpa",
    "Send to all your contacts 'I came in your sandwich. Sorry. Won't do it again.' then 'Test message, ignore'",
    "Go to a pharmacy and ask 'Do you have anything for dick addiction syndrome?'",
    "Change your home WiFi name to 'FBI Surveillance Van #4587' and wait for neighbors' reactions",
    "Pretend to be a hacker and text a friend 'I HAVE ACCESS TO YOUR PC. PAY ME $10 IN AMAZON OR I LEAK YOUR BAD MEMES'",
    "Post on Facebook: 'Selling blessed water from OnlyFans, 100% holy guaranteed'",
    "Set WhatsApp status: 'Single. Close relatives also accepted. #NoJudgement'",
    "Take a selfie with your face in the toilet (clean, I hope) and send it to a friend with 'NEW BOYFRIEND/GIRLFRIEND'",
    "Text your boss 'Not coming tomorrow, need to take my grandma to a rave'",
    "Walk into McDonald's and yell 'WHO WANTS TO BE MY SUGAR BABY? I'LL BUY MCNUGGETS'",
    "Send an audio to a random number saying 'HELLO? YES, I FINISHED DIGGING THE GRAVE. WHERE DO I PUT THE BODY?'",
    "Make a Tinder profile with Silvio Berlusconi photos and bio: 'Looking for âme sœur for bunga bunga'",
    "Go to a pet store and ask if they have pythons trained for 'other things besides hunting'",
    "Fake a demonic possession at the emergency room, screaming 'MARGHERITA PIZZA HAS TOO MUCH PINEAPPLE'",
    "Text your mom 'Mom, I decided: I'm becoming an escort for retirees. Do you support my career?'",
    "Like all 2012 posts of a random person and comment 'RIP, you're always in our hearts'",
    "Do a Twitch live stream where you 'read' the Bible, but every 2 minutes whisper '...anyway your mom is a hoe'"
];
