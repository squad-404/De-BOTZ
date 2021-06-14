const {
        MessageType,
        mentionedJid,
        WAConnection
      } = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal") 
const moment = require("moment-timezone") 
const fs = require("fs")
const util = require('util')
const axios = require('axios')
const os = require('os')
const speed = require('performance-now')
const cheerio = require('cheerio')
const { 
        exec 
      } = require("child_process")
//---------- LIB -----------//
const { 
        color, 
        bgcolor 
      } = require('./lib/color.js')
const { 
        getGroupAdmins,
        getRandom,
        kyun
      } = require('./lib/functions.js')
const {
        _tampilWaktu,
        _tampilHari
      } = require('./lib/date.js')
const { 
        fetchJson,
        getBuffer
      } = require('./lib/fetcher.js')
//----------- DATABASES -----------//
const { 
        palingmurah_, 
        layarkaca_, 
        Amino_, 
      } = require('./scrap/search.js')
const { 
        Komiku_, 
        AnimePlanet_, 
        KomikFox_, 
        komikstationlist_, 
        KomikStation_, 
        Mangakus_, 
        Kiryuus_, 
        MangaId_, 
        KiryuuL_, 
        KiryuuC_, 
        KissL_, 
        KissM_, 
        KlikS_, 
        KlikML_ 
      } = require('./scrap/manga.js')
const { 
        metroTV_, 
        CNN_, 
        iNewsTV_, 
        Kumparan_, 
        Tribun_, 
        DailyNews_, 
        DetikNews_, 
        Okezone_, 
        CNBC_, 
        KoranFajar_, 
        Kompas_, 
        KoranSindo_, 
        TempoNews_, 
        Indozone_, 
        AntaraNews_, 
        Republika_ 
      } = require('./scrap/news.js')
