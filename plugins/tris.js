import TicTacToe from '../lib/tictactoe.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  conn.game = conn.game ? conn.game : {};

  // Check if the user is already playing
  if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
    throw '*[❗] _YOU ARE ALREADY PLAYING WITH SOMEONE_*';
  }

  // Ensure the user provides a room name
  if (!text) {
    throw `*[❗] _YOU NEED TO PROVIDE A ROOM NAME_*\n\n*—◉ _EXAMPLE_*\n*◉ ${usedPrefix + command} room 1*`;
  }

  // Find a room that is waiting for players
  let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true));

  if (room) {
    // Start the game
    await m.reply('[🕹️] 𝐓𝐇𝐄 𝐆𝐀𝐌𝐄 𝐈𝐒 𝐒𝐓𝐀𝐑𝐓𝐈𝐍𝐆, 𝐀 𝐏𝐋𝐀𝐘𝐄𝐑 𝐇𝐀𝐒 𝐉𝐎𝐈𝐍𝐄𝐃');
    room.o = m.chat;
    room.game.playerO = m.sender;
    room.state = 'PLAYING';

    // Map the game board to emojis
    let arr = room.game.render().map(v => {
      return {
        X: '❎',
        O: '⭕',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
      }[v];
    });

    let str = `
❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

        ${arr.slice(0, 3).join('')}
        ${arr.slice(3, 6).join('')}
        ${arr.slice(6).join('')}

𝐓𝐮𝐫𝐧𝐨 𝐝𝐢 @${room.game.currentTurn.split('@')[0]}
`.trim();

    // Send the game board to both players
    if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: this.parseMention(str) }, { quoted: m });
    await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str) }, { quoted: m });

  } else {
    // Create a new room
    room = {
      id: 'tictactoe-' + (+new Date),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING'
    };

    if (text) room.name = text;

    // Prepare a message with the room details
    let prova = {
      "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" },
      "message": {
        "groupInviteMessage": {
          caption: 'ROOM CREATED ✓',
          "vcard": `BEGIN:VCARD\nVERSION:5.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
        }
      },
      "participant": "0@s.whatsapp.net"
    };

    // Send invitation and room details to join the game
    conn.reply(m.chat, `══════ •⊰✧⊱• ══════
*WAITING FOR PLAYERS ...*
══════════════
🕹️ 𝐓𝐨 𝐣𝐨𝐢𝐧 𝐝𝐢𝐠𝐢𝐭
.gioca ${text}
══════════════
⛔ 𝐓𝐨 𝐥𝐞𝐚𝐯𝐞 𝐚 𝐠𝐚𝐦𝐞
𝐢𝐧 𝐩𝐫𝐨𝐠𝐫𝐞𝐬𝐬 𝐝𝐢𝐠𝐢𝐭 .𝐞𝐬𝐜𝐢
══════ •⊰✧⊱• ══════`, prova, m);

    // Store the room in the game object
    conn.game[room.id] = room;
  }
};

handler.command = /^(gioca|tris|ttt|xo)$/i;
export default handler;
