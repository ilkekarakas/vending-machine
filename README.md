# Vending Machine

Bu proje, bir otomat makinesini temsil eden basit bir React uygulamasıdır. Bu uygulama, kullanıcılara farklı ürünlerin bir listesini sunar ve kullanıcıların bu ürünleri seçip satın almasına olanak tanır. Ayrıca tedarikçinin para çekme, stok yenileme ve enerji tüketimi hakkında işlemler yapmasına olanak sağlar.


## Özellikler

Ürün listesini görüntüleme: Kullanıcı, mevcut ürünlerin fiyatlarını, stok durumlarını, satın alma kodunu ve görüntüsünü görüntüleyebilir.
Para ekleme: Kullanıcı, 1-5-10-20 miktarlarında parayı makineye ekleyebilir.
Ürün seçme: Kullanıcı, mevcut bakiyesine göre bir ürün seçebilir. Seçtiği ürünün satın alma kodunun bulunduğu butona basarak ürünü satın alabilir.
Satın alma işlemi: Kullanıcı, seçilen ürünü satın alabilir ve bakiyesinden ürünün fiyatı düşülür.
Para iadesi: Kullanıcı, kullanılmayan bakiyesini geri alabilir.
Tedarikçi işlemleri: Tedarikçi, makineden biriken parayı alabilir, makineye reset atabilir, makinenin ışığını açıp kapatabilir, ürünlerin bozulmaması için makinede bulunan klimanın ayarlarında değişiklik yapabilir ve makineye stok yenilemesinde bulunabilir.
Enerji Hakkında: Işık 2 birim enerji, Robot Kol işlem başına 0.1 birim enerji, klima ise birim başına 0.5 birim enerji harcamaktadır. Enerji maksimum 5birim/saat olabilir. Her saat enerji kendi kendine yenilenmektedir.
Timer Hakkında: Kullanıcı işleme başladığı saniyeden itibaren makinenin sağ üst kısmında bulunan zaman sayacı çalışmaya başlar ve süre bitene kadar müşterinin işlem yapmasına izin verir. Süre bittikten sonra otomatik olarak makineye reset atar. Eğer kullanıcının parası makinede bulunuyorsa, iade eder.

## Kullanım
### `git clone https://github.com/ilkekarakas/vending-machine.git`
Yukarıdaki komut ile uygulamayı klonlamalısınız.

### `cd vending-machine`
Yukaridaki komut ile projenin ana dizinine gitmelisiniz.
Daha sonrasında aşağıda bulunan işlemleri sırası ile yapmalısınız.


## Gereksinimler

Bu uygulamanın çalışması için aşağıdaki gereksinimlerin yerine getirilmesi gerekmektedir:

NodeJS v14.15.4 kurulması gerekmektedir.
NPM versiyon olarak 6.14.10 kullanılmalıdır.


### `npm i`

Yukarıdaki komutu çalıştırdığınız zaman node_modules dosyası oluşacak ve gerekli kütüphaneleri indirecektir.

### `npm start`

Komutunu kullandığınız zaman [http://localhost:3000](http://localhost:3000) linki ile uygulama ayağa kalkacaktır.

## Deploy - Demo


### `demo linki buraya eklenecek.`
