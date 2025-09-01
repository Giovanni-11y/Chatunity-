let handler = async (m, { usedPrefix, command, text }) => {
    if (!text) return m.reply(`🔮 *Usage example:*\n${usedPrefix + command} *2003 02 25*`)

    const date = new Date(text)
    if (date == '❌ *Invalid date!*\nUse the format: *YYYY MM DD*\nExample: *2001 01 01*') throw date
    
    const today = new Date()
    const [year, month, day] = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
    const birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    
    const zodiacSign = getZodiac(birth[1], birth[2])
    const difference = new Date(today - date)
    const age = difference.getFullYear() - new Date(1970, 0, 1).getFullYear()

    const nextBirthday = [year + (birth[1] < month ? 1 : 0), ...birth.slice(1)]
    const ageCheck = month === birth[1] && day === birth[2] 
        ? `🎂 *${age} years* - HAPPY BIRTHDAY! 🥳` 
        : `📅 *${age} years*`

    const signDescription = getSignDescription(zodiacSign)
    const signEmoji = getZodiacEmoji(zodiacSign)

    // Define the textbot variable
    const textbot = '> ChatUnity Bot';

    const message = `
✨ *ZODIAC PROFILE* ✨

📆 *Date of birth:* ${birth.join('-')}
🔄 *Next birthday:* ${nextBirthday.join('-')}
🧮 *Current age:* ${ageCheck}
🌟 *Zodiac sign:* ${zodiacSign} ${signEmoji}

📜 *Characteristic:* ${signDescription}

${getRandomHoroscope(zodiacSign)}

⚡ *${textbot}*
`.trim()
    
    await m.reply(message)
}

// Helper functions
function getZodiac(month, day) {
    let d = new Date(1970, month - 1, day)
    return zodiacSigns.find(([_, _d]) => d >= _d)[0]
}

function getZodiacEmoji(sign) {
    const emojiMap = {
        'Capricorn': '🐐',
        'Aquarius': '🏺',
        'Pisces': '🐠',
        'Aries': '🐏',
        'Taurus': '🐂',
        'Gemini': '👯',
        'Cancer': '🦀',
        'Leo': '🦁',
        'Virgo': '🌾',
        'Libra': '⚖️',
        'Scorpio': '🦂',
        'Sagittarius': '🏹'
    }
    return emojiMap[sign] || '✨'
}

function getSignDescription(sign) {
    const descriptions = {
        'Capricorn': 'Capricorns are determined and practical, always focused on their goals like a goat climbing a mountain! 🗻',
        'Aquarius': 'Aquarians are innovators and non-conformists, always one step ahead like flowing water. 💧',
        'Pisces': 'Pisces are empathetic and dreamers, swimming between reality and fantasy like fish in the ocean. 🌊',
        'Aries': 'Aries are brave and impulsive, charging headfirst like a ram in battle! ⚔️',
        'Taurus': 'Tauruses are patient and stubborn, as firm as a rock when they decide something. 🪨',
        'Gemini': 'Geminis are versatile and communicative, changing moods like the wind. 🌬️',
        'Cancer': 'Cancers are sensitive and protective, with a tough shell but a tender heart. 🏠',
        'Leo': 'Leos are proud and generous, kings of the jungle who love being the center of attention. 👑',
        'Virgo': 'Virgos are precise and analytical, perfectionists who notice every detail. 🔍',
        'Libra': 'Libras are diplomatic and lovers of harmony, always seeking balance. ☯️',
        'Scorpio': 'Scorpios are intense and mysterious, with magnetic charm and a ready sting. 🦂',
        'Sagittarius': 'Sagittarians are adventurous and optimistic, always aiming their arrows towards the horizon. 🌄'
    }
    return descriptions[sign] || 'A mysterious and fascinating sign!'
}

function getRandomHoroscope(sign) {
    const horoscopes = {
        'Capricorn': 'Today is a good day to plan your future! 💼',
        'Aquarius': 'Your creativity is at its peak today, make the most of it! 💡',
        'Pisces': 'Follow your intuition today, it will lead you far! 🔮',
        'Aries': 'Energy for Unitycoins today, but watch out for impulsiveness! 🚀',
        'Taurus': 'Perfect day to enjoy the pleasures of life! 🍷',
        'Gemini': 'Communication is your winning tool today! 💬',
        'Cancer': 'Pamper your loved ones today, you need it! 💕',
        'Leo': 'All eyes are on you today, shine bright! ✨',
        'Virgo': 'Pay attention to the details today, they will save you! 📝',
        'Libra': 'Seek harmony today, avoid conflicts! ☮️',
        'Scorpio': 'Your passion is magnetic today, use it wisely! 🔥',
        'Sagittarius': 'Adventure is ahead today, get ready to go! 🌍'
    }
    return `🔮 *Horoscope of the day:* ${horoscopes[sign] || 'A lucky day ahead!'}`
}

const zodiacSigns = [
    ["Capricorn", new Date(1970, 0, 1)],
    ["Aquarius", new Date(1970, 0, 20)],
    ["Pisces", new Date(1970, 1, 19)],
    ["Aries", new Date(1970, 2, 21)],
    ["Taurus", new Date(1970, 3, 21)],
    ["Gemini", new Date(1970, 4, 21)],
    ["Cancer", new Date(1970, 5, 22)],
    ["Leo", new Date(1970, 6, 23)],
    ["Virgo", new Date(1970, 7, 23)],
    ["Libra", new Date(1970, 8, 23)],
    ["Scorpio", new Date(1970, 9, 23)],
    ["Sagittarius", new Date(1970, 10, 22)],
    ["Capricorn", new Date(1970, 11, 22)]
].reverse()

handler.help = ['zodiac <YYYY MM DD>']
handler.tags = ['horoscope']
handler.command = /^(zodiac|sign|horoscope)$/i
handler.register = true

export default handler
