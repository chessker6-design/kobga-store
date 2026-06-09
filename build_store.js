const fs = require('fs').promises;
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, 'packages');
const OUTPUT_FILE = path.join(__dirname, 'index.json');

async function buildStoreIndex() {
    try {
        console.log('📦 Mağaza Kataloğu Oluşturuluyor...');
        const files = await fs.readdir(PACKAGES_DIR);
        const jsonFiles = files.filter(f => f.endsWith('.json'));

        const packages = [];

        for (const file of jsonFiles) {
            try {
                const filePath = path.join(PACKAGES_DIR, file);
                const data = await fs.readFile(filePath, 'utf8');
                const parsed = JSON.parse(data);

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
                console.log(`✅ Eklendi: ${file}`);
            } catch (err) {
                console.error(`❌ Dosya okuma hatası (${file}):`, err.message);
            }
        }

        await fs.writeFile(OUTPUT_FILE, JSON.stringify(packages, null, 2), 'utf8');
        console.log('\n✨ HARİKA! "index.json" dosyası başarıyla oluşturuldu.');
        console.log('👉 Artık "index.json" dosyasını ve "packages" klasörünü GitHub\'a yükleyebilirsin!');
    } catch (error) {
        console.error('Katalog oluşturulurken hata:', error);
    }
}

buildStoreIndex();
