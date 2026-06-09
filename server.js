const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const PACKAGES_DIR = path.join(__dirname, 'packages');

app.use(cors());
app.use(express.json());

// Yardımcı fonksiyon: IP adresini konsola yazdırmak için
const getLocalIPs = () => {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const results = [];
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Sadece IPv4 ve localhost olmayanları al
            if (net.family === 'IPv4' && !net.internal) {
                results.push(net.address);
            }
        }
    }
    return results;
};

// 1. Tüm paketlerin meta verilerini listele
app.get('/api/packages', async (req, res) => {
    try {
        const files = await fs.readdir(PACKAGES_DIR);
        const jsonFiles = files.filter(f => f.endsWith('.json'));

        const packages = [];

        for (const file of jsonFiles) {
            try {
                const filePath = path.join(PACKAGES_DIR, file);
                const data = await fs.readFile(filePath, 'utf8');
                const parsed = JSON.parse(data);

                // Telefona sadece vitrin (önizleme) bilgilerini gönderiyoruz
                packages.push({
                    id: parsed.id || file.replace('.json', ''),
                    filename: file,
                    packName: parsed.packName || 'İsimsiz Paket',
                    author: parsed.author || 'Bilinmiyor',
                    authorLogoUrl: parsed.authorLogoUrl,
                    description: parsed.description || 'Açıklama yok',
                    totalCards: parsed.cards ? parsed.cards.length : 0,
                    campaignDays: parsed.settings ? parsed.settings.totalDays : 0,
                    dailyTarget: parsed.settings ? parsed.settings.notificationsPerDay : 0,
                });
            } catch (err) {
                console.error(`Dosya okuma hatası (${file}):`, err);
            }
        }

        res.json(packages);
    } catch (error) {
        console.error('Paketleri okurken hata:', error);
        res.status(500).json({ error: 'Paket dizini okunamadı' });
    }
});

// 2. Belirli bir paketin tam içeriğini indir
app.get('/api/packages/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        if (!filename.endsWith('.json')) {
            return res.status(400).json({ error: 'Sadece .json dosyaları indirilebilir' });
        }

        const filePath = path.join(PACKAGES_DIR, filename);

        // Dosyanın gerçekten packages klasörü içinde olduğunu doğrula (Güvenlik)
        const resolvedPath = path.resolve(filePath);
        if (!resolvedPath.startsWith(path.resolve(PACKAGES_DIR))) {
            return res.status(403).json({ error: 'Erişim reddedildi' });
        }

        const data = await fs.readFile(resolvedPath, 'utf8');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        console.error('Paket indirme hatası:', error);
        if (error.code === 'ENOENT') {
            res.status(404).json({ error: 'Paket bulunamadı' });
        } else {
            res.status(500).json({ error: 'Sunucu hatası' });
        }
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================`);
    console.log(`🚀 KOBGA MAĞAZA SUNUCUSU ÇALIŞIYOR!`);
    console.log(`======================================`);
    console.log(`Lütfen Mobil Uygulamadaki IP Adresine şunu girin:`);

    const ips = getLocalIPs();
    if (ips.length > 0) {
        ips.forEach(ip => {
            console.log(`👉  ${ip}:${PORT}`);
        });
    } else {
        console.log(`👉  localhost:${PORT}`);
    }

    console.log(`\nPaketlerini (JSON dosyalarını) şu klasöre atabilirsin:`);
    console.log(PACKAGES_DIR);
    console.log(`======================================\n`);
});
