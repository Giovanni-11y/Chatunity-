import fetch from 'node-fetch';

const config = {
  emoji: {
    waiting: '⏳',
    completed: '✅',
    error: '❌'
  },
  meta: {
    developer: 'ChatUnity',
    icon: 'https://i.imgur.com/example.png', // Valid image URL
    channel: 'https://example.com'
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Enter a Pokémon name', m);

  try {
    // Search feedback
    await m.react(config.emoji.waiting);
    
    // Modified to avoid problematic externalAdReply
    await conn.sendMessage(m.chat, { 
      text: `🔍 Searching for ${text}...`,
      contextInfo: {
        mentionedJid: [m.sender]
      }
    });

    // API request
    const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('API unavailable');

    const pokemon = await response.json();
    if (!pokemon?.name) throw new Error('Pokémon not found');

    // Response formatting
    const pokemonInfo = `
🎌 *Pokédex - ${pokemon.name}*

🔹 *Name:* ${pokemon.name}
🔹 *ID:* ${pokemon.id}
🔹 *Type:* ${Array.isArray(pokemon.type) ? pokemon.type.join(', ') : pokemon.type}
🔹 *Abilities:* ${Array.isArray(pokemon.abilities) ? pokemon.abilities.join(', ') : pokemon.abilities}
🔹 *Height:* ${pokemon.height}
🔹 *Weight:* ${pokemon.weight}

📝 *Description:*
${pokemon.description || 'No description available'}

🌐 *More info:*
https://www.pokemon.com/us/pokedex/${encodeURIComponent(pokemon.name.toLowerCase())}
    `.trim();

    // Send simplified message
    await conn.sendMessage(m.chat, { 
      text: pokemonInfo,
      mentions: [m.sender]
    });
    
    await m.react(config.emoji.completed);

  } catch (error) {
    console.error('Pokémon search error:', error);
    await m.react(config.emoji.error);
    await conn.sendMessage(m.chat, { 
      text: '⚠️ Error searching for Pokémon',
      mentions: [m.sender]
    });
  }
};

handler.help = ['pokedex <pokémon>'];
handler.tags = ['utility', 'games'];
handler.command = ['pokedex', 'pokemon'];
export default handler;