//----------- START FUNCTION -----------//
async function starts() {
    const dehan = new WAConnection()
    dehan.logger.level = 'warn'
    dehan.on('qr', () => {
        const time_connecting = moment.tz('Asia/Makassar').format('HH:mm:ss')
        console.log(color(time_connecting, "red"), color("•  STATS  •", "white"), color("Scan QR Kode nya di Whatsapp Web"))
    })
    fs.existsSync('./session.json') && dehan.loadAuthInfo('./session.json')
    dehan.on('connecting', () => {
        const time_connecting = moment.tz('Asia/Makassar').format('HH:mm:ss')
        console.log(color(time_connecting, "green"), color("•  STATS  •", "blue"), color("Connecting..."))
    })
    dehan.on('open', () => {
        const time_done = moment.tz('Asia/Makassar').format('HH:mm:ss')
        console.log(color(time_done, "blue"), color("•  STATS  •", "red"), color("Script [Scrap] Connected!"))
    })
    await dehan.connect({ timeoutMs: 30 * 1000 })
    fs.writeFileSync('./session.json', JSON.stringify(dehan.base64EncodedAuthInfo(), null, '\t'))
//----------- BLOCK LIST -----------//
    blocked = []
	dehan.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
//----------- BATTERAI EVENT -----------//
 let batterai = {}
 dehan.on('CB:action,,battery', json => {
	const value = json[2][0][1].value
	const plug = json[2][0][1].live
	batterai.value = value + '%'
	batterai.plug = plug == 'true' ? 'Charger!' : 'False'
	console.log(color('Batterai:'), color(value + '%', 'blue'))
	console.log(color('Charger:'), color(plug === 'true' ? 'Charger!' : 'False!', 'yellow'))
})
//----------- MAIN EVENT -----------//
 dehan.on('chat-update', async (dhn) => {
		try {
            if (!dhn.hasNewMessage) return
            dhn = JSON.parse(JSON.stringify(dhn)).messages[0]
            if (!dhn.message) return
            if (dhn.key && dhn.key.remoteJid === 'status@broadcast') return
            const content = JSON.stringify(dhn.message)
            const from = dhn.key.remoteJid
			global.blocked
			global.batterai
			let type = Object.keys(dhn.message)[0]
			const { text, extendedText, liveLocation, contact, contactsArray, location, image, video, sticker, document, audio, product } = MessageType
			if (type === 'ephemeralMessage') {    
			dhn.message = dhn.message.ephemeralMessage.message    
			type = Object.keys(dhn.message)[0]
			}
			prefix = '#'
			tzy = '='
		    body = (((type === 'conversation') && dhn.message.conversation) && dhn.message.conversation.startsWith(prefix)) ? dhn.message.conversation : (((type === 'imageMessage') && dhn.message.imageMessage.caption) && dhn.message.imageMessage.caption.startsWith(prefix)) ? dhn.message.imageMessage.caption : (((type === 'videoMessage') && dhn.message.videoMessage.caption) && dhn.message.videoMessage.caption.startsWith(prefix)) ? dhn.message.videoMessage.caption : (((type === 'extendedTextMessage') && dhn.message.extendedTextMessage.text) && dhn.message.extendedTextMessage.text.startsWith(prefix)) ? dhn.message.extendedTextMessage.text : ''
		    hantzy = (((type === 'conversation') && dhn.message.conversation) && dhn.message.conversation.startsWith(tzy)) ? dhn.message.conversation : (((type === 'imageMessage') && dhn.message.imageMessage.caption) && dhn.message.imageMessage.caption.startsWith(tzy)) ? dhn.message.imageMessage.caption : (((type === 'videoMessage') && dhn.message.videoMessage.caption) && dhn.message.videoMessage.caption.startsWith(tzy)) ? dhn.message.videoMessage.caption : (((type === 'extendedTextMessage') && dhn.message.extendedTextMessage.text) && dhn.message.extendedTextMessage.text.startsWith(tzy)) ? dhn.message.extendedTextMessage.text : ''
			chats = (type === 'conversation' && dhn.message.conversation) ? dhn.message.conversation : (type == 'imageMessage') && dhn.message.imageMessage.caption ? dhn.message.imageMessage.caption : (type == 'videoMessage') && dhn.message.videoMessage.caption ? dhn.message.videoMessage.caption : (type == 'extendedTextMessage') && dhn.message.extendedTextMessage.text ? dhn.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase() || body.slice(1).trim().split(/ +/).shift().toUpperCase()
			const msgIncludes = chats.slice(0).trim().split(/ +/).shift().toLowerCase() || chats.slice(0).trim().split(/ +/).shift().toLowerCase()
			const cmd_ = hantzy.slice(1).trim().split(/ +/).shift().toLowerCase() || hantzy.slice(1).trim().split(/ +/).shift().toUpperCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const isEval = hantzy.startsWith(tzy)
			const dtzy = hantzy.trim().split(/ +/).slice(1)
			const _totalchat = await dehan.chats.all()
			let jid_ = []
			let g_jid = []
			for (let _jid of _totalchat) {
			jid_.push(_jid.jid)
			}
			for (let _gid of jid_) {
			if (_gid && _gid.includes('@g.us')) {
			g_jid.push(_gid)
			}
			}
			const _client = dehan.user
			const sender = dhn.key.fromMe ? dehan.user.jid : dhn.key.remoteJid.endsWith('@g.us') ? dhn.participant : dhn.key.remoteJid
            const conts = dhn.key.fromMe ? dehan.user.jid : dehan.contacts[sender] || { notify: jid.replace(/@.+/, '') }
            const pushname = dhn.key.fromMe ? dehan.user.name : conts.notify || conts.vname || conts.name || '-'
            const _sender = sender.split("@")[0]
            const _fromme = '@' + _client.jid.split("@")[0]
			const ownerNumber = ['6281342474954@s.whatsapp.net', `${_client.jid}`]
			const Dehanjing = { key: { fromMe: false, participant: _sender + '@s.whatsapp.net' , ...(from ? { remoteJid: "1992892@broadcast" } : {}) }, message: { conversation: '>\\<' }}
			const isGroup = from.endsWith('@g.us')
			const q = chats.slice(command.length + 2, chats.length)
			const { wa_version, 
			        mcc, 
			        mnc, 
			        os_version, 
			        device_manufacturer, 
			        device_model, 
			        os_build_number 
			      } = _client.phone
            const _processRun = process.uptime()
            const _runtime = kyun(_processRun)
            const _sec = speed()
            const _speed = speed() - _sec
	        const _tahunbaru = await fetchJson('https://dhn-api.herokuapp.com/api/hitungmundur?apikey=DehanApi&bulan=1&tanggal=1&tahun=2022', { method: 'get' })
	        const _iduladha = await fetchJson('https://dhn-api.herokuapp.com/api/hitungmundur?apikey=DehanApi&bulan=7&tanggal=23&tahun=2021', { method: 'get' })
            const _time = moment.tz(`Asia/Makassar`).format('DD/MM/YY • HH:mm:ss')
            const _date = new Date().toLocaleString("en-US", {timeZone: 'Asia/Makassar'});
 			const groupMetadata = isGroup ? await dehan.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            const groupOwner = isGroup ? groupMetadata.owner : ''
//----------- SECURITY -----------//
            const isBotGroupAdmins = groupAdmins.includes(_client.jid) || false
            const isGroupAdmins = groupAdmins.includes(sender) || false
			const isOwner = ownerNumber.includes(sender)
			const isImage = type === 'imageMessage'
			const isVideo = type === 'videoMessage'
			const isAudio = type === 'audioMessage'
			const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
//----------- SENDER IMAGE URL -----------//
try {
senderUrl = await dehan.getProfilePicture(_sender)
} catch {
senderUrl = `No Profile Picture!`
}
//----------- FUNCTION SEND MESSAGE -----------//
			const reply = (teks) => {
            dehan.sendMessage(from, teks, text, { quoted: Dehanjing, thumbnail: fs.readFileSync('./lib/dhn.jpeg'), contextInfo: { forwardingScore: 150, isForwarded: true, mentionedJid: [sender] } })
			}
			const mentions = (teks, memberr, id) => {
			(id == null || id == undefined || id == false) ? dehan.sendMessage(from, teks.trim(), extendedText, { thumbnail: fs.readFileSync('./lib/dhn.jpeg'), contextInfo: {"mentionedJid": memberr}}) : dehan.sendMessage(from, teks.trim(), extendedText, {quoted: Dehanjing, thumbnail: fs.readFileSync('./lib/dhn.jpeg') , contextInfo: {"mentionedJid": memberr}})
			}
			const sendFakeStatus = (from, teks, faketeks) => {
			dehan.sendMessage(from, teks, MessageType.text, { quoted: 
			{ key: 
			  { fromMe: false, participant: _sender + `@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: 
			    { "imageMessage": 
			      { "mimetype": "image/jpeg", "caption": faketeks, "jpegThumbnail": fs.readFileSync(`./lib/dhn.jpeg`)} 
			     } 
			   } 
			  })
			} 
//----------- MESS JSON -----------//
mess = {
         wait: `•  Processing  •`,
         error: `•  Error  •`,
         success: `•  Success  •`
       }
//----------- CONTENT MESSAGE -----------//
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuoted = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
//----------- CONSOLE LOG -----------//
            if (!isGroup && isCmd) console.log(color('•  Priv CMD  •','white'), _time, color(prefix+command,'red'), 'from', color(_sender,'blue'), 'args :', color(q.length))
            if (isCmd && isGroup) console.log(color('•  Group CMD  •','white'), _time, color(prefix+command,'red'), 'from', color(_sender,'blue'), 'in', color(groupName,'aqua'), 'args :', color(q.length))
            
            if (!isGroup && !isEval) console.log(color('•  Priv Eval  •'), _time, color(tzy+cmd_, 'red'), 'from', color(_sender,'blue'), 'args :', color(q.length))
            if (isEval && isGroup) console.log(color('•  Group Eval  •'), _time, color(tzy+cmd_,'red'), 'from', color(_sender,'blue'), 'in', color(groupName,'aqua'), 'args :', color(q.length))
//----------- AUTO RESPONDER -----------//
 if (msgIncludes.match('cekprefix')) {
  dehan.updatePresence(from, Presence.composing)
  return reply(`•  Check  •\nPrefix: ${prefix}`)
  await dehan.updatePresence(from, Presence.paused)
  }
//----------- MENU SETTING -----------//
const memnu = `•  My Info  •
+=> NAME: De-BOTZ
+=> NUMBER: ${_fromme}
+=> BATTERAI: ${batterai.value}
+=> CHARGER: ${batterai.plug}
+=> UPTIME: ${kyun(os.uptime())}
+=> BROWSER: ${dehan.browserDescription[1]}
+=> LIB: ${dehan.browserDescription[0]}
+=> VERSI : ${dehan.browserDescription[2]}
+=> HOSTNAME: ${os.hostname()}
+=> Whatsapp Version: ${wa_version}
+=> RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
+=> MCC: ${mcc}
+=> MNC: ${mnc}
+=> OS VERSION: ${os_version}
+=> OS TYPE: ${os.type()}
+=> PLATFORM: ${os.platform()}
+=> TOTALMEM: ${os.totalmem()} MB
+=> DEVICE BRAND: ${device_manufacturer}
+=> OS BUILD: ${os_build_number}
+=> DEVICE MODEL: ${device_model}
+=> Runtime: ${_runtime}
+=> Speed: ${_speed.toFixed(4)}s
+=> GROUP CHAT: ${g_jid.length} Groups
+=> PRIVATE CHAT: ${_totalchat.length - g_jid.length} Chats
+=> TOTAL CHAT: ${_totalchat.length} Messages

•  Time  •
${_tampilWaktu(_date)}
${_tampilHari(_date)}

•  Your Info  •
+=> Name: ${pushname}
+=> Number: wa.me/${_sender}
+=> Image Url:
< ${senderUrl} />


• Count Down •
+=> Tahun Baru: 
< ${_tahunbaru.result} />
+=> Idul Adha: 
< ${_iduladha.result} />


•  Menu  •
=> ${prefix}term
=> "=>"
=> "=<"

•  Thanks To  •
+=> Dehanjing`
//----------- FEATURES -----------//
        switch(cmd_) {
		case '<':
		if (!isOwner) return reply('only owner')
		if (!q) return reply('Text?')
        try {
        reply(util.format(eval(`;(async () => { ${q} })()`)))
        } catch (e) {
        err = String(e)
        reply(err)
        }
		break
	    case '>':
	    if (!isOwner) return reply('only owner')
        if (!q) return reply('Text?')
          try {
          let evaled = await eval(q)
          if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
          await reply('```'+evaled+'```')
       	  } catch (e) {
          await reply(e)
  	   	  }
        break
		}
	switch(command) {
	    case 'help':
	    reply(memnu)
	    break
	    case 'term':
	    case 'exec':
	    if (!q) return reply('Text?')
	    if (!isOwner) return reply('only owner')
		exec(q, (err, stdout) => {
		if (err) return sendFakeStatus(from, `root@dehanjing:~\n` + '```' + `${err}` + '```',mess.error)
	    if (stdout) {
		sendFakeStatus(from, stdout, `•  EXEC  •`)
		}
		})
		break
		case 'komiku-search':
		if (!q) return reply('Search?')
		Komiku_(q).then(async(res)=> {
        buff = await getBuffer(res[0].image)
        teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
        teks += `\nManga: ${res[0].title}\n`
        teks += `Description: ${res[0].desc}\n`
        teks += `Chapter Pertama: ${res[0].chapter_pertama}\n`
        teks += `Chapter Terbaru: ${res[0].chapter_terbaru}\n`
        teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
        dehan.sendMessage(from, buff, image, {caption: teks.trim(), quoted: dhn})
        })
		break
		case 'mangaid-mangalist':
		if (!q) return reply('page?')
		if (isNaN(q)) return reply("only number!")
		MangaId_(q).then(async(result) => {
		no = 0
		for (let res of result) {
		buff = await getBuffer(res.manga_thumb)
		no += 1
		teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
		teks += `\n• Urutan: ${no.toString()} •\n`
		teks += `Manga: ${res.manga_name}\n`
		teks += `Manga Eps: ${res.manga_eps}\n`
		teks += `Manga Views: ${res.manga_views}\n`
		teks += `Manga Genre's: ${res.manga_genres}\n`
		teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
		dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
		}
		})
		break
case 'mangaku-search':
if (!q) return reply('Search?')
Mangakus_(q).then(async(res) => {
buff = await getBuffer(res[0].manga_thumb)
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\nManga: ${res[0].manga_name}\n`
teks += `Manga Eps: ${res[0].manga_eps}\n`
teks += `Manga Rating: ${res[0].manga_rating}\n`
teks += `•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•`
dehan.sendMessage(from, buff, image, { mimetype: 'image/jpeg',caption: teks.trim() , quoted: dhn})
})
break
case 'klikmanga-search':
if (!q) return reply('Search?')
KlikS_(q).then(async(res) => {
no = 0
for (let i of res) {
no += 1
buff = await getBuffer(i.manga_thumb)
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Description: ${i.manga_desc}\n`
teks += `Statues: ${i.manga_status}\n`
teks += `Release: ${i.manga_release}\n`
teks += `Genre's: ${i.manga_genre}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'cnn-news':
CNN_().then(res => {
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
reply(teks.trim())
})
break
case 'layarkaca-search':
if (!q) return reply('film?')
layarkaca_(q).then(async(res) => {
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•\n"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Film: ${i.title}\n`
teks += `Link: ${i.url}\n`
}
teks += `\n•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•`
teks += ""
reply(teks.trim())
})
break
case 'palingmurah-search':
if (!q) return reply('vps?, rdp?')
palingmurah_(q).then(async(res) => {
no = 0
for (let i of res) {
no += 1
buff = await getBuffer(i.product_image)
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\n• ${no.toString()} •\n`
teks += `Product: ${i.product}\n`
teks += `Description: ${i.product_desc}\n`
teks += `Price: ${i.price}\n`
teks += `Link: ${i.url}\n\n`
teks += `Seller: ${i.seller}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
await dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'cnbc-news':
CNBC_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'klik-mangalist':
if (!q) return reply('page?')
if (isNaN(q)) return reply("only number!")
KlikML_(q).then(async(res) => {
no = 0
for (let i of res) {
buff = await getBuffer(i.manga_thumb)
no += 1
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Rating: ${i.manga_rating}\n`
teks += `Chapter:\n`
teks += `Terbaru: ${i.chapter_url.chapter_baru}\n`
teks += `Terlama: ${i.chapter_url.chapter_lama}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'tribun-news':
Tribun_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'indozone-news':
Indozone_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`
teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'kumparan-news':
Kumparan_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'kompas-news':
Kompas_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'detik-news':
DetikNews_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'daily-news':
DailyNews_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'metro-news':
metroTV_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'inews-news':
iNewsTV_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'okezone-news':
Okezone_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'fajar-news':
KoranFajar_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'sindo-news':
KoranSindo_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'tempo-news':
TempoNews_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'indozone-news':
Indozone_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'antara-news':
AntaraNews_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'republika-news':
Republika_().then(async(res) => {
buff = await getBuffer(res[0].berita_thumb)
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Berita: ${i.berita}\n`
teks += `Upload: ${i.berita_diupload}\n`

teks += `Jenis: ${i.berita_jenis}\n`
teks += `Link: ${i.berita_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
})
break
case 'animeplanet-search':
if (!q) return reply('Search?')
AnimePlanet_(q).then(async(res) => {
no = 0
for (let i of res) {
no += 1
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
buff = await getBuffer(i.manga_thumb)
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Link: ${i.manga_url}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'komikfox-search':
if (!q) return reply('Search?')
KomikFox_(q).then(async(res) => {
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1

teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`

teks += `Release: ${i.manga_release}\n`
teks += `Link: ${i.manga_url}\n`
}

teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"

reply(teks.trim())
})
break
case 'komikstation-mangalist':
if (!q) return reply('page?')
if (isNaN(q)) return reply("only number!")
komikstationlist_(q).then(async(res) => {
no = 0
for (let i of res) {
no += 1
buff = await getBuffer(i.manga_thumb)
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Rating: ${i.manga_rating}\n`
teks += `Chapter: ${i.manga_eps}\n`
teks += `Type: ${i.manga_type}\n`
teks += `Link: ${i.manga_url}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'komikstation-search':
if (!q) return reply('Search?')
KomikStation_(q).then(async(res) => {
no = 0
for (let i of res) {
no += 1
buff = await getBuffer(i.manga_thumb)
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Chapter: ${i.manga_eps}\n`
teks += `Link ${i.manga_url}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'kiryuu-search':
if (!q) return reply('Search?')
Kiryuus_(q).then(async(res) => {
no = 0
for (let i of res) {
no += 1
buff = await getBuffer(i.manga_thumb)
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Rating: ${i.manga_rating}\n`
teks += `Chapter: ${i.manga_eps}\n`
teks += `Link: ${i.manga_url}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'kiryuu-latest':
if (!q) return reply('page?')
if (isNaN(q)) return reply("only number!")
KiryuuL_(q).then(async(res) => {
no = 0
for (let i of res) {
no += 1
buff = await getBuffer(i.manga_thumb)
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Rating: ${i.manga_rating}\n`
teks += `Chapter: ${i.manga_eps}\n`
teks += `Link: ${i.manga_url}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'kiryuu-mangasoon':
if (!q) return reply('page?')
if (isNaN(q)) return reply("only number!")
KiryuuC_(q).then(async(res) => {
no = 0
for (let i of res) {
no += 1
buff = await getBuffer(i.manga_thumb)
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Rating: ${i.manga_rating}\n`
teks += `Chapter: ${i.manga_eps}\n`
teks += `Link: ${i.manga_url}\n`
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
dehan.sendMessage(from, buff, image, { quoted: dhn, caption: teks.trim()})
}
})
break
case 'kiss-mangalist':
if (!q) return reply('page?')
if (isNaN(q)) return reply("only number!")
KissL_(q).then(async(res)=>{
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Link: ${i.manga_url}\n`
teks += `Chapter: \n`
teks += `Desc: ${i.chapter.chapter_desc}\n`
teks += `Ch Link: ${i.chapter.chapter_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
reply(teks.trim())
})
break
case 'kiss-search':
if (!q) return reply('Search?')
KissM_(q).then(async(res)=>{
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• Urutan: ${no.toString()} •\n`
teks += `Manga: ${i.manga_name}\n`
teks += `Link: ${i.manga_url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
reply(teks.trim())
})
break
case 'amino-search':
if (!q) return reply('Search?')
Amino_(q).then(async(res) => {
no = 0
teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
for (let i of res) {
no += 1
teks += `\n• ${no.toString()} •\n`
teks += `Community: ${i.title}\n`
teks += `Desc: ${i.desc}\n`
teks += `Link: ${i.url}\n`
}
teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
reply(teks.trim())
})
break
		default:
		if (isGroup && !isCmd && !isEval && chats !== undefined) {
		console.log(color('ぐ Dehan','blue'),color('jing','red'),color('デハンテ','white'),color(type), 'from', color(_sender), 'nickname', color(pushname, 'green'))
		}
		}
    } catch (e) {
            const time_error = moment.tz('Asia/Makassar').format('HH:mm')
            e = String(e)
            if (!e.includes("this.isZero")) {
            console.log(color(time_error, "white"), color("•  ERROR  •", "aqua"), color(e, 'red'))
            }
        }
        })}
starts()