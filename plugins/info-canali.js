const handler = async (m, { conn }) => {
  const text = `
╭━〔 *🌐 OFFICIAL CHANNELS* 〕━┈⊷
┃─────────────·๏
┃✨ *ChatUnity* 
┃🔗 https://whatsapp.com/channel/0029VaZVlJZHwXb8naJBQN0J
┃
┃🤖 *ChatUnity-Bot*
┃🔗 https://whatsapp.com/channel/0029Vb32UwhA89MZtd6WRS3G
┃
┃🌍 *ChatUnity Server*
┃🔗 https://whatsapp.com/channel/0029VbA4h0pKmCPS5ozJsm3j
┃╰─────────────·๏
╰━━━━━━━━━━━━━━━━━━━⊷

*Join our channels to stay updated, receive support and discover all the news!*

💎 _Powered by ChatUnity_
`.trim();

  await conn.sendMessage(m.chat, {
    text,
    footer: 'Scegli un canale e unisciti!'
  }, { quoted: m });
};

handler.help = ['canali'];
handler.tags = ['info'];
handler.command = /^canali$/i;

export default handler;
