import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const defaultLang = 'es';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let lang = args[0] || defaultLang;
  let text = args.slice(1).join(' ');
  
  // Check if the language code is correct (two letters)
  if (lang.length !== 2) {
    lang = defaultLang;
  }
  
  // If no text, use quoted text (if available)
  if (!text && m.quoted?.text) text = m.quoted.text;
  
  if (!text) {
    throw `Please enter text to convert to speech!`;
  }

  let res;
  try {
    res = await tts(text, lang);
  } catch (e) {
    m.reply(`Error: ${e.message}`);
    res = await tts(text, defaultLang);
  } finally {
    if (res) {
      conn.sendFile(m.chat, res, 'tts.opus', null, m, true);  
    }
  }
};

handler.help = ['tts <lang> <text>'];
handler.tags = ['tools'];
handler.command = /^g?tts$/i;

export default handler;

function tts(text, lang = 'es') {
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang);
      let filePath = join(__dirname, '../tmp', `${Date.now()}.opus`);
      
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}
