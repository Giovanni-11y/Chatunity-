// Creation by Riad the Holy Father

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    // Check if the message is from a group or is a Baileys system message
    if (!m.isGroup || m.isBaileys) return true;

    // Check if antisondaggi (anti-poll) is enabled for this chat
    let chat = global.db.data.chats[m.chat];
    if (!chat.antisondaggi) return true;

    // Determine poll type (pollCreationMessageV3, pollCreationMessage, pollCreationMessageV2)
    const pollType = Object.keys(m.message || {})[0];
    const isPoll = pollType === 'pollCreationMessageV3' || pollType === 'pollCreationMessage' || pollType === 'pollCreationMessageV2';

    // If the message is a poll and the sender is not an admin, delete the poll and send a warning
    if (isPoll && !isAdmin) {
        try {
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant || m.sender
                }
            });
            await conn.sendMessage(m.chat, {
                text: `> ⚠️ POLL DETECTED ⚠️\nThe poll from @${m.sender.split('@')[0]} has been deleted.`,
                mentions: [m.sender]
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return true;
}
