const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const client = new Client();

client.on('qr', qr => {
    console.log('Scan the QR code below to authenticate:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
});

client.on('authenticated', () => {
    console.log('WhatsApp Bot authenticated!');
});

client.initialize();

app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    console.log('Received request at /send-message');
    console.log('Request body:', req.body);
    const { x, y, z } = req.body;

    if (x > 1 || x < -1 || y > 1 || y < -1 || z > 1 || z < -1) {
        const number = '+62895632386000'; // Ganti dengan nomor tujuan WhatsApp Anda
        const message = `Bahaya!!! Guncangan Terdeteksi. X = ${x}, Y = ${y}, Z = ${z}`;
        const chatId = `${number}@c.us`;

        client.sendMessage(chatId, message).then(() => {
            console.log('Pesan WhatsApp terkirim');
            res.sendStatus(200);
        }).catch((err) => {
            console.error('Error mengirim pesan WhatsApp:', err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(200);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});