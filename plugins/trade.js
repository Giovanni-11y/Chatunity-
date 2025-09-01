let tradeRequests = {}

let handler = async (m, { conn, args, command }) => {
    global.db.data.users = global.db.data.users || {}
    let sender = m.sender
    let users = global.db.data.users
    let username = `@${sender.split('@')[0]}`

    if (command === 'trade') {
        let target = m.mentionedJid?.[0]
        if (!target) return m.reply(`📌 Use:\n.trade @user <your_number> <their_number>`)
        
        let myIndex = parseInt(args[1]) - 1
        let theirIndex = parseInt(args[2]) - 1
        let myPokemons = users[sender]?.pokemons || []
        let theirPokemons = users[target]?.pokemons || []

        if (!myPokemons[myIndex]) return m.reply(`❌ Your Pokémon no. ${args[1]} does not exist.`)
        if (!theirPokemons[theirIndex]) return m.reply(`❌ @${target.split('@')[0]}'s Pokémon no. ${args[2]} does not exist.`, null, { mentions: [target] })

        tradeRequests[target] = {
            from: sender,
            myIndex,
            theirIndex
        }

        let myPoke = myPokemons[myIndex]
        let theirPoke = theirPokemons[theirIndex]

        let txt = `🔁 *Trade Request*\n\n${username} wants to trade:\n📤 *${myPoke.name}* (Lv. ${myPoke.level})\nfor\n📥 *${theirPoke.name}* (Lv. ${theirPoke.level}) from @${target.split('@')[0]}\n\n✅ @${target.split('@')[0]}, respond with *.accept* to confirm.`
        return conn.reply(m.chat, txt, m, { mentions: [target, sender] })
    }

    if (command === 'accept') {
        let trade = tradeRequests[sender]
        if (!trade) return m.reply('❌ No trade request found.')

        let { from, myIndex, theirIndex } = trade
        let myPokemons = users[sender]?.pokemons || []
        let theirPokemons = users[from]?.pokemons || []

        let myPoke = myPokemons[myIndex]
        let theirPoke = theirPokemons[theirIndex]

        if (!myPoke || !theirPoke) {
            delete tradeRequests[sender]
            return m.reply('❌ One of the Pokémon is no longer available.')
        }

        // Perform the trade
        users[sender].pokemons[myIndex] = theirPoke
        users[from].pokemons[theirIndex] = myPoke

        delete tradeRequests[sender]

        return m.reply(`✅ Trade completed between @${from.split('@')[0]} and @${sender.split('@')[0]}!\n\n🎁 ${theirPoke.name} ⇄ ${myPoke.name}`, null, {
            mentions: [from, sender]
        })
    }
}

handler.help = ['trade @user <your_number> <their_number>', 'accept']
handler.tags = ['pokemon']
handler.command = /^trade|accept$/i

export default handler
