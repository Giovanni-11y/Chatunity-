let handler = async (m, { conn, command, text }) => {
    let botName = global.db.data.botname || `ChatUnity`
  
    let hate = `──────────────\nHATE CALCULATOR 😡
  The hate between ${text} and you: ${Math.floor(Math.random() * 100)}%\n──────────────`.trim()
  
    await conn.sendMessage(m.chat, {
      text: hate,
      contextInfo: {
        mentionedJid: conn.parseMention(hate),
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: `${botName}`
        }
      }
    })
  }
  
  handler.command = /^(hate)$/i
  handler.tags = ['fun']
  handler.help = ['hate @tag']
  
  export default handler
