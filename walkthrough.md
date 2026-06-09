# 🌍 KOBGA Mağaza Sunucusu Hazır!

KOBGA uygulaman artık sadece kendi içine kapalı bir sistem değil, doğrudan senin bilgisayarındaki sunucuyla konuşabilen bir **istemci (client)** haline geldi.

Aşağıdaki adımları izleyerek kendi KOBGA Mağazanı hemen ayağa kaldırabilirsin!

## 1. Sunucuyu Başlatmak

Bilgisayarında, Masaüstündeki `KOBGA` klasörü içerisine `kobga-server` adında bir Node.js projesi kurdum. Sunucuyu başlatmak için:

1. Bilgisayarında yeni bir Terminal (veya Komut İstemcisi / PowerShell) aç.
2. Şu klasöre git:
   ```bash
   cd C:\Users\abdul\Desktop\KOBGA\kobga-server
   ```
3. Sunucuyu çalıştır:
   ```bash
   node server.js
   ```

Sunucu çalıştığında ekranda kocaman **"🚀 KOBGA MAĞAZA SUNUCUSU ÇALIŞIYOR!"** yazısını ve senin bilgisayarının IP adresini (Örn: `192.168.1.xxx:3000`) göreceksin. Bu terminal penceresini kapatma, arkada çalışmaya devam etsin.

## 2. Paketleri Mağazaya Eklemek

KOBGA Creator (Web Sitesi) üzerinden ürettiğin (Örneğin o bahsettiğin KPSS Tarih JSON'u) dosyaları doğrudan şu klasöre kopyala:
📁 `C:\Users\abdul\Desktop\KOBGA\kobga-server\packages`

*Bu klasöre attığın her JSON, anında mobil mağazanda belirecektir.*

## 3. Mobil Uygulamadan İndirmek

1. Uygulamayı telefonunda çalıştır.
2. Önce **Ayarlar** (Settings) sekmesine git.
3. **Ağ Ayarları** kısmındaki **Sunucu Adresi (IP:Port)** kutusuna, terminalde gördüğün IP adresini yaz (Örn: `192.168.1.xxx:3000`).
4. Yukarıdan **Kaydet**'e bas.
5. Şimdi ana ekrandan **KOBGA Mağazası** butonuna tıkla.

> [!TIP]
> Artık "Manuel Dosya Seç" ekranı yerine, bilgisayarındaki paketlerin otomatik listelendiği şık bir **Vitrin** göreceksin. İncele deyip tek tıkla kütüphanene ekleyebilirsin! Eğer hala kabloyla atmak istersen, o buton da vitrinin en altında yedek olarak duruyor.
