let pendingRequests = {};

let handler = async (m, { conn, isAdmin, isBotAdmin, args, usedPrefix, command }) => {
  if (!m.isGroup) return;

  const groupId = m.chat;

  if (pendingRequests[m.sender]) {
    const pending = await conn.groupRequestParticipantsList(groupId);
    const input = (m.text || '').trim();
    delete pendingRequests[m.sender];

    if (/^\d+$/.test(input)) {
      const number = parseInt(input);
      if (number <= 0) return m.reply("❌ Invalid number. Use a number > 0.");
      const toApprove = pending.slice(0, number);
      try {
        const jidList = toApprove.map(p => p.jid);
        await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve');
        return m.reply(`✅ Approved ${jidList.length} requests.`);
      } catch {
        return m.reply("❌ Error while approving.");
      }
    }

    if (input === '39' || input === '+39') {
      const toApprove = pending.filter(p => p.jid.startsWith('39') || p.jid.startsWith('+39'));
      if (!toApprove.length) return m.reply("❌ No requests with +39 prefix found.");
      try {
        const jidList = toApprove.map(p => p.jid);
        await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve');
        return m.reply(`✅ Approved ${jidList.length} requests with +39 prefix.`);
      } catch {
        return m.reply("❌ Error while approving.");
      }
    }

    return m.reply("❌ Invalid input. Send a number or '39'.");
  }

  if (!isBotAdmin) return m.reply("❌ I must be an admin to manage requests.");
  if (!isAdmin) return m.reply("❌ Only group admins can use this command.");

  const pending = await conn.groupRequestParticipantsList(groupId);
  if (!pending.length) return m.reply("✅ No pending requests.");

  if (!args[0]) {
    return conn.sendMessage(m.chat, {
      text: `📨 Pending requests: ${pending.length}\nSelect an option:`,
      footer: 'Group Request Management',
      buttons: [
        { buttonId: `${usedPrefix}${command} accept`, buttonText: { displayText: "✅ Approve all" }, type: 1 },
        { buttonId: `${usedPrefix}${command} reject`, buttonText: { displayText: "❌ Reject all" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accept39`, buttonText: { displayText: "🇮🇹 Approve +39" }, type: 1 },
        { buttonId: `${usedPrefix}${command} manage`, buttonText: { displayText: "📥 Manage requests" }, type: 1 }
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: m });
  }

  if (args[0] === 'accept') {
    const number = parseInt(args[1]);
    const toApprove = isNaN(number) || number <= 0 ? pending : pending.slice(0, number);
    try {
      const jidList = toApprove.map(p => p.jid);
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve');
      return m.reply(`✅ Approved ${jidList.length} requests.`);
    } catch {
      return m.reply("❌ Error while approving.");
    }
  }

  if (args[0] === 'reject') {
    try {
      const jidList = pending.map(p => p.jid);
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'reject');
      return m.reply(`❌ Rejected ${jidList.length} requests.`);
    } catch {
      return m.reply("❌ Error while rejecting.");
    }
  }

  if (args[0] === 'accept39') {
    const toApprove = pending.filter(p => p.jid.startsWith('39') || p.jid.startsWith('+39'));
    if (!toApprove.length) return m.reply("❌ No requests with +39 prefix found.");
    try {
      const jidList = toApprove.map(p => p.jid);
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve');
      return m.reply(`✅ Approved ${jidList.length} requests with +39 prefix.`);
    } catch {
      return m.reply("❌ Error while approving.");
    }
  }

  if (args[0] === 'manage') {
    return conn.sendMessage(m.chat, {
      text: `📥 How many requests do you want to approve?\n\nChoose an amount below or type manually:\n\n*.${command} accept <number>*\nExample: *.${command} accept 7*`,
      footer: 'Custom Request Management',
      buttons: [
        { buttonId: `${usedPrefix}${command} accept 10`, buttonText: { displayText: "10" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accept 20`, buttonText: { displayText: "20" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accept 50`, buttonText: { displayText: "50" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accept 100`, buttonText: { displayText: "100" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accept 200`, buttonText: { displayText: "200" }, type: 1 },
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: m });
  }
};

handler.command = ['requests'];
handler.tags = ['group'];
handler.help = ['requests'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.limit = false;

export default handler;