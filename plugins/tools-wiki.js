import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"

async function wikipedia(query) {
  try {
    const link = await axios.get(`https://it.wikipedia.org/wiki/${query}`)
    const $ = cheerio.load(link.data)
    
    // Estrai il titolo della pagina Wikipedia
    let title = $('#firstHeading').text().trim()
    
    // Estrai l'immagine di anteprima (o usa un'immagine di errore se non trovata)
    let thumbnail = $('#mw-content-text')
      .find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img')
      .attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`
    
    // Estrai i paragrafi di testo dalla pagina
    let content = []
    $('#mw-content-text > div.mw-parser-output').each(function (index, element) {
      let explanation = $(element).find('p').text().trim()
      content.push(explanation)
    })

    // Restituisci il risultato come oggetto
    for (let i of content) {
      const data = {
        status: link.status,
        result: {
          title: title,
          thumbnail: 'https:' + thumbnail,
          content: i
        }
      }
      return data
    }
  } catch (err) {
    var notFound = {
      status: 404,
      message: 'Error fetching Wikipedia data'
    }
    return notFound
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return
  wikipedia(`${text}`).then(res => {
    m.reply(res.result.content)
  }).catch(() => { return })
}

handler.help = ['wikipedia'].map(v => v + ' <what>')
handler.tags = ['internet']
handler.command = /^(wiki|wikipedia)$/i

export default handler
