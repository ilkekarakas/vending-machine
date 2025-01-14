# 🧪 Test Dokümantasyonu

## Genel Bakış

Bu doküman, Otomat uygulamasının test stratejisini ve test senaryolarını açıklar. Testler Jest ve React Testing Library kullanılarak yazılmış olup, bileşen işlevselliği ve kullanıcı etkileşimlerine odaklanmıştır.

## Test Yapısı

```
src/__tests__/
├── payment.test.tsx        # Ödeme bileşeni testleri
├── product-card.test.tsx   # Ürün kartı bileşeni testleri
├── supplier-panel.test.tsx # Tedarikçi paneli testleri
├── test-utils.tsx         # Test yardımcıları
└── vending-machine.test.tsx # Ana bileşen testleri
```

## Test Kategorileri

### 1. Ödeme Bileşeni Testleri

Ödeme işleme fonksiyonları için testler:

- ✅ Ödeme yöntemlerini doğru şekilde gösterme
- ✅ Nakit ödeme yöntemi seçimini işleme
- ✅ Ürün seçimi olmadan para ekleme hatası gösterme
- ✅ Kredi kartı ödemelerini doğru şekilde işleme

### 2. Ürün Kartı Testleri

Ürün gösterimi ve seçimi için testler:

- ✅ Ürün bilgilerini doğru şekilde gösterme
- ✅ Ürün seçimini işleme
- ✅ Stok durumunu gösterme
- ✅ Ürün mevcudiyetini güncelleme

### 3. Tedarikçi Paneli Testleri

Tedarikçi modu işlevleri için testler:

- ✅ Başlangıç durumunu doğru gösterme
- ✅ Şifre korumasını yönetme
- ✅ Para toplama işlemlerini yönetme
- ✅ Ürün doldurma işlemlerini kontrol etme
- ✅ Yanlış şifre denemelerini işleme

### 4. Otomat Ana Bileşen Testleri

Ana bileşen için testler:

- ✅ Ana bileşenleri gösterme
- ✅ Makine durumunu yönetme
- ✅ Bileşen etkileşimlerini işleme

## Testleri Çalıştırma

### Temel Test Çalıştırma
```bash
npm test
```

### İzleme Modu
```bash
npm run test:watch
```

### Kapsam Raporu
```bash
npm run test:coverage
```

## Test Yardımcıları

`test-utils.tsx` dosyası şunları sağlar:

- Redux sağlayıcısı ile özel render fonksiyonu
- Mock store yapılandırması
- Genel test yardımcıları

## Test İyi Uygulamaları

1. **Bileşen Testi**
   - Bileşen renderını test etme
   - Kullanıcı etkileşimlerini doğrulama
   - Durum güncellemelerini kontrol etme
   - Hata yönetimini doğrulama

2. **Redux Entegrasyonu**
   - Action dispatch işlemlerini test etme
   - Durum güncellemelerini doğrulama
   - Seçici işlevselliğini kontrol etme

3. **Kullanıcı Etkileşimi Testi**
   - Tıklama ve girişleri simüle etme
   - UI güncellemelerini doğrulama
   - Hata mesajlarını test etme
   - Yükleme durumlarını kontrol etme


## Genel Test Senaryoları

### 1. Ödeme Akışı
- Ürün seçme
- Ödeme yöntemi seçme
- Ödemeyi işleme
- İşlemi doğrulama

### 2. Tedarikçi İşlemleri
- Tedarikçi moduna girme
- Para toplama
- Ürün doldurma
- Makineyi sıfırlama

### 3. Hata Yönetimi
- Geçersiz ödemeler
- Yetersiz bakiye
- Stokta olmayan ürünler
- Sistem hataları

### 4. Durum Yönetimi
- Bileşen durumu güncellemeleri
- Redux store değişiklikleri
- Context güncellemeleri
- Yerel depolama
