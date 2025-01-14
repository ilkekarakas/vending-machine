# 🤖 Akıllı Otomat

![Ana-Gorsel](https://github.com/user-attachments/assets/ae2ac0d1-4c89-4383-882a-0f851cf1c0b9)


React, TypeScript ve Redux ile geliştirilmiş modern ve etkileşimli bir otomat uygulaması. Bu proje, sıcaklık kontrolü, enerji yönetimi ve tedarikçi modu gibi gelişmiş özelliklere sahip gerçek bir otomatı simüle eder.

## 📑 İçindekiler
- [Özellikler](#-özellikler)
- [Teknolojiler](#️-kullanılan-teknolojiler)
- [Kurulum](#-başlangıç)
- [Kullanım Kılavuzu](#-kullanım-kılavuzu)
- [Test Dokümantasyonu](#-test-dokümantasyonu)
- [Proje Yapısı](#-proje-yapısı)

## ✨ Özellikler

- 🎯 Ürün Seçimi ve Gösterimi
- 💳 Çoklu Ödeme Yöntemleri (Nakit/Kredi Kartı)
- 🔒 Güvenli Tedarikçi Modu
- 🌡️ Sıcaklık Kontrol Sistemi
- ⚡ Enerji Yönetimi
- 🤖 Otomatik Robot Kol
- 📊 Satış Takibi
- 🌙 Gece Modu Desteği

## 🛠️ Kullanılan Teknolojiler

- React 18
- TypeScript
- Redux Toolkit
- React Testing Library
- Jest
- Vite
- SASS
- Styled Components
- React Toastify

## 🚀 Başlangıç

### Gereksinimler

- Node.js (En son LTS sürümü önerilir)
- npm veya yarn

### Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/ilkekarakas/vending-machine.git
cd vending-machine
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 📖 Kullanım Kılavuzu

### 👤 Müşteri Modu

#### Ürün Seçimi
1. Ana ekranda mevcut ürünleri görüntüleyin

![urunler](https://github.com/user-attachments/assets/b25d2615-bd30-4aad-957b-4c4f12c845e5)

2. Satın almak istediğiniz ürünün üzerine tıklayın

![secili-urun](https://github.com/user-attachments/assets/cce0acdb-9fd1-4e3b-a370-2fd0801fe49f)

3. Ürün detaylarını ve fiyatını kontrol edin
4. Stok durumunu kontrol edin

#### Ödeme İşlemi
1. Ödeme yöntemini seçin:
   - 💵 Nakit
   - 💳 Kredi Kartı

![odeme-yontemi](https://github.com/user-attachments/assets/98048b94-bef7-4a77-a81c-5ad1788f9c64)


2. Nakit Ödeme:
   - Para ekleme butonlarını kullanarak ödeme yapın

![nakit-odeme](https://github.com/user-attachments/assets/81c84c61-3a91-4969-bb09-d67bf191339b)

   - Yeterli miktar eklendiğinde "Purchase" butonuna tıklayın
   - Para üstünüzü almak için "Refund" butonuna tıklayın

3. Kredi Kartı Ödemesi:
   - "Purchase" butonuna tıklayın
   - İşlem otomatik olarak tamamlanacaktır

### 🔐 Tedarikçi Modu

1. Giriş:
   - Ana ekranda "Enter Supplier Mode" butonuna tıklayın

   ![supplier-mod](https://github.com/user-attachments/assets/7ebf4c05-8873-4791-8243-c7803196e6b3)

   - Şifreyi girin: "aselsan"

   ![sifre-gir](https://github.com/user-attachments/assets/b9c0cfe0-2c50-43bb-b0e6-43ccac5fa076)

   - 3 kere yanlış giriş yaparsanız, 20 saniye bekleme süresi uygulanır

   ![yanlis-sifre](https://github.com/user-attachments/assets/5deec57e-4c0a-456a-b8c9-46eff6ab5b2b)

1. Özellikler:
   - Para toplama ("Collect Money" butonuna tıklayın)

   ![para-toplama](https://github.com/user-attachments/assets/79e1b22e-cfbc-4ff8-961f-5268d191c492)

   - Ürün doldurma ("Refill Stock" butonuna tıklayın)
   
   ![stok-yenileme](https://github.com/user-attachments/assets/49634aa4-5f1a-482a-a7ae-83063aa2ec8a)

   - Satış istatistikleri görüntüleme

   ![satis-istatistik](https://github.com/user-attachments/assets/f1d9f5c2-44ec-4b49-9dc7-09aa1ab00aea)

   - Makine ayarları yönetimi

### ⚙️ Özel Durumlar

1. Gece Modu (20:00 - 06:00):
   - Otomatik aktif olur
   - Aydınlatma otomatik olarak açılır.

2. Sıcaklık Kontrolü:
   - Normal: 8-12°C
   - Otomatik soğutma/ısıtma

3. Enerji Yönetimi:
   - Maksimum: 5 birim/saat
   - Akıllı bileşen kontrolü

## 🧪 Test Dokümantasyonu

### Test Yapısı

```
src/__tests__/
├── payment.test.tsx        # Ödeme bileşeni testleri
├── product-card.test.tsx   # Ürün kartı bileşeni testleri
├── supplier-panel.test.tsx # Tedarikçi paneli testleri
├── test-utils.tsx         # Test yardımcıları
└── vending-machine.test.tsx # Ana bileşen testleri
```

### Test Kategorileri

#### 1. Ödeme Bileşeni Testleri
- ✅ Ödeme yöntemlerini doğru gösterme
- ✅ Nakit ödeme seçimini işleme
- ✅ Kredi kartı ödemelerini işleme
- ✅ Ürün seçimsiz para ekleme

#### 2. Ürün Kartı Testleri
- ✅ Ürün bilgilerini gösterme
- ✅ Ürün seçimini işleme
- ✅ Stok durumunu gösterme
- ✅ Ürün stoğunu güncelleme

#### 3. Tedarikçi Paneli Testleri
- ✅ Başlangıç durumunu gösterme
- ✅ Şifre koruması
- ✅ Para toplama işlemleri
- ✅ Ürün doldurma kontrolü

### Test Komutları

```bash
# Temel test çalıştırma
npm test

# İzleme modu
npm run test:watch

# Kapsam raporu
npm run test:coverage
```

## 🧩 Proje Yapısı

```
src/
├── components/         # React bileşenleri
├── redux/             # Redux store ve slice'lar
├── types/             # TypeScript tip tanımlamaları
├── utils/             # Yardımcı fonksiyonlar
├── assets/            # Statik dosyalar
└── __tests__/         # Test dosyaları
