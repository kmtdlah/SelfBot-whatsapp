const { toAudio } = require('../lib/converter')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime)) throw `Balas video atau voice note yang ingin diubah ke mp3 dengan perintah *${usedPrefix + command}*`
  let media = await q.download()
  let audio = await toAudio(media, 'mp4')
  conn.sendMessage(m.chat, audio.data, MessageType.audio, {
    quoted: m, mimetype: 'audio/mp4'
  })

}
handler.help = ['tomp3'].map(v=>v+` ${inPlease(' Reply Video/VoiceNote ')}`)
handler.tags = ['tools']
handler.command = /^to(mp3|a(udio)?)$/i
module.exports = handler