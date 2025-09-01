import { createCanvas, loadImage } from 'canvas'

// Function to draw an envelope shape (used for decorations)
function drawEnvelope(ctx, x, y, size) {
  ctx.fillStyle = '#FFD700'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.rect(x, y, size, size * 0.7)
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + size / 2, y + size * 0.35)
  ctx.lineTo(x + size, y)
  ctx.moveTo(x, y + size * 0.7)
  ctx.lineTo(x + size / 2, y + size * 0.35)
  ctx.lineTo(x + size, y + size * 0.7)
  ctx.stroke()
}

let handler = async (m, { conn }) => {
  const users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({ id, msgs: data.msgs || 0 }))
    .sort((a, b) => (b.msgs || 0) - (a.msgs || 0))
    .slice(0, 10)

  if (!users.length) return m.reply('❌ Nessun utente trovato nella classifica.')

  // Create a canvas with dimensions
  const width = 1500
  const height = 1000
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Apply background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e3a8a')
  gradient.addColorStop(1, '#6d28d9')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Draw colorful circles on background
  for (let i = 0; i < 200; i++) {
    ctx.beginPath()
    ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 60%)`
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 2, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw the title "TOP MESSAGGI"
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 60px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('TOP MESSAGGI', width / 2, 90)

  // Draw envelope decorations
  drawEnvelope(ctx, width / 2 - 380, 40, 50)
  drawEnvelope(ctx, width / 2 + 280, 40, 50)

  // Draw the leaderboard box
  const boxX = 100
  const boxY = 200
  const boxW = 520
  const boxH = 650
  const radius = 30
  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(boxX + radius, boxY)
  ctx.lineTo(boxX + boxW - radius, boxY)
  ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + radius)
  ctx.lineTo(boxX + boxW, boxY + boxH - radius)
  ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH)
  ctx.lineTo(boxX + radius, boxY + boxH)
  ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - radius)
  ctx.lineTo(boxX, boxY + radius)
  ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Add the top 10 list inside the box
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 38px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('TOP 10:', boxX + 20, boxY + 50)

  ctx.font = '22px Arial'
  users.forEach((u, i) => {
    const y = boxY + 100 + i * 55
    ctx.fillStyle = '#fff'
    ctx.fillText(`#${i + 1} ${u.id.split('@')[0]}`, boxX + 30, y)
    ctx.fillStyle = '#cbd5e1'
    ctx.fillText(`${u.msgs || 0} messaggi`, boxX + 310, y)
  })

  // Draw the top 3 users with special effects (Profile picture, highlight)
  const baseY = boxY + boxH
  const colW = 180
  const spacing = 240
  const centerX = width - 420

  const positions = [
    { rank: 2, x: centerX - spacing, h: 160, color: '#9ca3af' },
    { rank: 1, x: centerX, h: 220, color: '#facc15' },
    { rank: 3, x: centerX + spacing, h: 140, color: '#d97706' }
  ]

  for (let pos of positions) {
    const user = users[pos.rank - 1]
    if (!user) continue
    const y = baseY - pos.h

    // Draw the avatar highlight background
    ctx.fillStyle = pos.color
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 6
    const r = 20

    ctx.beginPath()
    ctx.moveTo(pos.x + r, y)
    ctx.lineTo(pos.x + colW - r, y)
    ctx.quadraticCurveTo(pos.x + colW, y, pos.x + colW, y + r)
    ctx.lineTo(pos.x + colW, baseY - r)
    ctx.quadraticCurveTo(pos.x + colW, baseY, pos.x + colW - r, baseY)
    ctx.lineTo(pos.x + r, baseY)
    ctx.quadraticCurveTo(pos.x, baseY, pos.x, baseY - r)
    ctx.lineTo(pos.x, y + r)
    ctx.quadraticCurveTo(pos.x, y, pos.x + r, y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw the profile picture if available
    try {
      let pp = await conn.profilePictureUrl(user.id, 'image').catch(() => null)
      if (pp) {
        let img = await loadImage(pp)
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x + colW / 2, y - 65, 55, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, pos.x + colW / 2 - 55, y - 120, 110
